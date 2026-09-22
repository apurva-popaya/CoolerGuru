import {
  type CompanyBusinessType,
  type CompanyVerificationStatus,
  companiesData,
} from "@/components/admin/companies/companies-data";

export interface CompanyDocument {
  id: string;
  name: string;
  fileName: string;
  size: string;
}

export interface CompanyProduct {
  id: string;
  name: string;
  category: string;
  status: "Active" | "Inactive";
  price: string;
}

export interface CompanyInquiry {
  id: string;
  buyer: string;
  inquiry: string;
  date: string;
  response: string;
  status: "New" | "Replied" | "Closed";
}

export interface CompanyDetailData {
  id: string;
  name: string;
  tagline: string;
  location: string;

  businessType: CompanyBusinessType;
  verificationStatus: CompanyVerificationStatus;

  featured: boolean;
  joinedDate: string;

  supplierName: string;
  supplierPhone: string;
  supplierEmail: string;

  about: string;

  gstNumber: string;
  panNumber: string;
  registrationNumber: string;

  companyType: string;
  yearsInBusiness: string;
  employeeSize: string;

  website: string;
  serviceAreas: string[];

  registeredAddress: string;
  city: string;
  state: string;
  pincode: string;

  businessHours: string;
  contactEmail: string;
  contactPhone: string;

  productsCount: number;
  activeProducts: number;
  inactiveProducts: number;

  inquiriesReceived: number;
  sellerResponses: number;
  profileViews: number;
  savedByBuyers: number;

  verificationSubmitted: string;
  verifiedBy?: string;
  lastReviewed?: string;

  rejectionReason?: string;
  rejectedBy?: string;
  rejectedDate?: string;

  documents: CompanyDocument[];

  categories: string[];

  products: CompanyProduct[];

  inquiries: CompanyInquiry[];
}

const commonDocuments: CompanyDocument[] = [
  {
    id: "gst",
    name: "GST Certificate",
    fileName: "gst-certificate.pdf",
    size: "2.1 MB",
  },
  {
    id: "pan",
    name: "PAN Document",
    fileName: "pan-card.pdf",
    size: "1.2 MB",
  },
  {
    id: "incorporation",
    name: "Incorporation Certificate",
    fileName: "incorporation.pdf",
    size: "1.8 MB",
  },
  {
    id: "brochure",
    name: "Company Brochure",
    fileName: "company-brochure.pdf",
    size: "4.5 MB",
  },
];

const defaultProducts: CompanyProduct[] = [
  {
    id: "ic-5000",
    name: "Industrial Air Cooler IC-5000",
    category: "Industrial Air Coolers",
    status: "Active",
    price: "₹ 45,000",
  },
  {
    id: "dc-pro",
    name: "Desert Cooler DC-Pro",
    category: "Desert Air Coolers",
    status: "Active",
    price: "₹ 28,500",
  },
  {
    id: "honeycomb-pad",
    name: "Honeycomb Cooling Pad",
    category: "Air Cooler Components",
    status: "Active",
    price: "₹ 1,250",
  },
  {
    id: "tower-x1",
    name: "Tower Air Cooler X1",
    category: "Tower Air Coolers",
    status: "Inactive",
    price: "₹ 12,800",
  },
];

const defaultInquiries: CompanyInquiry[] = [
  {
    id: "inq-1",
    buyer: "R.K. Enterprises",
    inquiry: "Need price for 50 units IC-5000",
    date: "May 31, 2025",
    response: "Replied with quotation",
    status: "Replied",
  },
  {
    id: "inq-2",
    buyer: "Sharma Traders",
    inquiry: "Bulk order for desert coolers",
    date: "May 29, 2025",
    response: "Product details shared",
    status: "Replied",
  },
  {
    id: "inq-3",
    buyer: "Global Cooling Ltd",
    inquiry: "Export inquiry - cooling pads",
    date: "May 28, 2025",
    response: "Under review",
    status: "New",
  },
];

export function getCompanyDetail(companyId: string): CompanyDetailData | null {
  const company = companiesData.find((item) => item.id === companyId);

  if (!company) {
    return null;
  }

  const isRejected = company.verificationStatus === "Rejected";

  const isVerified = company.verificationStatus === "Verified";

  return {
    id: company.id,
    name: company.name,

    tagline: "Manufacturer and supplier of commercial & industrial cooling solutions",

    location: company.location,

    businessType: company.businessType,

    verificationStatus: company.verificationStatus,

    featured: company.featured,

    joinedDate: company.joinedDate,

    supplierName: "Rajesh Patel",
    supplierPhone: "+91 98765 43210",
    supplierEmail: "admin@coolerguru-demo.com",

    about: `${company.name} is a cooling industry business providing air coolers, components and related solutions. This static content will later be replaced by data received from the CoolerGuru company API.`,

    gstNumber: "24AABCA1234F1Z5",
    panNumber: "AABCA1234D",
    registrationNumber: "U29199GJ2013PTC075678",

    companyType: "Private Limited",
    yearsInBusiness: "12+ Years",
    employeeSize: "51 - 200 employees",

    website: "www.example.com",

    serviceAreas: ["Gujarat", "Maharashtra", "Rajasthan", "Delhi NCR"],

    registeredAddress: "Plot No. 25, GIDC Industrial Estate, Ahmedabad, Gujarat, India",

    city: company.location.split(",")[0] ?? "",

    state: company.location.split(",")[1]?.trim() ?? "",

    pincode: "382330",

    businessHours: "Mon - Sat: 9:00 AM - 6:00 PM",

    contactEmail: "info@company.com",

    contactPhone: "+91 98765 43210",

    productsCount: company.productsCount,

    activeProducts: Math.max(company.productsCount - 6, 0),

    inactiveProducts: Math.min(company.productsCount, 6),

    inquiriesReceived: company.inquiriesReceived,

    sellerResponses: Math.max(company.inquiriesReceived - 9, 0),

    profileViews: isVerified ? 1240 : 0,

    savedByBuyers: isVerified ? 87 : 0,

    verificationSubmitted: "10 May 2025",

    verifiedBy: isVerified ? "Admin User" : undefined,

    lastReviewed: isVerified ? "20 May 2025" : undefined,

    rejectionReason: isRejected
      ? "Submitted GST certificate could not be verified. Supplier must upload a valid document and resubmit the company profile."
      : undefined,

    rejectedBy: isRejected ? "Admin User" : undefined,

    rejectedDate: isRejected ? "21 May 2025" : undefined,

    documents: commonDocuments,

    categories: ["Air Cooler Manufacturers", "Industrial Air Coolers", "Desert Air Coolers", "Air Cooler Components"],

    products: defaultProducts,

    inquiries: defaultInquiries,
  };
}
