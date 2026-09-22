export interface CategoryGroup {
  id: string;
  title: string;
  slug: string;
  icon: "cooler" | "component" | "electrical";
  images: string[];
  items: string[];
  href: string;
}

export const airCoolerCategoryGroups: CategoryGroup[] = [
  {
    id: "manufacturers",
    title: "Air Cooler Manufacturers",
    slug: "air-cooler-manufacturers",
    icon: "cooler",

    images: ["/images/home/categories/air-cooler-manufacturer.png", "/images/home/categories/honeycomb-pad-v2.png"],

    items: [
      "Desert Air Coolers",
      "Tower Air Coolers",
      "Personal Air Coolers",
      "Window Air Coolers",
      "Commercial Air Coolers",
      "Industrial Air Coolers",
      "Duct Air Coolers",
      "Tank Coolers",
      "Wall Fans",
    ],

    href: "/category/air-cooler-manufacturers",
  },

  {
    id: "components",
    title: "Air Cooler Components",
    slug: "air-cooler-components",
    icon: "component",

    images: ["/images/home/categories/synchronous-motor.png", "/images/home/categories/fan-blade-v2.png"],

    items: [
      "Motors",
      "Pumps",
      "Fan Blades",
      "Bearings",
      "Electrical Parts",
      "Cooling Pads & Honeycomb Pads",
      "Plastic / ABS Accessories",
      "Water Level Controllers",
      "Water Inlet / Outlet Parts",
    ],

    href: "/category/air-cooler-components",
  },

  {
    id: "electrical",
    title: "Electrical Components",
    slug: "electrical-components",
    icon: "electrical",

    images: [
      "/images/home/categories/electrical-switch-top.png",
      "/images/home/categories/electrical-switch-bottom.png",
    ],

    items: [
      "Electric Cables and Wires",
      "Switches",
      "Speed Controllers",
      "Capacitors",
      "Wiring Harness",
      "PCB & Electronics",
      "Contactors",
      "Panel & Control Systems",
    ],

    href: "/category/electrical-components",
  },
];
