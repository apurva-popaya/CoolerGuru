import type { Company } from "@/types/company";

export const featuredCompanies: Company[] = [
  {
    id: "1",
    name: "ABC Cooling Industries",
    logo: "/images/home/companies/abc-cooling.png",
    location: "Ahmedabad, Gujarat",
    businessTypes: ["Manufacturer", "Exporter"],
    categories: ["Industrial Air Coolers", "Duct Coolers", "Commercial Coolers", "OEM Products"],
    isVerified: false,
    isPremium: true,
  },

  {
    id: "2",
    name: "Arctic Cooling Systems",
    logo: "/images/home/companies/arctic-cooling.png",
    location: "Kolkata, West Bengal",
    businessTypes: ["Manufacturer", "Supplier"],
    categories: ["Air Coolers", "Components"],
    isVerified: true,
    isPremium: false,
  },

  {
    id: "3",
    name: "Cool Breeze Solutions",
    logo: "/images/home/companies/cool-breeze.png",
    location: "Dewas, Madhya Pradesh",
    businessTypes: ["Manufacturer", "Exporter"],
    categories: ["Components", "OEM", "Coolers"],
    isVerified: true,
    isPremium: false,
  },

  {
    id: "4",
    name: "MaxCool Industries",
    logo: "/images/home/companies/maxcool.png",
    location: "Delhi, India",
    businessTypes: ["Manufacturer", "Exporter"],
    categories: ["Air Coolers", "Commercial Coolers", "Parts", "OEM"],
    isVerified: false,
    isPremium: true,
  },

  {
    id: "5",
    name: "Prime Motors Pvt. Ltd.",
    logo: "/images/home/companies/prime-motors.png",
    location: "Coimbatore, Tamil Nadu",
    businessTypes: ["Manufacturer", "Supplier"],
    categories: ["Cooler Motors", "Fan Motors", "Pumps", "OEM Components"],
    isVerified: true,
    isPremium: false,
  },
];
