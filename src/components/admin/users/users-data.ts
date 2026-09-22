export type UserRole = "Buyer" | "Supplier";

export type UserStatus = "Active" | "Inactive";

export type UserAccountType = "Buyer" | "Company";

export interface AdminUserRow {
  id: string;

  backendId?: number;

  name: string;

  mobile: string;

  email: string;

  role: UserRole;

  accountType: UserAccountType;

  status: UserStatus;

  joinedDate: string;

  lastActivity: string;
}

export const usersData: AdminUserRow[] = [
  {
    id: "USR001245",
    backendId: 1,
    name: "Rahul Sharma",
    mobile: "+91 98765 43210",
    email: "rahul.sharma@gmail.com",
    role: "Buyer",
    accountType: "Buyer",
    status: "Active",
    joinedDate: "12 Aug 2024, 10:24 AM",
    lastActivity: "08 Sep 2024, 02:15 PM",
  },

  {
    id: "USR001246",
    backendId: 2,
    name: "Priya Chauhan",
    mobile: "+91 91234 56789",
    email: "priya.c@gmail.com",
    role: "Supplier",
    accountType: "Company",
    status: "Active",
    joinedDate: "10 Aug 2024, 04:11 PM",
    lastActivity: "07 Sep 2024, 11:30 AM",
  },

  {
    id: "USR001247",
    backendId: 3,
    name: "Amit Kumar",
    mobile: "+91 99887 66554",
    email: "amit.kumar@gmail.com",
    role: "Buyer",
    accountType: "Buyer",
    status: "Inactive",
    joinedDate: "05 Aug 2024, 09:20 AM",
    lastActivity: "20 Aug 2024, 06:45 PM",
  },

  {
    id: "USR001248",
    backendId: 4,
    name: "Sneha Cooling Pvt Ltd",
    mobile: "+91 87654 32109",
    email: "info@snehacooling.com",
    role: "Supplier",
    accountType: "Company",
    status: "Active",
    joinedDate: "01 Aug 2024, 12:05 PM",
    lastActivity: "09 Sep 2024, 01:10 PM",
  },

  {
    id: "USR001250",
    backendId: 5,
    name: "Manoj Jaiswal",
    mobile: "+91 78899 11223",
    email: "manoj.jaiswal@gmail.com",
    role: "Buyer",
    accountType: "Buyer",
    status: "Active",
    joinedDate: "25 Jul 2024, 11:18 AM",
    lastActivity: "06 Sep 2024, 03:40 PM",
  },

  {
    id: "USR001251",
    backendId: 6,
    name: "Ritu Cooling Systems",
    mobile: "+91 76987 65432",
    email: "ritu@ritucooling.com",
    role: "Supplier",
    accountType: "Company",
    status: "Inactive",
    joinedDate: "20 Jul 2024, 02:14 PM",
    lastActivity: "14 Aug 2024, 10:22 AM",
  },

  {
    id: "USR001252",
    backendId: 7,
    name: "Vikram Singh",
    mobile: "+91 90987 12345",
    email: "vikram.singh@gmail.com",
    role: "Buyer",
    accountType: "Buyer",
    status: "Active",
    joinedDate: "18 Jul 2024, 09:40 AM",
    lastActivity: "08 Sep 2024, 05:18 PM",
  },

  {
    id: "USR001253",
    backendId: 8,
    name: "Neha Cooling Solutions",
    mobile: "+91 99876 54321",
    email: "contact@nehacooling.com",
    role: "Supplier",
    accountType: "Company",
    status: "Active",
    joinedDate: "15 Jul 2024, 03:27 PM",
    lastActivity: "07 Sep 2024, 12:06 PM",
  },

  {
    id: "USR001254",
    backendId: 9,
    name: "Suresh Khandelwal",
    mobile: "+91 91230 98765",
    email: "suresh.k@gmail.com",
    role: "Buyer",
    accountType: "Buyer",
    status: "Inactive",
    joinedDate: "10 Jul 2024, 01:15 PM",
    lastActivity: "28 Aug 2024, 04:50 PM",
  },
];

export const userFilterOptions = {
  roles: ["All", "Buyer", "Supplier"],

  accountTypes: ["All", "Buyer", "Company"],

  statuses: ["All", "Active", "Inactive"],
};
