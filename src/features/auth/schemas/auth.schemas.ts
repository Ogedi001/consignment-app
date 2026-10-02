import { z } from "zod";

const emailSchema = z.email("Please enter a valid email address or phone number.");
const phoneSchema = /^\+[1-9]\d{7,14}$/;

export const identifierSchema = z
  .string()
  .trim()
  .min(1, "Enter your email address or phone number.")
  .refine(
    (value) => emailSchema.safeParse(value).success || phoneSchema.test(value.replace(/[\s()-]/g, "")),
    "Please enter a valid email address or phone number.",
  );

export const passwordSchema = z
  .string()
  .min(8, "Use at least 8 characters.")
  .regex(/[A-Z]/, "Include one uppercase letter.")
  .regex(/[a-z]/, "Include one lowercase letter.")
  .regex(/[^A-Za-z0-9]/, "Include one special character.")
  .regex(/\d/, "Include one number.");

export const identifierFormSchema = z.object({ identifier: identifierSchema });
export const signInFormSchema = z.object({ password: z.string().min(1, "Enter your password.") });
export const signUpFormSchema = z
  .object({ password: passwordSchema, confirmPassword: z.string() })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type IdentifierFormValues = z.infer<typeof identifierFormSchema>;
export type SignInFormValues = z.infer<typeof signInFormSchema>;
export type SignUpFormValues = z.infer<typeof signUpFormSchema>;

export function getIdentifierType(identifier: string) {
  return identifier.includes("@") ? "email" : "phone";
}
