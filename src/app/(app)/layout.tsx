import { AppShell } from "@/features/operations";

export default function ApplicationLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <AppShell>{children}</AppShell>;
}
