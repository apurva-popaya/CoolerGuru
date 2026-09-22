import type { DashboardNavGroup } from "./types";

export const buyerNavigation: DashboardNavGroup[] = [
  {
    id: "buyer",
    label: "BUYER PANEL",
    items: [
      {
        id: "overview",
        title: "Overview",
        href: "/dashboard",
        icon: "overview",
      },

      {
        id: "inquiries",
        title: "My Inquiries",
        href: "/dashboard/inquiries",
        icon: "inquiries",
      },

      {
        id: "saved-products",
        title: "Saved Products",
        href: "/dashboard/saved-products",
        icon: "saved-products",
      },

      {
        id: "saved-companies",
        title: "Saved Companies",
        href: "/dashboard/saved-companies",
        icon: "saved-companies",
      },
    ],
  },
];
