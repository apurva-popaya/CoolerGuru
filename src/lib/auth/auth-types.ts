export type ActivePortal = "BUYER" | "SELLER" | "ADMIN";

export interface AuthUser {
  user_id: number;
  name: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone_number: string;
  roles: string[];
  active_portal: ActivePortal;
}
