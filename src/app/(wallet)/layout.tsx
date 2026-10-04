import { AppShell } from "@/features/operations";

export default function WalletLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <AppShell>{children}</AppShell>;
}
