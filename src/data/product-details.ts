import type { ProductDetail } from "@/types/product-detail";

export const productDetails: ProductDetail[] = [
  {
    id: "1",

    name: "Industrial Air Cooler IC-15000",

    category: "Industrial Air Coolers",

    images: [
      "/images/home/products/commercial-air-cooler.png",
      "/images/home/products/commercial-air-cooler.png",
      "/images/home/products/commercial-air-cooler.png",
      "/images/home/products/commercial-air-cooler.png",
    ],

    companyId: "2",

    companyName: "Arctic Cooling Systems",

    companyLogo: "/images/home/companies/arctic-cooling.png",

    companyLocation: "Ahmedabad, Gujarat",

    companyDescription:
      "Arctic Cooling Systems is a leading manufacturer of industrial cooling solutions with over 15 years of experience. We deliver high-quality air coolers and components with a focus on innovation, performance and customer satisfaction.",

    companyYears: "15+ Years in Business",

    companyBusinessTypes: ["Manufacturer", "Supplier"],

    isVerifiedSupplier: true,

    description:
      "High-performance industrial air cooler designed for large spaces such as factories, warehouses, workshops and commercial areas. Delivers powerful airflow with energy-efficient operation and low maintenance.",

    price: "₹78,000 – ₹85,000",

    priceUnit: "/ Unit",

    highlightSpecs: [
      {
        label: "Airflow",
        value: "15,000 m³/h",
      },
      {
        label: "Tank Capacity",
        value: "120 L",
      },
      {
        label: "Power",
        value: "1.1 kW",
      },
      {
        label: "Coverage Area",
        value: "1,800 sq ft",
      },
      {
        label: "MOQ",
        value: "1 Unit",
      },
      {
        label: "Available Colours",
        value: "White, Grey, Blue",
      },
      {
        label: "Supply Ability",
        value: "50 Units / Month",
      },
      {
        label: "HSN Code",
        value: "8415",
      },
    ],

    colours: [
      {
        name: "White",
        className: "bg-white",
      },
      {
        name: "Grey",
        className: "bg-gray-400",
      },
      {
        name: "Blue",
        className: "bg-[#34469b]",
      },
    ],

    overview:
      "The IC-15000 Industrial Air Cooler is built for high-efficiency cooling in industrial and commercial environments. With a powerful 15,000 m³/h airflow and large 120L water tank, it ensures consistent cooling even in extreme conditions. Its durable build, energy-efficient motor, and honeycomb cooling pads make it a reliable choice for large areas.",

    benefits: [
      "Powerful airflow for large spaces",
      "Low energy consumption",
      "Easy mobility with heavy-duty caster wheels",
      "Honeycomb pads for superior cooling",
      "Environment-friendly and cost-effective solution",
    ],

    specificationsLeft: [
      {
        label: "Model",
        value: "IC-15000",
      },
      {
        label: "Airflow",
        value: "15,000 m³/h",
      },
      {
        label: "Tank Capacity",
        value: "120 L",
      },
      {
        label: "Motor Type",
        value: "100% Copper, Single Phase",
      },
      {
        label: "Power",
        value: "1.1 kW / 1.5 HP",
      },
      {
        label: "Voltage",
        value: "220V / 50Hz",
      },
    ],

    specificationsRight: [
      {
        label: "Dimensions (L×W×H)",
        value: "1100 × 1100 × 1650 mm",
      },
      {
        label: "Material",
        value: "PP Body (UV Resistant)",
      },
      {
        label: "Cooling Media",
        value: "High Efficiency Honeycomb",
      },
      {
        label: "Wheel Type",
        value: "Heavy Duty Caster Wheels",
      },
      {
        label: "Suitable Application",
        value: "Factories, Warehouses, Workshops, Events",
      },
      {
        label: "Warranty",
        value: "1 Year on Motor",
      },
    ],

    videoThumbnail: "/images/home/products/commercial-air-cooler.png",

    videoUrl: "#",

    catalogueTitle: "IC-15000 Catalogue.pdf",

    catalogueSize: "1.2 MB",

    catalogueUrl: "#",

    relatedProducts: [
      {
        id: "2",
        name: "Desert Air Cooler DC-900",
        company: "Cool Breeze Solutions",
        location: "Ludhiana, Punjab",
        image: "/images/home/products/commercial-air-cooler.png",
        specs: ["Airflow: 9,000 m³/h", "Tank Capacity: 70 L", "Power: 0.75 kW / 1 HP"],
        price: "₹18,500 – ₹21,000 / Unit",
        isVerified: true,
      },

      {
        id: "5",
        name: "Tower Air Cooler TC-3000",
        company: "Arctic Cooling Systems",
        location: "Ahmedabad, Gujarat",
        image: "/images/home/products/commercial-air-cooler.png",
        specs: ["Airflow: 3,000 m³/h", "Water Flow: 8 LPM", "Power: 0.66 kW / 0.75 HP"],
        price: "₹33,000 – ₹39,000 / Unit",
        isPremium: true,
      },

      {
        id: "3",
        name: "Honeycomb Cooling Pad Premium",
        company: "MaxCool Industries",
        location: "Delhi, Delhi",
        image: "/images/home/categories/honeycomb-pad.png",
        specs: ["Material: Kraft Paper", "Thickness: 100 mm", "Size: 90 × 60 × 10 cm"],
        price: "₹230 – ₹320 / Pc",
        isVerified: true,
      },

      {
        id: "4",
        name: "Cooler Motor 1 HP",
        company: "Prime Motors Pvt. Ltd.",
        location: "Coimbatore, Tamil Nadu",
        image: "/images/home/products/motor.png",
        specs: ["Power: 1 HP", "Speed: 1400 RPM", "Voltage: 220V / 50Hz"],
        price: "₹1,450 – ₹1,850 / Unit",
        isPremium: true,
      },
    ],
  },
];
