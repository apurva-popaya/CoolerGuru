import type { SupplierOverviewData } from "./types";

export const supplierOverviewData: SupplierOverviewData = {
  id: "1",

  companyName: "ABC Cooling Industries",

  /*
   * Change this temporarily to test:
   *
   * NOT_VERIFIED
   * UNDER_VERIFICATION
   * VERIFIED
   * REJECTED
   */
  verificationStatus: "NOT_VERIFIED",

  profileCompletion: 0,

  rejectionReason: "The uploaded GST certificate is unclear. Please upload a valid and readable copy of the document.",

  totalProducts: 24,

  newInquiries: 5,

  profileViews: 128,

  recentInquiries: [
    {
      id: "INQ-2026-001",
      buyer: "Fresh Air Distributors",
      location: "Mumbai, Maharashtra",
      requirement: "50 Units - Industrial Air Coolers",
      date: "May 10, 2026",
      time: "10:30 AM",
      status: "New",
    },
    {
      id: "INQ-2026-002",
      buyer: "GreenVent Solutions",
      location: "Bengaluru, Karnataka",
      requirement: "100 Units - Air Coolers",
      date: "May 09, 2026",
      time: "04:15 PM",
      status: "Replied",
    },
    {
      id: "INQ-2026-003",
      buyer: "Shree Cooling Traders",
      location: "Ahmedabad, Gujarat",
      requirement: "20 Units - Desert Air Coolers",
      date: "May 08, 2026",
      time: "11:20 AM",
      status: "In Discussion",
    },
    {
      id: "INQ-2026-004",
      buyer: "Metro Facility Services",
      location: "Delhi, Delhi",
      requirement: "75 Units - Industrial Air Coolers",
      date: "May 07, 2026",
      time: "03:05 PM",
      status: "Replied",
    },
    {
      id: "INQ-2026-005",
      buyer: "Arctic Retail Systems",
      location: "Pune, Maharashtra",
      requirement: "10 Units - Tower Air Coolers",
      date: "May 06, 2026",
      time: "09:45 AM",
      status: "New",
    },
  ],

  products: [
    {
      id: "1",
      title: "Industrial Air Coolers",
      units: "24 Units",
      image: "/images/home/products/commercial-air-cooler.png",
    },
    {
      id: "2",
      title: "Desert Air Coolers",
      units: "18 Units",
      image: "/images/home/products/commercial-air-cooler.png",
    },
    {
      id: "3",
      title: "Tower Air Coolers",
      units: "12 Units",
      image: "/images/home/products/commercial-air-cooler.png",
    },
    {
      id: "4",
      title: "Portable Air Coolers",
      units: "10 Units",
      image: "/images/home/products/commercial-air-cooler.png",
    },
  ],
};
