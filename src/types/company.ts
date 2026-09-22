export interface Company {
  id: string;

  name: string;

  logo?: string;

  location: string;

  businessTypes: string[];

  categories: string[];

  isVerified: boolean;

  isPremium: boolean;
}
