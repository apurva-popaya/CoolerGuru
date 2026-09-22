import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "CoolerGuru",

  version: packageJson.version,

  copyright: `© ${currentYear} CoolerGuru. All rights reserved.`,

  meta: {
    title: "CoolerGuru - India's Cooling Industry Directory",

    description:
      "Discover trusted air cooler manufacturers, suppliers, products, components and cooling industry businesses across India.",
  },
};
