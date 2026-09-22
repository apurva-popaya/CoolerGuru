const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1";

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  [key: string]: unknown;
}

export class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);

    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

interface ApiRequestOptions extends RequestInit {
  skipAuthRefresh?: boolean;
}

let refreshPromise: Promise<boolean> | null = null;

async function parseResponse(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();

  return text || null;
}

function getErrorMessage(data: unknown): string {
  if (data && typeof data === "object" && "message" in data) {
    const message = (
      data as {
        message?: unknown;
      }
    ).message;

    if (typeof message === "string" && message.trim()) {
      return message;
    }
  }

  return "Something went wrong. Please try again.";
}

async function refreshAccessToken(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",

      credentials: "include",

      headers: {
        Accept: "application/json",
      },
    });

    return response.ok;
  } catch {
    return false;
  }
}

async function runRefresh(): Promise<boolean> {
  refreshPromise ??= refreshAccessToken().finally(() => {
    refreshPromise = null;
  });

  return refreshPromise;
}

export async function apiRequest<T>(endpoint: string, options: ApiRequestOptions = {}): Promise<T> {
  const { skipAuthRefresh = false, ...requestOptions } = options;

  const headers = new Headers(requestOptions.headers);

  if (requestOptions.body && !(requestOptions.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  const executeRequest = () =>
    fetch(`${API_BASE_URL}${endpoint}`, {
      ...requestOptions,

      headers,

      credentials: "include",
    });

  let response = await executeRequest();

  /*
   * If the access cookie expired,
   * attempt refresh once.
   *
   * We skip this behavior for auth
   * endpoints themselves to avoid loops.
   */
  if (response.status === 401 && !skipAuthRefresh) {
    const refreshed = await runRefresh();

    if (refreshed) {
      response = await executeRequest();
    }
  }

  const data = await parseResponse(response);

  if (!response.ok) {
    throw new ApiError(getErrorMessage(data), response.status, data);
  }

  return data as T;
}
