import { getApiErrorMessage } from "@/lib/api/get-api-error-message";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1";

export interface BuyerNotificationInquiry {
  inquiry_number?: string;
  inquiry_id?: number | string;
  id?: number | string;
  [key: string]: unknown;
}

export interface BuyerNotification {
  notification_id: number;
  type: string;
  portal: string;
  title: string;
  message: string;
  is_read: boolean;
  read_at: string | null;
  created_at: string;
  inquiry?: BuyerNotificationInquiry | null;
}

export interface BuyerNotificationsPagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface BuyerNotificationsResponse {
  success: boolean;
  message: string;
  data: {
    notifications: BuyerNotification[];
    pagination: BuyerNotificationsPagination;
  };
}

export interface BuyerNotificationUnreadCountResponse {
  success: boolean;
  message: string;
  data: {
    unread_count: number;
  };
}

interface GetBuyerNotificationsParams {
  unread_only?: boolean;
  page?: number;
  limit?: number;
}

async function parseResponse<T>(response: Response): Promise<T> {
  let body: unknown;

  try {
    body = await response.json();
  } catch {
    throw new Error("Unable to read the server response.");
  }

  if (!response.ok) {
    if (
      body &&
      typeof body === "object" &&
      "message" in body &&
      typeof body.message === "string"
    ) {
      throw new Error(body.message);
    }

    throw new Error(`Request failed with status ${response.status}.`);
  }

  return body as T;
}

/**
 * Get buyer notifications.
 */
export async function getBuyerNotifications(
  params: GetBuyerNotificationsParams = {},
): Promise<BuyerNotificationsResponse> {
  const searchParams = new URLSearchParams();

  searchParams.set(
    "unread_only",
    String(params.unread_only ?? false),
  );

  searchParams.set("page", String(params.page ?? 1));
  searchParams.set("limit", String(params.limit ?? 100));

  const response = await fetch(
    `${API_BASE_URL}/buyer/notifications?${searchParams.toString()}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    },
  );

  return parseResponse<BuyerNotificationsResponse>(response);
}

/**
 * Get lightweight unread notification count.
 */
export async function getBuyerNotificationUnreadCount(): Promise<BuyerNotificationUnreadCountResponse> {
  const response = await fetch(
    `${API_BASE_URL}/buyer/notifications/unread-count`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    },
  );

  return parseResponse<BuyerNotificationUnreadCountResponse>(response);
}

/**
 * Mark one buyer notification as read.
 */
export async function markBuyerNotificationAsRead(
  notificationId: number,
): Promise<unknown> {
  const response = await fetch(
    `${API_BASE_URL}/buyer/notifications/${notificationId}/read`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    },
  );

  return parseResponse(response);
}

/**
 * Mark all buyer notifications as read.
 */
export async function markAllBuyerNotificationsAsRead(): Promise<unknown> {
  const response = await fetch(
    `${API_BASE_URL}/buyer/notifications/read-all`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    },
  );

  return parseResponse(response);
}

/**
 * Safely extract an inquiry number from a notification.
 *
 * The backend documentation currently shows `inquiry`
 * as an object without exposing its exact fields, so this
 * supports the common possible field names.
 */
export function getNotificationInquiryNumber(
  notification: BuyerNotification,
): string | null {
  const inquiry = notification.inquiry;

  if (!inquiry || typeof inquiry !== "object") {
    return null;
  }

  const possibleValues = [
    inquiry.inquiry_number,
    inquiry.inquiryNumber,
    inquiry.number,
    inquiry.inquiry_id,
    inquiry.inquiryId,
    inquiry.id,
  ];

  for (const value of possibleValues) {
    if (value !== undefined && value !== null) {
      return String(value);
    }
  }

  return null;
}