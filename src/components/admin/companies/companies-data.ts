export type CompanyVerificationStatus = "Pending" | "Under Verification" | "Verified" | "Rejected";

export type CompanyBusinessType = "Manufacturer" | "Supplier" | "Exporter" | "Distributor" | "Trader";

export interface CompanyRow {
  id: string;
  name: string;
  logo?: string;
  location: string;
  businessType: CompanyBusinessType;
  verificationStatus: CompanyVerificationStatus;
  productsCount: number;
  inquiriesReceived: number;
  featured: boolean;
  joinedDate: string;
}

export const companiesData: CompanyRow[] = [
  {
    id: "arctic-cooling-solutions",
    name: "Arctic Cooling Solutions",
    location: "Delhi, Delhi",
    businessType: "Manufacturer",
    verificationStatus: "Verified",
    productsCount: 120,
    inquiriesReceived: 48,
    featured: true,
    joinedDate: "Jan 15, 2024",
  },
  {
    id: "shree-ram-refrigeration",
    name: "Shree Ram Refrigeration",
    location: "Mumbai, Maharashtra",
    businessType: "Supplier",
    verificationStatus: "Verified",
    productsCount: 85,
    inquiriesReceived: 32,
    featured: false,
    joinedDate: "Feb 03, 2024",
  },
  {
    id: "cooltech-industries",
    name: "CoolTech Industries",
    location: "Ahmedabad, Gujarat",
    businessType: "Manufacturer",
    verificationStatus: "Under Verification",
    productsCount: 42,
    inquiriesReceived: 18,
    featured: false,
    joinedDate: "Mar 10, 2024",
  },
  {
    id: "frostline-exports",
    name: "Frostline Exports",
    location: "Surat, Gujarat",
    businessType: "Exporter",
    verificationStatus: "Verified",
    productsCount: 210,
    inquiriesReceived: 76,
    featured: true,
    joinedDate: "Jan 28, 2024",
  },
  {
    id: "mehta-cooling-systems",
    name: "Mehta Cooling Systems",
    location: "Pune, Maharashtra",
    businessType: "Supplier",
    verificationStatus: "Rejected",
    productsCount: 18,
    inquiriesReceived: 4,
    featured: false,
    joinedDate: "Apr 05, 2024",
  },
  {
    id: "global-chill-technologies",
    name: "Global Chill Technologies",
    location: "Bengaluru, Karnataka",
    businessType: "Manufacturer",
    verificationStatus: "Verified",
    productsCount: 96,
    inquiriesReceived: 41,
    featured: true,
    joinedDate: "Feb 18, 2024",
  },
  {
    id: "snowmax-appliances",
    name: "SnowMax Appliances",
    location: "Chennai, Tamil Nadu",
    businessType: "Supplier",
    verificationStatus: "Verified",
    productsCount: 67,
    inquiriesReceived: 22,
    featured: false,
    joinedDate: "Mar 22, 2024",
  },
  {
    id: "elite-cool-international",
    name: "Elite Cool International",
    location: "Kolkata, West Bengal",
    businessType: "Exporter",
    verificationStatus: "Under Verification",
    productsCount: 33,
    inquiriesReceived: 11,
    featured: false,
    joinedDate: "Apr 12, 2024",
  },
  {
    id: "freshair-systems",
    name: "FreshAir Systems",
    location: "Pune, Maharashtra",
    businessType: "Manufacturer",
    verificationStatus: "Pending",
    productsCount: 15,
    inquiriesReceived: 0,
    featured: false,
    joinedDate: "May 30, 2025",
  },
  {
    id: "shree-cooling-solutions",
    name: "Shree Cooling Solutions",
    location: "Ahmedabad, Gujarat",
    businessType: "Manufacturer",
    verificationStatus: "Pending",
    productsCount: 9,
    inquiriesReceived: 0,
    featured: false,
    joinedDate: "May 31, 2025",
  },
  {
    id: "apex-climate-tech",
    name: "Apex Climate Tech",
    location: "Bengaluru, Karnataka",
    businessType: "Distributor",
    verificationStatus: "Pending",
    productsCount: 12,
    inquiriesReceived: 0,
    featured: false,
    joinedDate: "May 28, 2025",
  },
  {
    id: "national-air-products",
    name: "National Air Products",
    location: "Lucknow, Uttar Pradesh",
    businessType: "Trader",
    verificationStatus: "Under Verification",
    productsCount: 28,
    inquiriesReceived: 6,
    featured: false,
    joinedDate: "May 24, 2025",
  },
];

export const companyFilterOptions = {
  verificationStatus: ["All", "Pending", "Under Verification", "Verified", "Rejected"],

  businessType: ["All", "Manufacturer", "Supplier", "Exporter", "Distributor", "Trader"],

  location: [
    "All",
    "Ahmedabad, Gujarat",
    "Bengaluru, Karnataka",
    "Chennai, Tamil Nadu",
    "Delhi, Delhi",
    "Kolkata, West Bengal",
    "Lucknow, Uttar Pradesh",
    "Mumbai, Maharashtra",
    "Pune, Maharashtra",
    "Surat, Gujarat",
  ],

  featured: ["All", "Featured", "Not Featured"],
};
