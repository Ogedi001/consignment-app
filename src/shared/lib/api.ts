export type ApiErrorDetail = { field: string; message: string };

export class ApiError extends Error {
  public readonly details: ApiErrorDetail[];
  constructor(
    message: string,
    public readonly status: number,
    public readonly data?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
    this.details = getApiErrorDetails(this.data);
  }
}

type ApiRequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

/**
 * Shared transport only. Feature services compose this with React Query and
 * provide feature-specific endpoints, types, query keys, and mutations.
 */
export async function api<T>(
  path: string,
  { body, headers, ...options }: ApiRequestOptions = {},
): Promise<T> {
  const response = await fetch(path, {
    ...options,
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
    headers: {
      Accept: "application/json",
      ...(body === undefined ? {} : { "Content-Type": "application/json" }),
      ...headers,
    },
  });

  const contentType = response.headers.get("content-type") ?? "";
  const data: unknown = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message = getApiErrorMessage(data, response.statusText || "Request failed");
    throw new ApiError(message, response.status, data);
  }

  return data as T;
}

function getApiErrorMessage(data: unknown, fallback: string) {
  if (typeof data !== "object" || data === null) return fallback;
  if ("message" in data && typeof data.message === "string") return data.message;
  if (
    "error" in data &&
    typeof data.error === "object" &&
    data.error !== null &&
    "message" in data.error &&
    typeof data.error.message === "string"
  ) {
    return data.error.message;
  }
  return fallback;
}
function getApiErrorDetails(data: unknown): ApiErrorDetail[] {
  if (typeof data !== "object" || data === null || !("error" in data)) return [];
  const error = data.error;
  if (typeof error !== "object" || error === null || !("details" in error)) return [];
  if (!Array.isArray(error.details)) return [];
  const result: ApiErrorDetail[] = [];
  for (const detail of error.details) {
    if (
      typeof detail === "object" &&
      detail !== null &&
      "field" in detail &&
      typeof detail.field === "string" &&
      "message" in detail &&
      typeof detail.message === "string"
    ) {
      result.push({ field: detail.field, message: detail.message });
    }
  }
  return result;
}
