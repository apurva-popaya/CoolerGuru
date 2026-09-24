export interface NewLaunchProduct {
  id: string;
  productId: string;
  slug: string;

  name: string;

  company: string;
  location: string;

  image: string;

  isNew?: boolean;
}