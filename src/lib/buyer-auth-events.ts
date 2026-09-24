export const BUYER_AUTH_CHANGED =
  "buyer-auth-changed";

export function notifyBuyerAuthChanged() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent(BUYER_AUTH_CHANGED),
  );
}
