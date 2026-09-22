export interface CompanyCertification {
  id: string;
  title: string;
  subtitle: string;
}

export interface CompanyProfileProduct {
  id: string;
  name: string;
  image: string;

  airflow?: string;
  tank?: string;
  moq?: string;
}

export interface SimilarCompany {
  id: string;
  name: string;
  logo: string;
  location: string;
  description: string;

  isVerified?: boolean;
  isPremium?: boolean;
}

export interface CompanyProfile {
  id: string;

  name: string;
  logo: string;
  coverImage: string;

  location: string;

  businessTypes: string[];

  isVerified?: boolean;
  isPremium?: boolean;

  shortDescription: string;
  about: string;

  yearsInBusiness: string;
  employees: string;
  productCount: string;
  responseTime: string;

  productCategories: string[];

  products: CompanyProfileProduct[];

  contactPerson: string;
  phone: string;
  email: string;
  website: string;
  businessHours: string;

  linkedin?: string;
  facebook?: string;
  youtube?: string;

  establishedYear: string;
  legalStatus: string;
  gstNumber: string;
  panNumber: string;
  employeeStrength: string;

  exportMarkets: string;
  serviceAreas: string;

  certifications: CompanyCertification[];

  mapImage: string;

  brochureTitle: string;
  brochureSize: string;
  brochureUrl: string;

  similarCompanies: SimilarCompany[];
}
