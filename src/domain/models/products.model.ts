import { ObjectId } from "mongodb";
import { TypeProduct } from "../enums/type-products.enum";

export interface Product {
  name: string;
  description: string;
  sku: string;
  image: string;
  type: TypeProduct;
  price: number;
  stock: number;
  hasdeleted: boolean;
}
