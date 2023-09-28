import { Pagination } from "../../../common/models/pagination.model";
import { Product } from "../../../domain/models/products.model";
import { ProductPersistence } from "../../../ports/persistence/product/product.persistence";

export class ProductService {
  constructor(private _productPersistence: ProductPersistence) {}

  getAllProducts(filter: any, pagination: Pagination): Promise<Product[]> {
    return this._productPersistence.getAllProducts(filter, pagination);
  }
  getProductById(id: string): Promise<Product | null> {
    return this._productPersistence.getProductById(id);
  }
  createProduct(product: Product): Promise<Product> {
    return this._productPersistence.createProduct(product);
  }
  updateProduct(id: string, product: Product): Promise<Product | null> {
    return this._productPersistence.updateProduct(id, product);
  }
  deleteProduct(id: string): Promise<Product | null> {
    return this._productPersistence.deleteProduct(id);
  }
  countProducts(filter: any, pagination: Pagination): Promise<number> {
    return this._productPersistence.countProducts(filter, pagination);
  }
}
