import { Building2, Home, MessageSquare, Package } from "lucide-react";

export const supplierDashboardNavigation = [
  {
    label: "Overview",
    href: "/supplier/dashboard",
    icon: Home,
    requiresVerification: false,
  },
  {
    label: "Manage Company Profile",
    href: "/supplier/dashboard/company-profile",
    icon: Building2,
    requiresVerification: false,
  },
  {
    label: "Products",
    href: "/supplier/dashboard/products",
    icon: Package,
    requiresVerification: true,
  },
  {
    label: "Inquiries",
    href: "/supplier/dashboard/inquiries",
    icon: MessageSquare,
    requiresVerification: true,
  },
] as const;
