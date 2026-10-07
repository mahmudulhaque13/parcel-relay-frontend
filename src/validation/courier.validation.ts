import { z } from "zod";

const strongPasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/\d/, "Password must contain at least one number")
  .regex(/[!@#$%^&*]/, "Password must contain at least one special character")
  .refine((value) => !/\s/.test(value), {
    message: "Password must not contain whitespace",
  });

export const courierApplicationSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
    email: z.string().trim().email("Invalid email address"),
    phone: z.string().trim().min(7, "Phone number is required"),
    password: strongPasswordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password"),
    identityDocument: z.instanceof(File, {
      message: "Identity document is required",
    }),
    profilePhoto: z.instanceof(File, { message: "Profile photo is required" }),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type CourierApplicationFormValues = z.infer<
  typeof courierApplicationSchema
>;

export const verifyCourierEmailSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  otp: z.string().regex(/^\d{6}$/, "OTP must be 6 digits"),
});

export type VerifyCourierEmailFormValues = z.infer<
  typeof verifyCourierEmailSchema
>;
