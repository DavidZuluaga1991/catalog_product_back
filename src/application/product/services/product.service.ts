import { Utils } from "../../../common/middlewares/utils.middleware";
import { Filter } from "../../../common/models/filter.model";
import { Pagination } from "../../../common/models/pagination.model";
import { ResultSearch } from "../../../common/models/result-search.model";
import { Product } from "../../../domain/models/products.model";
import { ProductPersistence } from "../../../ports/persistence/product/product.persistence";

export class ProductService {
  private utils: Utils = new Utils();

  constructor(private _productPersistence: ProductPersistence) {}

  public async getAllProducts(
    filter: Filter[],
    pagination: Pagination
  ): Promise<ResultSearch<Product[]>> {
    const tempPagination = this.utils.ValidatePagination(
      pagination.pageSize + "",
      pagination.page + ""
    );
    const products = await this._productPersistence.getAllProducts(
      filter,
      tempPagination
    );
    const count = await this._productPersistence.countProducts(
      filter,
      tempPagination
    );
    const totalPages = this.utils.GetTotalPages(count, tempPagination.pageSize);
    const result: ResultSearch<Product[]> = {
      data: products,
      pagination: {
        ...tempPagination,
        countData: products.length,
        totalPages,
      },
    };
    return new Promise<ResultSearch<Product[]>>((resolve, reject) => {
      resolve(result);
    });
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
