export type InquiryStatus = "New" | "Replied" | "In Discussion" | "Closed";

export type InquiryType = "Request Quote" | "Contact Supplier" | "Send Inquiry";

export interface InquiryRow {
  id: string;
  buyerName: string;
  buyerLocation: string;

  companyName: string;
  companyId: string;
  companyLocation: string;

  productName: string;
  productId?: string;

  inquiryType: InquiryType;

  quantity: string;

  createdDate: string;

  status: InquiryStatus;
}

export const inquiriesData: InquiryRow[] = [
  {
    id: "INQ-2024-1001",
    buyerName: "Rahul Enterprises",
    buyerLocation: "Delhi, Delhi",

    companyName: "Arctic Cooling Solutions",
    companyId: "arctic-cooling-solutions",
    companyLocation: "Delhi, Delhi",

    productName: "Industrial Air Cooler",
    productId: "industrial-air-cooler-ic-15000",

    inquiryType: "Request Quote",

    quantity: "20 Units",

    createdDate: "Jan 15, 2024, 10:30 AM",

    status: "New",
  },

  {
    id: "INQ-2024-1002",
    buyerName: "Sharma Traders",
    buyerLocation: "Mumbai, Maharashtra",

    companyName: "Shree Ram Refrigeration",
    companyId: "shree-ram-refrigeration",
    companyLocation: "Mumbai, Maharashtra",

    productName: "Desert Air Cooler",
    productId: "desert-air-cooler-dc-900",

    inquiryType: "Request Quote",

    quantity: "50 Units",

    createdDate: "Jan 14, 2024, 04:15 PM",

    status: "Replied",
  },

  {
    id: "INQ-2024-1003",
    buyerName: "CoolTech Distributors",
    buyerLocation: "Ahmedabad, Gujarat",

    companyName: "CoolTech Industries",
    companyId: "cooltech-industries",
    companyLocation: "Ahmedabad, Gujarat",

    productName: "Honeycomb Cooling Pad",
    productId: "honeycomb-cooling-pad-premium",

    inquiryType: "Request Quote",

    quantity: "200 Pcs",

    createdDate: "Jan 14, 2024, 11:20 AM",

    status: "In Discussion",
  },

  {
    id: "INQ-2024-1004",
    buyerName: "Green Home Solutions",
    buyerLocation: "Surat, Gujarat",

    companyName: "Frostline Exports",
    companyId: "frostline-exports",
    companyLocation: "Surat, Gujarat",

    productName: "Fan Blade 24 Inch",
    productId: "fan-blade-24-inch-aluminum",

    inquiryType: "Contact Supplier",

    quantity: "100 Pcs",

    createdDate: "Jan 13, 2024, 02:45 PM",

    status: "Closed",
  },

  {
    id: "INQ-2024-1005",
    buyerName: "Verma & Co.",
    buyerLocation: "Lucknow, Uttar Pradesh",

    companyName: "Mehta Cooling Systems",
    companyId: "mehta-cooling-systems",
    companyLocation: "Pune, Maharashtra",

    productName: "Cooler Motor 1 HP",
    productId: "cooler-motor-1-hp",

    inquiryType: "Request Quote",

    quantity: "30 Units",

    createdDate: "Jan 12, 2024, 09:10 AM",

    status: "Replied",
  },

  {
    id: "INQ-2024-1006",
    buyerName: "National Traders",
    buyerLocation: "Bengaluru, Karnataka",

    companyName: "Global Chill Technologies",
    companyId: "global-chill-technologies",
    companyLocation: "Bengaluru, Karnataka",

    productName: "Tower Air Cooler",
    productId: "tower-air-cooler-tc-3000",

    inquiryType: "Contact Supplier",

    quantity: "15 Units",

    createdDate: "Jan 11, 2024, 05:35 PM",

    status: "New",
  },

  {
    id: "INQ-2024-1007",
    buyerName: "Apex Retailers",
    buyerLocation: "Chennai, Tamil Nadu",

    companyName: "SnowMax Appliances",
    companyId: "snowmax-appliances",
    companyLocation: "Chennai, Tamil Nadu",

    productName: "Custom Cooling Solution",

    inquiryType: "Request Quote",

    quantity: "5 Units",

    createdDate: "Jan 10, 2024, 01:20 PM",

    status: "In Discussion",
  },

  {
    id: "INQ-2024-1008",
    buyerName: "Khan Enterprises",
    buyerLocation: "Jaipur, Rajasthan",

    companyName: "Elite Cool International",
    companyId: "elite-cool-international",
    companyLocation: "Kolkata, West Bengal",

    productName: "Desert Air Cooler",

    inquiryType: "Request Quote",

    quantity: "25 Units",

    createdDate: "Jan 09, 2024, 03:50 PM",

    status: "Replied",
  },

  {
    id: "INQ-2024-1009",
    buyerName: "Skyline Projects",
    buyerLocation: "Hyderabad, Telangana",

    companyName: "Prime Air Systems",
    companyId: "freshair-systems",
    companyLocation: "Hyderabad, Telangana",

    productName: "Industrial Air Cooler",

    inquiryType: "Contact Supplier",

    quantity: "10 Units",

    createdDate: "Jan 08, 2024, 11:05 AM",

    status: "Closed",
  },

  {
    id: "INQ-2024-1010",
    buyerName: "BuildRight Infra",
    buyerLocation: "Indore, Madhya Pradesh",

    companyName: "MaxCool Industries",
    companyId: "global-chill-technologies",
    companyLocation: "Indore, Madhya Pradesh",

    productName: "Honeycomb Cooling Pad",

    inquiryType: "Request Quote",

    quantity: "500 Pcs",

    createdDate: "Jan 07, 2024, 04:25 PM",

    status: "New",
  },
];

export const inquiryFilterOptions = {
  buyer: ["All", ...Array.from(new Set(inquiriesData.map((item) => item.buyerName)))],

  company: ["All", ...Array.from(new Set(inquiriesData.map((item) => item.companyName)))],

  product: ["All", ...Array.from(new Set(inquiriesData.map((item) => item.productName)))],

  status: ["All", "New", "Replied", "In Discussion", "Closed"],

  type: ["All", "Request Quote", "Contact Supplier", "Send Inquiry"],
};
