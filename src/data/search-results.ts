import type { SearchResult } from "@/types/search";

export const searchResults: SearchResult[] = [
  {
    id: "1",
    type: "product",

    title: "Industrial Air Cooler IC-45000",
    category: "Industrial Coolers",

    image: "/images/home/products/commercial-air-cooler.png",

    airflow: "45,000 m³/h",
    tank: "120 L",
    power: "1.5 kW",
    moq: "5 Units",

    description: "Heavy duty industrial cooler with high air delivery for factories, warehouses and workshops.",

    company: "ABC Cooling Industries",
    location: "Ahmedabad, Gujarat",
    experience: "15+ Years in Business",

    createdAt: "2026-08-28",
  },

  {
    id: "2",
    type: "company",

    title: "ABC Cooling Industries",

    image: "/images/home/companies/abc-cooling.png",

    location: "Ahmedabad, Gujarat",

    description: "Leading manufacturer of industrial air coolers, desert coolers, and ventilation systems.",

    businessType: "Manufacturer",
    experience: "15+ Years in Business",

    products: "125+",
    employees: "150–250",
    established: "2005",

    createdAt: "2026-07-15",
  },

  {
    id: "3",
    type: "product",

    title: "Desert Air Cooler DC-120",
    category: "Desert Coolers",

    image: "/images/home/products/commercial-air-cooler.png",

    airflow: "12,000 m³/h",
    tank: "90 L",
    power: "0.75 kW",
    moq: "10 Units",

    description: "Energy efficient desert cooler ideal for commercial and industrial spaces.",

    company: "Arctic Cooling Systems",
    location: "Rajkot, Gujarat",
    experience: "10+ Years in Business",

    createdAt: "2026-08-20",
  },

  {
    id: "4",
    type: "company",

    title: "Arctic Cooling Systems",

    image: "/images/home/companies/arctic-cooling.png",

    location: "Rajkot, Gujarat",

    description: "Specialists in air coolers, ventilation fans and climate control solutions.",

    businessType: "Manufacturer",
    experience: "10+ Years in Business",

    products: "98+",
    employees: "100–150",
    established: "2010",

    createdAt: "2026-06-10",
  },
];

export const searchResultCounts = {
  total: 1245,
  products: 732,
  companies: 513,
};
