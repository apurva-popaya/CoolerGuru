import type { DirectoryProduct } from "@/types/product-directory";

export const directoryProducts: DirectoryProduct[] = [
  {
    id: "1",

    name: "Industrial Air Cooler DC-120",

    companyId: "1",
    company: "ABC Cooling Industries",

    location: "Ahmedabad, Gujarat",

    image: "/images/home/products/commercial-air-cooler.png",

    category: "Industrial Air Coolers",
    categorySlug: "industrial-air-coolers",

    specs: [
      {
        label: "Airflow",
        value: "12,000 m³/h",
      },
      {
        label: "Tank Capacity",
        value: "120 L",
      },
      {
        label: "Power",
        value: "1.1 kW / 1.5 HP",
      },
    ],

    moq: "10 Units",

    price: "₹78,000 - ₹85,000",

    isVerified: true,
  },

  {
    id: "2",

    name: "Desert Air Cooler Turbo 10000",

    companyId: "1",
    company: "ABC Cooling Industries",

    location: "Ahmedabad, Gujarat",

    image: "/images/home/products/commercial-air-cooler.png",

    category: "Desert Air Coolers",
    categorySlug: "desert-air-coolers",

    specs: [
      {
        label: "Airflow",
        value: "10,000 m³/h",
      },
      {
        label: "Tank Capacity",
        value: "100 L",
      },
      {
        label: "Power",
        value: "0.75 kW / 1 HP",
      },
    ],

    moq: "10 Units",

    price: "₹18,500 - ₹21,000",

    isPremium: true,
  },

  {
    id: "3",

    name: "Tower Air Cooler T-6000",

    companyId: "1",
    company: "ABC Cooling Industries",

    location: "Ahmedabad, Gujarat",

    image: "/images/home/products/commercial-air-cooler.png",

    category: "Tower Air Coolers",
    categorySlug: "tower-air-coolers",

    specs: [
      {
        label: "Airflow",
        value: "6,000 m³/h",
      },
      {
        label: "Tank Capacity",
        value: "90 L",
      },
      {
        label: "Power",
        value: "0.55 kW / 0.75 HP",
      },
    ],

    moq: "10 Units",

    price: "₹35,000 - ₹39,000",

    isPremium: true,
  },

  {
    id: "4",

    name: "Personal Air Cooler PC-3000",

    companyId: "1",
    company: "ABC Cooling Industries",

    location: "Ahmedabad, Gujarat",

    image: "/images/home/products/commercial-air-cooler.png",

    category: "Personal Air Coolers",
    categorySlug: "personal-air-coolers",

    specs: [
      {
        label: "Airflow",
        value: "3,000 m³/h",
      },
      {
        label: "Tank Capacity",
        value: "45 L",
      },
      {
        label: "Power",
        value: "180 W",
      },
    ],

    moq: "10 Units",

    price: "₹12,500 - ₹15,000",

    isVerified: true,
  },

  {
    id: "5",

    name: "Honeycomb Cooling Pad",

    companyId: "1",
    company: "ABC Cooling Industries",

    location: "Ahmedabad, Gujarat",

    image: "/images/home/categories/honeycomb-pad.png",

    category: "Air Cooler Components",
    categorySlug: "air-cooler-components",

    specs: [
      {
        label: "Material",
        value: "Kraft Paper",
      },
      {
        label: "Thickness",
        value: "100 mm",
      },
      {
        label: "Size",
        value: "90 × 60 × 10 cm",
      },
    ],

    moq: "50 Pcs",

    price: "₹250 - ₹320 / Pc",

    isVerified: true,
  },

  {
    id: "6",

    name: "Fan Blade 24 Inch Aluminum",

    companyId: "4",
    company: "MaxCool Industries",

    location: "Delhi, Delhi",

    image: "/images/home/products/fan-blade.png",

    category: "Air Cooler Components",
    categorySlug: "air-cooler-components",

    specs: [
      {
        label: "Material",
        value: "Aluminium",
      },
      {
        label: "Diameter",
        value: "24 Inch",
      },
      {
        label: "No. of Blades",
        value: "5",
      },
    ],

    moq: "20 Pcs",

    price: "₹620 - ₹750 / Pc",

    isVerified: true,
  },

  {
    id: "7",

    name: "Water Pump 1.0 HP",

    companyId: "5",
    company: "Prime Motors Pvt. Ltd.",

    location: "Coimbatore, Tamil Nadu",

    image: "/images/home/products/pump.png",

    category: "Electrical Components",
    categorySlug: "electrical-components",

    specs: [
      {
        label: "Power",
        value: "1.0 HP",
      },
      {
        label: "Head",
        value: "18 Meter",
      },
      {
        label: "Flow Rate",
        value: "100 LPM",
      },
    ],

    moq: "5 Pcs",

    price: "₹2,800 - ₹3,400",

    isVerified: true,
  },

  {
    id: "8",

    name: "Digital Cooler Controller",

    companyId: "6",
    company: "Eco Control Systems",

    location: "Delhi, Delhi",

    image: "/images/home/products/controller.png",

    category: "Electrical Components",
    categorySlug: "electrical-components",

    specs: [
      {
        label: "Display",
        value: "Digital LED",
      },
      {
        label: "Functions",
        value: "5 Speed",
      },
      {
        label: "Voltage",
        value: "220V AC",
      },
    ],

    moq: "10 Pcs",

    price: "₹1,950 - ₹2,450",

    isPremium: true,
  },

  {
    id: "9",

    name: "Blower 12 Inch",

    companyId: "7",
    company: "Cool Motors Solutions",

    location: "Ludhiana, Punjab",

    image: "/images/home/products/blower.png",

    category: "Air Cooler Components",
    categorySlug: "air-cooler-components",

    specs: [
      {
        label: "Diameter",
        value: "12 Inch",
      },
      {
        label: "Airflow",
        value: "2,500 m³/hr",
      },
      {
        label: "Material",
        value: "Plastic",
      },
    ],

    moq: "30 Pcs",

    price: "₹520 - ₹650 / Pc",

    isVerified: true,
  },

  {
    id: "10",

    name: "Heavy Duty Caster Wheel 4 Inch",

    companyId: "8",
    company: "Cool Breeze Solutions",

    location: "Mumbai, Maharashtra",

    image: "/images/home/products/caster-wheel.png",

    category: "Air Cooler Components",
    categorySlug: "air-cooler-components",

    specs: [
      {
        label: "Wheel Size",
        value: "4 Inch",
      },
      {
        label: "Load Capacity",
        value: "150 kg",
      },
      {
        label: "Material",
        value: "Nylon",
      },
    ],

    moq: "20 Pcs",

    price: "₹180 - ₹240 / Pc",

    isVerified: true,
  },
];
