export interface DirectoryProduct {
  id: string;

  name: string;

  companyId: string;
  company: string;

  location: string;

  image: string;

  category: string;
  categorySlug: string;

  specs: {
    label: string;
    value: string;
  }[];

  moq: string;

  price: string;

  isVerified?: boolean;

  isPremium?: boolean;
}
