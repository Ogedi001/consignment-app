"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
import { Button, Input } from "@/shared/components/ui";
import { identifierFormSchema, type IdentifierFormValues } from "../schemas/auth.schemas";

type AuthIdentifierFormProps = { onSubmit: (values: IdentifierFormValues) => void; isPending: boolean };

export function AuthIdentifierForm({ onSubmit, isPending }: AuthIdentifierFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<IdentifierFormValues>({ resolver: zodResolver(identifierFormSchema), mode: "onSubmit" });
  const errorId = "identifier-error";
  return <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5"><div className="space-y-2"><label htmlFor="identifier" className="text-sm font-semibold text-foreground">Email or phone</label><Input id="identifier" type="text" inputMode="email" autoComplete="username" placeholder="Enter your email or phone number" aria-invalid={Boolean(errors.identifier)} aria-describedby={errors.identifier ? errorId : undefined} {...register("identifier")} />{errors.identifier ? <p id={errorId} className="text-sm text-destructive">{errors.identifier.message}</p> : null}</div><Button type="submit" size="lg" className="w-full" disabled={isPending}>{isPending ? <><LoaderCircle className="animate-spin" aria-hidden="true" />Checking...</> : "Continue"}</Button></form>;
}
