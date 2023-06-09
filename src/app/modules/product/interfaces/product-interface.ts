import { Image } from "../../shared/interfaces/image-interface";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  storeId: number;
  productCategoryId: number;
  images: Image[];
}
