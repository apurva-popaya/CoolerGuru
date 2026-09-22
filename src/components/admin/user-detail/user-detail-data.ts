import { type UserRole, type UserStatus, usersData } from "@/components/admin/users/users-data";

export type UserActivityType =
  | "Viewed Product"
  | "Viewed Company"
  | "Saved Product"
  | "Saved Company"
  | "Sent Inquiry"
  | "Contacted Company"
  | "Added Product"
  | "Updated Product"
  | "Replied Inquiry";

export interface UserActivity {
  id: string;

  type: UserActivityType;

  title: string;

  date: string;
}

export interface BuyerStats {
  savedProducts: number;

  savedCompanies: number;

  productsViewed: number;

  companiesViewed: number;

  inquiriesSent: number;

  companiesContacted: number;
}

export interface SupplierStats {
  company: string;

  companyId: string;

  products: number;

  inquiriesReceived: number;

  repliesSent: number;

  verification: "Verified" | "Under Verification" | "Rejected";
}

export interface UserDetailData {
  id: string;

  name: string;

  mobile: string;

  email: string;

  role: UserRole;

  accountType: string;

  status: UserStatus;

  location: string;

  registrationDate: string;

  lastActivity: string;

  buyerStats?: BuyerStats;

  supplierStats?: SupplierStats;

  activities: UserActivity[];
}

export function getUserDetail(userId: string): UserDetailData | null {
  const user = usersData.find((item) => item.id === userId);

  if (!user) {
    return null;
  }

  /*
   * SUPPLIER
   */
  if (user.role === "Supplier") {
    return {
      ...user,

      location: "Ahmedabad, Gujarat, India",

      registrationDate: user.joinedDate,

      supplierStats: {
        company: user.name,

        companyId: "arctic-cooling-solutions",

        products: 24,

        inquiriesReceived: 38,

        repliesSent: 29,

        verification: "Verified",
      },

      activities: [
        {
          id: "ACT001",
          type: "Updated Product",

          title: "Updated Industrial Air Cooler IC-15000",

          date: "08 Sep 2024, 02:15 PM",
        },

        {
          id: "ACT002",
          type: "Added Product",

          title: "Added Tower Air Cooler TC-3000",

          date: "07 Sep 2024, 11:40 AM",
        },

        {
          id: "ACT003",
          type: "Replied Inquiry",

          title: "Replied to INQ-2024-1002",

          date: "07 Sep 2024, 10:22 AM",
        },
      ],
    };
  }

  /*
   * BUYER
   */
  return {
    ...user,

    location: "Ahmedabad, Gujarat, India",

    registrationDate: user.joinedDate,

    buyerStats: {
      savedProducts: 8,

      savedCompanies: 4,

      productsViewed: 37,

      companiesViewed: 18,

      inquiriesSent: 6,

      companiesContacted: 4,
    },

    activities: [
      {
        id: "ACT001",

        type: "Viewed Product",

        title: "Industrial Air Cooler IC-15000",

        date: "08 Sep 2024, 02:15 PM",
      },

      {
        id: "ACT002",

        type: "Saved Company",

        title: "ABC Cooling Industries",

        date: "07 Sep 2024, 11:40 AM",
      },

      {
        id: "ACT003",

        type: "Sent Inquiry",

        title: "Request Quote to Arctic Cooling Systems",

        date: "07 Sep 2024, 10:22 AM",
      },

      {
        id: "ACT004",

        type: "Viewed Product",

        title: "Tower Air Cooler",

        date: "06 Sep 2024, 04:18 PM",
      },

      {
        id: "ACT005",

        type: "Saved Product",

        title: "Desert Air Cooler 9000",

        date: "05 Sep 2024, 03:50 PM",
      },

      {
        id: "ACT006",

        type: "Contacted Company",

        title: "MaxCool Systems",

        date: "04 Sep 2024, 12:12 PM",
      },
    ],
  };
}
