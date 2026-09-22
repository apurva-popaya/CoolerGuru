export interface AnalyticsStat {
  id: string;
  title: string;
  value: string;
  growth: number;
}

export const analyticsStats = {
  main: [
    {
      id: "total-users",
      title: "Total Users",
      value: "12,480",
      growth: 12,
    },

    {
      id: "total-buyers",
      title: "Total Buyers",
      value: "8,960",
      growth: 14,
    },

    {
      id: "total-suppliers",
      title: "Total Suppliers",
      value: "3,420",
      growth: 8,
    },

    {
      id: "companies",
      title: "Companies",
      value: "1,254",
      growth: 11,
    },

    {
      id: "products",
      title: "Products",
      value: "5,860",
      growth: 9,
    },

    {
      id: "inquiries",
      title: "Inquiries",
      value: "2,184",
      growth: 16,
    },
  ],

  monthly: [
    {
      id: "new-users",
      title: "New Users This Month",
      value: "892",
      growth: 18,
    },

    {
      id: "new-companies",
      title: "New Companies This Month",
      value: "76",
      growth: 12,
    },

    {
      id: "new-products",
      title: "New Products This Month",
      value: "420",
      growth: 9,
    },
  ],
};

export const inquiryVolumeData = [
  { month: "Jan", inquiries: 90 },
  { month: "Feb", inquiries: 115 },
  { month: "Mar", inquiries: 130 },
  { month: "Apr", inquiries: 145 },
  { month: "May", inquiries: 175 },
  { month: "Jun", inquiries: 168 },
  { month: "Jul", inquiries: 185 },
  { month: "Aug", inquiries: 225 },
  { month: "Sep", inquiries: 218 },
  { month: "Oct", inquiries: 258 },
  { month: "Nov", inquiries: 300 },
  { month: "Dec", inquiries: 355 },
];

export const userGrowthData = [
  {
    month: "Jan",
    buyers: 3400,
    suppliers: 800,
  },
  {
    month: "Feb",
    buyers: 3700,
    suppliers: 950,
  },
  {
    month: "Mar",
    buyers: 4200,
    suppliers: 1100,
  },
  {
    month: "Apr",
    buyers: 4700,
    suppliers: 1250,
  },
  {
    month: "May",
    buyers: 5400,
    suppliers: 1400,
  },
  {
    month: "Jun",
    buyers: 6200,
    suppliers: 1550,
  },
  {
    month: "Jul",
    buyers: 6500,
    suppliers: 1750,
  },
  {
    month: "Aug",
    buyers: 7100,
    suppliers: 1900,
  },
  {
    month: "Sep",
    buyers: 7700,
    suppliers: 2050,
  },
  {
    month: "Oct",
    buyers: 8200,
    suppliers: 2200,
  },
  {
    month: "Nov",
    buyers: 8900,
    suppliers: 2450,
  },
  {
    month: "Dec",
    buyers: 10800,
    suppliers: 2950,
  },
];

export const topCategoriesData = [
  {
    name: "Air Cooler Manufacturers",
    value: 1560,
  },
  {
    name: "Air Cooler Components",
    value: 980,
  },
  {
    name: "Electrical Components",
    value: 720,
  },
  {
    name: "Raw Material Suppliers",
    value: 540,
  },
  {
    name: "Machinery Suppliers",
    value: 420,
  },
  {
    name: "OEM & Contract Manufacturing",
    value: 380,
  },
];

export interface RankingItem {
  id: string;
  name: string;
  value: string;
  image?: string;
}

export const mostViewedProducts: RankingItem[] = [
  {
    id: "product-1",
    name: "Industrial Air Cooler",
    value: "24,560",
  },
  {
    id: "product-2",
    name: "Desert Air Cooler",
    value: "18,420",
  },
  {
    id: "product-3",
    name: "Tower Air Cooler",
    value: "16,380",
  },
  {
    id: "product-4",
    name: "Honeycomb Cooling Pad",
    value: "14,220",
  },
  {
    id: "product-5",
    name: "Air Cooler Motor",
    value: "12,960",
  },
];

export const mostSavedProducts: RankingItem[] = [
  {
    id: "product-1",
    name: "Industrial Air Cooler",
    value: "3,240",
  },
  {
    id: "product-2",
    name: "Portable Air Cooler",
    value: "2,980",
  },
  {
    id: "product-3",
    name: "Commercial Air Cooler",
    value: "2,420",
  },
  {
    id: "product-4",
    name: "Cooling Fan Blade",
    value: "1,860",
  },
  {
    id: "product-5",
    name: "Honeycomb Pad",
    value: "1,720",
  },
];

export const mostViewedCompanies: RankingItem[] = [
  {
    id: "company-1",
    name: "ABC Cooling Industries",
    value: "42,580",
  },
  {
    id: "company-2",
    name: "Arctic Cooling Systems",
    value: "38,420",
  },
  {
    id: "company-3",
    name: "Cool Breeze Pvt. Ltd.",
    value: "25,960",
  },
  {
    id: "company-4",
    name: "MaxCool Industries",
    value: "22,140",
  },
  {
    id: "company-5",
    name: "Havai Cooling Solutions",
    value: "18,760",
  },
];

export const mostSavedCompanies: RankingItem[] = [
  {
    id: "company-1",
    name: "ABC Cooling Industries",
    value: "8,240",
  },
  {
    id: "company-2",
    name: "Arctic Cooling Systems",
    value: "6,420",
  },
  {
    id: "company-3",
    name: "Cool Breeze Pvt. Ltd.",
    value: "5,980",
  },
  {
    id: "company-4",
    name: "MaxCool Industries",
    value: "4,860",
  },
  {
    id: "company-5",
    name: "Havai Cooling Solutions",
    value: "4,120",
  },
];
