import type { DashboardNavGroup } from "./types";

export const adminNavigation: DashboardNavGroup[] = [
  {
    id: "admin",
    label: "ADMIN PANEL",

    items: [
      {
        id: "overview",
        title: "Overview",
        href: "/admin",
        icon: "overview",
      },

      {
        id: "companies",
        title: "Companies",
        href: "/admin/companies",
        icon: "companies",
      },

      {
        id: "products",
        title: "Products",
        href: "/admin/products",
        icon: "products",
      },

      {
        id: "inquiries",
        title: "Inquiries",
        href: "/admin/inquiries",
        icon: "inquiries",
      },

      {
        id: "categories",
        title: "Manage Categories",
        href: "/admin/categories",
        icon: "categories",
      },

      {
        id: "users",
        title: "Manage Users",
        href: "/admin/users",
        icon: "users",
      },

      {
        id: "featured-companies",
        title: "Featured Companies",
        href: "/admin/featured-companies",
        icon: "featured-companies",
      },

      {
        id: "activity",
        title: "Activity",
        href: "/admin/activity",
        icon: "activity",
      },

      {
        id: "analytics",
        title: "Analytics",
        href: "/admin/analytics",
        icon: "analytics",
      },
    ],
  },
];
