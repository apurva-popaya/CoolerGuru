import type { CompanyProfile } from "@/types/company-profile";

export const companyProfiles: CompanyProfile[] = [
  {
    id: "1",

    name: "ABC Cooling Industries",

    logo: "/images/home/companies/abc-cooling.png",

    coverImage: "/images/company-profile/company-cover.png",

    location: "Ahmedabad, Gujarat, India",

    businessTypes: ["Manufacturer", "Exporter", "Supplier"],

    isVerified: true,
    isPremium: true,

    shortDescription:
      "ABC Cooling Industries is a leading manufacturer and exporter of high quality air coolers and cooling solutions for industrial, commercial and domestic application.",

    about:
      "Established in 2009, ABC Cooling Industries specializes in the design, engineering and manufacturing of energy-efficient air coolers and components. Our commitment to innovation, durability and customer satisfaction has helped us build a strong global presence across 20+ countries.",

    yearsInBusiness: "15+",
    employees: "120+",
    productCount: "150+",
    responseTime: "1-2 Hrs",

    productCategories: ["Air Cooler Manufacturers", "Air Cooler Components", "Electrical Components"],

    products: [
      {
        id: "1",
        name: "Industrial Air Cooler DC-120",
        image: "/images/home/products/commercial-air-cooler.png",
        airflow: "12,000 m³/h",
        tank: "120 L",
        moq: "10 Units",
      },
      {
        id: "2",
        name: "Desert Air Cooler Turbo 10000",
        image: "/images/home/products/commercial-air-cooler.png",
        airflow: "10,000 m³/h",
        tank: "100 L",
        moq: "10 Units",
      },
      {
        id: "3",
        name: "Tower Air Cooler T-6000",
        image: "/images/home/products/commercial-air-cooler.png",
        airflow: "6,000 m³/h",
        tank: "90 L",
        moq: "10 Units",
      },
      {
        id: "4",
        name: "Personal Air Cooler PC-3000",
        image: "/images/home/products/commercial-air-cooler.png",
        airflow: "3,000 m³/h",
        tank: "45 L",
        moq: "10 Units",
      },
      {
        id: "5",
        name: "Honeycomb Cooling Pad",
        image: "/images/home/categories/honeycomb-pad.png",
        moq: "50 Pcs",
      },
    ],

    contactPerson: "Sales Desk",
    phone: "+91 79 4010 1234",
    email: "sales@abccooling.com",
    website: "www.abccooling.com",

    businessHours: "Mon - Sat: 10:00 AM - 6:00 PM",

    linkedin: "linkedin.com/company/abccooling",

    facebook: "facebook.com/abccoolingindustries",

    youtube: "youtube.com/@ABCCooling",

    establishedYear: "2009",

    legalStatus: "Private Limited",

    gstNumber: "24AABCC1234D1Z5",

    panNumber: "AAACB1234E",

    employeeStrength: "120+",

    exportMarkets: "Middle East, Africa, Europe, South East Asia",

    serviceAreas: "India & Worldwide",

    certifications: [
      {
        id: "iso",
        title: "ISO",
        subtitle: "9001:2015 Quality Management",
      },
      {
        id: "ce",
        title: "CE",
        subtitle: "Certified European Conformity",
      },
      {
        id: "rohs",
        title: "RoHS",
        subtitle: "Compliant Environmental Standard",
      },
    ],

    mapImage: "/images/company-profile/ahmedabad-map.png",

    brochureTitle: "ABC Cooling Industries Company Profile 2024",

    brochureSize: "2.4 MB",

    brochureUrl: "#",

    similarCompanies: [
      {
        id: "3",

        name: "Cool Breeze Solutions",

        logo: "/images/home/companies/cool-breeze.png",

        location: "Mumbai, Maharashtra",

        description: "Premium range of air coolers and cooling systems.",

        isVerified: true,
      },
      {
        id: "4",

        name: "MaxCool Industries",

        logo: "/images/home/companies/maxcool.png",

        location: "Faridabad, Haryana",

        description: "Manufacturer of cooling equipment with superior quality.",

        isPremium: true,
      },
      {
        id: "5",

        name: "Prime Motors Pvt. Ltd.",

        logo: "/images/home/companies/prime-motors.png",

        location: "Coimbatore, Tamil Nadu",

        description: "Reliable motor and fan solutions for cooling applications.",

        isVerified: true,
      },
    ],
  },
];
