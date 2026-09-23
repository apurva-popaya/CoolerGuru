export interface CompanyCertification {
  id: string;
  title: string;
  subtitle?: string;
}

export interface CompanyProfileProduct {
  id: string;
  slug: string;
  name: string;
  image: string;

  airflow?: string;
  tank?: string;
  power?: string;
  moq?: string;
}

export interface SimilarCompany {
  id: string;
  slug: string;
  name: string;
  logo: string;
  location: string;
  description: string;

  businessTypes?: string[];

  isVerified?: boolean;
  isPremium?: boolean;
}

export interface CompanyProfile {
  id: string;
  slug: string;

  name: string;
  logo: string;
  coverImage: string;

  location: string;

  businessTypes: string[];

  isVerified?: boolean;
  isPremium?: boolean;

  shortDescription: string;
  about: string;

  yearsInBusiness?: string;
  employees?: string;
  productCount: string;
  responseTime?: string;

  productCategories: string[];
  products: CompanyProfileProduct[];

  contactPerson?: string;
  phone?: string;
  email?: string;
  website?: string;
  businessHours?: string;

  linkedin?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  twitter?: string;

  establishedYear?: string;
  legalStatus?: string;
  gstNumber?: string;
  panNumber?: string;

  employeeStrength?: string;
  exportMarkets?: string;
  serviceAreas?: string;

  certifications: CompanyCertification[];

  /*
   * We use the company's actual address/map data
   * instead of requiring a fake map image.
   */
  mapAddress?: string;
  latitude?: string;
  longitude?: string;

  brochureUrl?: string;

  similarCompanies: SimilarCompany[];
}