export type SupplierProductStatus = "ACTIVE" | "INACTIVE";

export type SupplierStockStatus = "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";

export interface SupplierProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  subCategory?: string;
  modelNumber: string;
  price: number;
  stockStatus: SupplierStockStatus;
  status: SupplierProductStatus;
}
