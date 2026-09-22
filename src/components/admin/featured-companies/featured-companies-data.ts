export type FeaturedBusinessType = "Manufacturer" | "Supplier" | "Distributor" | "Exporter" | "Component Supplier";

export interface FeaturedCompanyRow {
  id: string;

  name: string;

  location: string;

  businessType: FeaturedBusinessType;

  isFeatured: boolean;

  featuredSince: string | null;

  priority: number | null;
}

export const featuredCompaniesData: FeaturedCompanyRow[] = [
  {
    id: "abc-cooling-industries",
    name: "ABC Cooling Industries",
    location: "Ahmedabad, Gujarat",
    businessType: "Manufacturer",
    isFeatured: true,
    featuredSince: "12 Aug 2024",
    priority: 1,
  },

  {
    id: "arctic-cooling-systems",
    name: "Arctic Cooling Systems",
    location: "Delhi, India",
    businessType: "Manufacturer",
    isFeatured: true,
    featuredSince: "05 Aug 2024",
    priority: 2,
  },

  {
    id: "cool-breeze-pvt-ltd",
    name: "Cool Breeze Pvt. Ltd.",
    location: "Mumbai, Maharashtra",
    businessType: "Supplier",
    isFeatured: true,
    featuredSince: "28 Jul 2024",
    priority: 3,
  },

  {
    id: "maxcool-industries",
    name: "MaxCool Industries",
    location: "Pune, Maharashtra",
    businessType: "Manufacturer",
    isFeatured: true,
    featuredSince: "20 Jul 2024",
    priority: 4,
  },

  {
    id: "prime-motors",
    name: "Prime Motors",
    location: "Coimbatore, Tamil Nadu",
    businessType: "Component Supplier",
    isFeatured: true,
    featuredSince: "15 Jul 2024",
    priority: 5,
  },

  {
    id: "havai-cooling-solutions",
    name: "Havai Cooling Solutions",
    location: "Surat, Gujarat",
    businessType: "Manufacturer",
    isFeatured: true,
    featuredSince: "10 Jul 2024",
    priority: 6,
  },

  {
    id: "skycool-appliances",
    name: "SkyCool Appliances",
    location: "Indore, Madhya Pradesh",
    businessType: "Distributor",
    isFeatured: false,
    featuredSince: null,
    priority: null,
  },

  {
    id: "chilltech-systems",
    name: "ChillTech Systems",
    location: "Bengaluru, Karnataka",
    businessType: "Manufacturer",
    isFeatured: false,
    featuredSince: null,
    priority: null,
  },

  {
    id: "airflow-engineers",
    name: "AirFlow Engineers",
    location: "Jaipur, Rajasthan",
    businessType: "Supplier",
    isFeatured: false,
    featuredSince: null,
    priority: null,
  },

  {
    id: "bluewind-cooling",
    name: "BlueWind Cooling",
    location: "Lucknow, Uttar Pradesh",
    businessType: "Manufacturer",
    isFeatured: false,
    featuredSince: null,
    priority: null,
  },
];

export const featuredCompanyFilterOptions = {
  featuredStatus: ["All", "Featured", "Not Featured"],

  businessType: ["All", "Manufacturer", "Supplier", "Distributor", "Exporter", "Component Supplier"],
};
