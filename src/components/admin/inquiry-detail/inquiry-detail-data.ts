import { type InquiryStatus, type InquiryType, inquiriesData } from "@/components/admin/inquiries/inquiries-data";

export interface InquiryMessage {
  id: string;
  sender: string;
  role: "Buyer" | "Supplier";
  time: string;
  message: string;
}

export interface InquiryAttachment {
  id: string;
  name: string;
  type: "PDF" | "XLSX";
  size: string;
}

export interface InquiryTimelineItem {
  id: string;
  date: string;
  event: string;
}

export interface InquiryDetailData {
  id: string;

  status: InquiryStatus;

  createdDate: string;

  inquiryType: InquiryType;

  quantity: string;

  buyer: {
    id: string;
    name: string;
    company: string;
    location: string;
    email: string;
    phone: string;
    buyerType: string;
  };

  company: {
    id: string;
    name: string;
    contactPerson: string;
    location: string;
    email: string;
    phone: string;
    supplierTypes: string[];
    verified: boolean;
  };

  product: {
    id?: string;
    name: string;
    category: string;
    quantity: string;
    budget: string;
    deliveryLocation: string;
    notes: string;
  };

  originalInquiry: string;

  attachments: InquiryAttachment[];

  messages: InquiryMessage[];

  timeline: InquiryTimelineItem[];

  lastActivity: string;
}

export function getInquiryDetail(inquiryId: string): InquiryDetailData | null {
  const inquiry = inquiriesData.find((item) => item.id === inquiryId);

  if (!inquiry) {
    return null;
  }

  return {
    id: inquiry.id,

    status: inquiry.status,

    createdDate: inquiry.createdDate,

    inquiryType: inquiry.inquiryType,

    quantity: inquiry.quantity,

    buyer: {
      id: "buyer-rahul-sharma",
      name: "Rahul Sharma",
      company: "FreshAir Distributors",
      location: "Mumbai, Maharashtra",
      email: "rahul@freshair.in",
      phone: "+91 98765 43210",
      buyerType: "Distributor",
    },

    company: {
      id: inquiry.companyId,
      name: inquiry.companyName,
      contactPerson: "Sales Desk",
      location: inquiry.companyLocation,
      email: "sales@company.com",
      phone: "+91 79 4010 1234",
      supplierTypes: ["Manufacturer", "Exporter", "Supplier"],
      verified: true,
    },

    product: {
      id: inquiry.productId,

      name: inquiry.productName,

      category: "Industrial Air Coolers",

      quantity: inquiry.quantity,

      budget: "₹78,000 - ₹85,000 / unit",

      deliveryLocation: "Mumbai, Maharashtra",

      notes:
        "Need high airflow industrial coolers for warehouse ventilation. Looking for pricing, availability, dispatch timeline, and warranty support.",
    },

    originalInquiry: `Hi,\nWe are looking for ${inquiry.productName} for our warehouse project in Mumbai. Please share the best price, availability, dispatch timeline and warranty details.\n\nThanks,\nRahul Sharma\nFreshAir Distributors`,

    attachments: [
      {
        id: "attachment-1",
        name: "warehouse-layout.pdf",
        type: "PDF",
        size: "1.8 MB",
      },

      {
        id: "attachment-2",
        name: "requirement-sheet.xlsx",
        type: "XLSX",
        size: "420 KB",
      },
    ],

    messages: [
      {
        id: "message-1",
        sender: "Rahul Sharma",
        role: "Buyer",
        time: "14 Mar 2025, 10:24 AM",
        message:
          "Hi, We are looking for Industrial Air Cooler IC-45000 for our warehouse project in Mumbai. Please share the best price, availability, dispatch timeline and warranty details.",
      },

      {
        id: "message-2",
        sender: "Sales Desk",
        role: "Supplier",
        time: "14 Mar 2025, 01:15 PM",
        message:
          "Dear Rahul Sharma, thank you for your inquiry. We have noted your requirement and are pleased to share our quote. Please find the detailed pricing and specifications attached.",
      },

      {
        id: "message-3",
        sender: "Rahul Sharma",
        role: "Buyer",
        time: "15 Mar 2025, 09:42 AM",
        message:
          "Thanks for the quote. Could you please confirm the estimated delivery timeline to Mumbai? Also, do you provide warranty support for this model?",
      },

      {
        id: "message-4",
        sender: "Sales Desk",
        role: "Supplier",
        time: "15 Mar 2025, 12:10 PM",
        message:
          "We can dispatch within 10–12 working days after order confirmation. The product comes with 1 year manufacturer warranty and we also provide after-sales support across India.",
      },

      {
        id: "message-5",
        sender: "Rahul Sharma",
        role: "Buyer",
        time: "15 Mar 2025, 02:30 PM",
        message:
          "That sounds good. We are interested to proceed further. Please share the proforma invoice and let us know the next steps.",
      },
    ],

    timeline: [
      {
        id: "timeline-1",
        date: "14 Mar 2025, 10:24 AM",
        event: "Inquiry Received from Rahul Sharma",
      },

      {
        id: "timeline-2",
        date: "14 Mar 2025, 11:03 AM",
        event: "Viewed by Supplier",
      },

      {
        id: "timeline-3",
        date: "14 Mar 2025, 01:15 PM",
        event: "Seller Replied",
      },

      {
        id: "timeline-4",
        date: "15 Mar 2025, 09:42 AM",
        event: "Buyer Follow-up Received",
      },

      {
        id: "timeline-5",
        date: "15 Mar 2025, 02:30 PM",
        event: "Status Updated to In Discussion",
      },
    ],

    lastActivity: "15 Mar 2025, 02:30 PM",
  };
}
