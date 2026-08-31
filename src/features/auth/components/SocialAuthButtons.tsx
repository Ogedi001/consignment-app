import Image from "next/image";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/shared/components/ui";
import type { SocialProvider } from "../types";

type SocialAuthButtonsProps = {
  disabled?: boolean;
  pendingProvider?: SocialProvider;
  onSelect: (provider: SocialProvider) => void;
};

const options: { provider: SocialProvider; label: string; icon: string }[] = [
  { provider: "google", label: "Google", icon: "/logo/icon-google.svg" },
  { provider: "apple", label: "Apple", icon: "/logo/apple-logo-dark.svg" },
];

export function SocialAuthButtons({
  disabled,
  pendingProvider,
  onSelect,
}: SocialAuthButtonsProps) {
  return (
    <div className="grid gap-3">
      {options.map(({ provider, label, icon }) => {
        const pending = pendingProvider === provider;
        return (
          <Button
            key={provider}
            type="button"
            variant="secondary"
            size="lg"
            disabled={disabled}
            onClick={() => onSelect(provider)}
          >
            {pending ? (
              <LoaderCircle className="animate-spin" aria-hidden="true" />
            ) : (
              <Image
                src={icon}
                alt=""
                width={18}
                height={18}
                className="size-[18px] object-contain"
              />
            )}{" "}
            {pending ? `Connecting to ${label}...` : `Continue with ${label}`}
          </Button>
        );
      })}
    </div>
  );
}
