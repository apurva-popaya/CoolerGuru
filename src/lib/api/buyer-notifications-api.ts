import { apiRequest } from "@/lib/api/api-client";

/**
 * Backend rejects notification list requests with limit > 50.
 */
export const MAX_NOTIFICATIONS_LIMIT = 50;

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
  searchParams.set(
    "limit",
    String(
      Math.min(
        params.limit ?? MAX_NOTIFICATIONS_LIMIT,
        MAX_NOTIFICATIONS_LIMIT,
      ),
    ),
  );

  return apiRequest<BuyerNotificationsResponse>(
    `/buyer/notifications?${searchParams.toString()}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );
}

/**
 * Get lightweight unread notification count.
 */
export async function getBuyerNotificationUnreadCount(): Promise<BuyerNotificationUnreadCountResponse> {
  return apiRequest<BuyerNotificationUnreadCountResponse>(
    "/buyer/notifications/unread-count",
    {
      method: "GET",
      cache: "no-store",
    },
  );
}

/**
 * Mark one buyer notification as read.
 */
export async function markBuyerNotificationAsRead(
  notificationId: number,
): Promise<unknown> {
  return apiRequest<unknown>(
    `/buyer/notifications/${notificationId}/read`,
    {
      method: "PATCH",
    },
  );
}

/**
 * Mark all buyer notifications as read.
 */
export async function markAllBuyerNotificationsAsRead(): Promise<unknown> {
  return apiRequest<unknown>(
    "/buyer/notifications/read-all",
    {
      method: "PATCH",
    },
  );
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