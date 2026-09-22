export interface DirectoryCompany {
  id: string;

  name: string;
  logo: string;

  location: string;
  description: string;

  businessTypes: string[];

  yearsInBusiness: string;
  productCount: string;
  employees: string;

  mainProducts: string[];

  isVerified?: boolean;
  isPremium?: boolean;
}
