"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/components/ui";
import { signInFormSchema, type SignInFormValues } from "../schemas/auth.schemas";
import { PasswordField } from "./PasswordField";

type AuthPasswordFormProps = { onSubmit: (values: SignInFormValues) => void; isPending: boolean };

export function AuthPasswordForm({ onSubmit, isPending }: AuthPasswordFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormValues>({ resolver: zodResolver(signInFormSchema), mode: "onSubmit" });
  return <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5"><PasswordField id="password" label="Password" autoComplete="current-password" error={errors.password?.message} registration={register("password")} /><Link href="/auth/forgot-password" className="-mt-2 inline-block text-sm font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Forgot password?</Link><Button type="submit" variant="gradient" size="lg" className="w-full" disabled={isPending}>{isPending ? <><LoaderCircle className="animate-spin" aria-hidden="true" />Signing in...</> : "Sign in"}</Button></form>;
}
