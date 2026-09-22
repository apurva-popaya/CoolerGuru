import type { DashboardNavGroup } from "./types";

export const supplierNavigation: DashboardNavGroup[] = [
  {
    id: "supplier",
    label: "SUPPLIER PANEL",

    items: [
      {
        id: "overview",
        title: "Overview",
        href: "/supplier/dashboard",
        icon: "overview",
      },

      {
        id: "company-profile",
        title: "Manage Company Profile",
        href: "/supplier/dashboard/company-profile",
        icon: "company-profile",
      },

      {
        id: "products",
        title: "Products",
        href: "/supplier/dashboard/products",
        icon: "products",
      },

      {
        id: "inquiries",
        title: "Inquiries",
        href: "/supplier/dashboard/inquiries",
        icon: "inquiries",
      },
    ],
  },
];
