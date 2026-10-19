"use client";

import { Bot, LoaderCircle, Send, Sparkles } from "lucide-react";
import { type FormEvent, useState } from "react";

type AssistantResponse = {
  answer?: string;
  error?: string;
};

export default function ParcelRelayAIAssistant() {
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const question = message.trim();

    if (question.length < 3) {
      setError("Please enter a question with at least 3 characters.");
      setAnswer("");
      return;
    }

    setError("");
    setAnswer("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: question,
          mode: "support",
        }),
      });

      const data: AssistantResponse = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to get an answer. Please try again.",
        );
      }

      const responseText = data.answer?.trim();

      if (!responseText) {
        throw new Error("The AI returned an empty answer. Please try again.");
      }

      setAnswer(responseText);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to get an answer. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      aria-labelledby="ai-assistant-title"
      className="w-full min-w-0 rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-8"
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Bot className="size-6" aria-hidden="true" />
        </span>

        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-widest text-[#C65338] dark:text-[#FF9B80]">
            AI-powered help
          </p>

          <h2
            id="ai-assistant-title"
            className="break-words text-xl font-extrabold sm:text-2xl"
          >
            Ask ParcelRelay AI
          </h2>
        </div>
      </div>

      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Get guidance on tracking, shipment booking, payments, or courier
        workflows. It cannot access your private shipment records.
      </p>

      <form
        onSubmit={submit}
        className="mt-5 flex min-w-0 flex-col gap-3 sm:flex-row"
      >
        <label htmlFor="parcelrelay-ai-question" className="sr-only">
          Your question
        </label>

        <input
          id="parcelrelay-ai-question"
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          minLength={3}
          maxLength={800}
          required
          disabled={loading}
          placeholder="How do I track a parcel?"
          className="min-h-12 min-w-0 flex-1 rounded-xl border border-input bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
        />

        <button
          type="submit"
          disabled={loading || message.trim().length < 3}
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 font-bold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="size-4" aria-hidden="true" />
          )}

          {loading ? "Thinking…" : "Ask AI"}
        </button>
      </form>

      {loading && (
        <output
          aria-live="polite"
          className="mt-3 block text-sm text-muted-foreground"
        >
          ParcelRelay AI is preparing an answer…
        </output>
      )}

      {answer && (
        <output
          aria-label="Suggested AI answer"
          aria-live="polite"
          className="mt-4 block w-full min-w-0 max-w-full overflow-hidden rounded-xl border border-border bg-muted/50 p-4 text-sm leading-7"
        >
          <span className="mb-2 flex items-center gap-2 font-bold">
            <Sparkles className="size-4 shrink-0" aria-hidden="true" />
            Suggested answer
          </span>

          <span className="block w-full min-w-0 whitespace-pre-wrap break-words [overflow-wrap:anywhere]">
            {answer}
          </span>
        </output>
      )}

      {error && (
        <p
          role="alert"
          className="mt-3 break-words text-sm font-medium text-destructive"
        >
          {error}
        </p>
      )}
    </section>
  );
}
