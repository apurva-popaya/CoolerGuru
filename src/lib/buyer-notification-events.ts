export const BUYER_NOTIFICATIONS_UPDATED =
  "buyer-notifications-updated";

export function notifyBuyerNotificationsUpdated() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent(BUYER_NOTIFICATIONS_UPDATED),
  );
}