/**
 * Accept only application-relative destinations. This keeps a redirect hint
 * useful across authentication journeys without allowing an open redirect.
 */
export function getSafeAuthRedirect(value: string | null | undefined) {
  if (!value?.startsWith("/")) return undefined;

  try {
    const base = "https://trustflow.invalid";
    const destination = new URL(value, base);

    if (destination.origin !== base) return undefined;

    return `${destination.pathname}${destination.search}${destination.hash}`;
  } catch {
    return undefined;
  }
}

export function withAuthRedirect(pathname: string, redirectTo?: string) {
  if (!redirectTo) return pathname;

  return `${pathname}?redirect=${encodeURIComponent(redirectTo)}`;
}
