import type { SupplierInquiryDetail } from "@/types/supplier-inquiry-detail";

export const supplierInquiryDetails: SupplierInquiryDetail[] = [
  {
    id: "1",

    inquiryNumber: "INQ-2025-0518",

    inquiryType: "REQUEST_QUOTE",

    status: "IN_DISCUSSION",

    receivedDate: "20 May 2025",
    receivedTime: "10:30 AM",

    buyer: {
      companyName: "Shree Ganesh Traders",
      contactPerson: "Mr. Rajesh Patel",
      phone: "+91 98765 43210",
      email: "rajesh.patel@shreeganesh.com",
      location: "Ahmedabad, Gujarat, India",
      isVerified: true,
    },

    preferredResponse: "Email",

    paymentTerms: "Not Specified",

    productRequirement: "Industrial Air Cooler",

    quantity: "50 Units",

    requirementSummary: "50,000 CMH Airflow",

    purpose: "Warehouse Ventilation",

    expectedDelivery: "Within 30 Days",

    message:
      "Dear Sir/Madam,\n\nWe are looking for high performance industrial air coolers for our new warehouse setup.\n\nPlease share your best quotation for the required specification mentioned.\n\nAlso share details about warranty and after sales support.\n\nThanks & Regards,\nRajesh Patel",

    requirementDetails: [
      {
        label: "Product Category",
        value: "Industrial Air Coolers",
      },
      {
        label: "Product Type",
        value: "Industrial Air Cooler",
      },
      {
        label: "Airflow Capacity",
        value: "50,000 CMH",
      },
      {
        label: "Quantity",
        value: "50 Units",
      },
      {
        label: "Application / Usage",
        value: "Warehouse Ventilation",
      },
      {
        label: "Installation Type",
        value: "Floor Standing",
      },
      {
        label: "Power Supply",
        value: "3 Phase, 415V, 50Hz",
      },
      {
        label: "Additional Requirements",
        value: "Energy efficient, low maintenance and easy to operate.",
      },
    ],

    timeline: [
      {
        id: "1",
        title: "Inquiry Received",
        date: "20 May 2025",
        time: "10:30 AM",
        description: "Inquiry has been received from the buyer.",
        type: "received",
      },
      {
        id: "2",
        title: "Viewed",
        date: "20 May 2025",
        time: "11:05 AM",
        description: "You viewed this inquiry.",
        type: "viewed",
      },
      {
        id: "3",
        title: "Replied by You",
        date: "20 May 2025",
        time: "11:30 AM",
        description: "You sent a response to the buyer.",
        type: "replied",
      },
      {
        id: "4",
        title: "In Discussion",
        date: "20 May 2025",
        time: "11:45 AM",
        description: "Buyer replied to your response.",
        type: "status",
      },
      {
        id: "5",
        title: "Last Activity",
        date: "20 May 2025",
        time: "11:45 AM",
        description: "Waiting for your next response.",
        type: "status",
      },
    ],

    attachments: [
      {
        id: "1",
        name: "Air_Cooler_Specification.pdf",
        size: "1.2 MB",
        type: "pdf",
        url: "#",
      },
      {
        id: "2",
        name: "Warehouse_Layout.jpg",
        size: "2.4 MB",
        type: "image",
        url: "#",
      },
    ],
  },
];
