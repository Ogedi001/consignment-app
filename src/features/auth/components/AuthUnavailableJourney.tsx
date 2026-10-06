import Link from "next/link";
import { Button } from "@/shared/components/ui";
import { AuthHeader } from "./AuthHeader";
import { AuthShell } from "./AuthShell";

export function AuthUnavailableJourney({ title, description }: { title: string; description: string }) {
  return <AuthShell><div className="w-full max-w-[25rem]"><AuthHeader /><h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1><p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p><p role="status" className="mt-6 rounded-lg border border-border bg-surface px-3 py-3 text-sm text-muted-foreground">This action is not available yet. Your account and current sign-in details have not changed.</p><Button asChild variant="outline" size="lg" className="mt-7 w-full"><Link href="/auth/sign-in">Back to sign in</Link></Button></div></AuthShell>;
}
