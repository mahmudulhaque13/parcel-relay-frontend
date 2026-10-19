import { NextResponse } from "next/server";
import { z } from "zod";

const requestSchema = z.object({
  message: z.string().trim().min(3).max(800),
  mode: z.enum(["support", "description"]).default("support"),
});

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Send a valid JSON request." },
      { status: 400 },
    );
  }

  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: parsed.error.issues[0]?.message ?? "Invalid request.",
      },
      { status: 400 },
    );
  }

  const apiKey = process.env.GEMINI_API_KEY?.trim();

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "AI assistant is not configured yet. Please use Help & Support for assistance.",
      },
      { status: 503 },
    );
  }

  const instruction =
    parsed.data.mode === "description"
      ? [
          "Rewrite the user's parcel description into a clear, concise, natural description suitable for a courier.",
          "Preserve every fact provided by the user.",
          "For short fragments, create a complete and useful phrase or sentence.",
          "For example, rewrite 'Two cotton shirts' as 'Package contains two cotton shirts.'",
          "Do not invent package contents, value, dimensions, fragility, quantity, or handling instructions.",
          "Do not add details that the user did not provide.",
          "Return only the improved description in plain text, without Markdown or explanations.",
        ].join(" ")
      : [
          "You are ParcelRelay's helpful parcel-delivery support assistant.",
          "Give accurate, practical guidance about shipment creation, tracking, payments, courier workflows, and account navigation.",
          "Never claim to access live shipment data or change an account.",
          "For account-specific status, direct the user to sign in and check their dashboard.",
          "Never ask for passwords, OTPs, or payment secrets.",
          "Answer in 2 to 4 short, complete sentences using plain text without Markdown.",
        ].join(" ");

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: instruction }],
          },
          contents: [
            {
              parts: [{ text: parsed.data.message }],
            },
          ],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 1024,
            thinkingConfig: {
              thinkingLevel: "minimal",
            },
          },
        }),
        signal: AbortSignal.timeout(20000),
      },
    );

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const providerMessage =
        typeof data?.error?.message === "string"
          ? data.error.message
          : "No provider error message returned.";

      console.error("[AI assistant] Gemini API failed:", {
        status: response.status,
        message: providerMessage,
      });

      return NextResponse.json(
        {
          error: "The AI service is temporarily unavailable. Please try again.",
        },
        { status: 502 },
      );
    }

    const finishReason = data?.candidates?.[0]?.finishReason;

    console.info("[AI assistant] Generation result:", {
      finishReason,
      outputTokens: data?.usageMetadata?.candidatesTokenCount,
      thoughtTokens: data?.usageMetadata?.thoughtsTokenCount,
    });

    const answer = data?.candidates?.[0]?.content?.parts
      ?.map((part: { text?: string }) => part.text ?? "")
      .join("")
      .trim();

    if (!answer) {
      console.error("[AI assistant] Gemini returned no usable answer.", {
        finishReason: data?.candidates?.[0]?.finishReason,
        promptFeedback: data?.promptFeedback,
      });

      return NextResponse.json(
        { error: "No answer was returned. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("[AI assistant] Request failed:", {
      message: error instanceof Error ? error.message : "Unknown server error.",
    });

    return NextResponse.json(
      {
        error: "The AI service could not be reached. Please try again.",
      },
      { status: 502 },
    );
  }
}
