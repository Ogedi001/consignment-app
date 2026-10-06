"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/shared/components/ui";
import {
  signUpFormSchema,
  type SignUpFormValues,
} from "../schemas/auth.schemas";
import { PasswordField } from "./PasswordField";
import { PasswordRequirements } from "./PasswordRequirements";

type AuthSignupFormProps = {
  onSubmit: (values: SignUpFormValues) => void;
  onAttemptChanged: () => void;
  isPending: boolean;
};

export function AuthSignupForm({
  onSubmit,
  onAttemptChanged,
  isPending,
}: AuthSignupFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    mode: "onSubmit",
  });
  const password = watch("password", "");
  const passwordRegistration = register("password");
  const confirmationRegistration = register("confirmPassword");
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <PasswordField
        id="signup-password"
        label="Password"
        autoComplete="new-password"
        error={errors.password?.message}
        registration={{
          ...passwordRegistration,
          onChange: (event) => {
            onAttemptChanged();
            return passwordRegistration.onChange(event);
          },
        }}
      />
      <PasswordField
        id="confirm-password"
        label="Confirm password"
        autoComplete="new-password"
        error={errors.confirmPassword?.message}
        registration={{
          ...confirmationRegistration,
          onChange: (event) => {
            onAttemptChanged();
            return confirmationRegistration.onChange(event);
          },
        }}
      />
      <PasswordRequirements password={password} />
      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <LoaderCircle className="animate-spin" aria-hidden="true" />
            Creating account...
          </>
        ) : (
          "Create account"
        )}
      </Button>
    </form>
  );
}
