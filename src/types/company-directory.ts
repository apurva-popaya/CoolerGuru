export interface DirectoryCompany {
  id: number;
  slug: string;

  name: string;
  description: string;

  logo: string | null;

  location: string;

  businessTypes: string[];

  isVerified: boolean;
  isPremium: boolean;

  yearsInBusiness: string;
  productCount: string;
  employees: string;

  mainProducts: string[];
}