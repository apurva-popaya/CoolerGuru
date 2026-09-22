export interface ProductDetailSpecification {
  label: string;
  value: string;
}

export interface ProductDetailColour {
  name: string;
  className: string;
}

export interface ProductDetailRelatedProduct {
  id: string;
  name: string;
  company: string;
  location: string;
  image: string;
  specs: string[];
  price: string;
  isVerified?: boolean;
  isPremium?: boolean;
}

export interface ProductDetail {
  id: string;
  name: string;
  category: string;

  images: string[];

  companyId: string;
  companyName: string;
  companyLogo: string;
  companyLocation: string;
  companyDescription: string;
  companyYears: string;
  companyBusinessTypes: string[];

  isVerifiedSupplier?: boolean;

  description: string;

  price: string;
  priceUnit: string;

  highlightSpecs: {
    label: string;
    value: string;
  }[];

  colours: ProductDetailColour[];

  overview: string;
  benefits: string[];

  specificationsLeft: ProductDetailSpecification[];
  specificationsRight: ProductDetailSpecification[];

  videoThumbnail: string;
  videoUrl: string;

  catalogueTitle: string;
  catalogueSize: string;
  catalogueUrl: string;

  relatedProducts: ProductDetailRelatedProduct[];
}
