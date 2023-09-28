import { Collection, Db, ObjectId } from "mongodb";
import { Product } from "../../../domain/models/products.model";
import { ProductPersistence } from "../../../ports/persistence/product/product.persistence";
import { MongoDB } from "../../../infrastructure/database/mongodb";
import { Pagination } from "../../../common/models/pagination.model";

export class ProductRepository implements ProductPersistence {
  private _collection!: Collection<Product>;
  constructor(private _db: MongoDB) {
    this._collection = this._db.getDb().collection<Product>("product");
  }

  async getAllProducts(
    filter: any,
    pagination: Pagination
  ): Promise<Product[]> {
    return await this._collection
      .find(filter)
      .sort({ sku: -1 })
      .limit(pagination.pageSize)
      .skip(pagination.skip ?? 1)
      .toArray();
  }
  getProductById(id: string): Promise<Product | null> {
    return this._collection.findOne({ _id: new ObjectId(id) });
  }
  createProduct(product: Product): Promise<Product> {
    return new Promise<Product>((resolve, reject) => {
      this._collection
        .insertOne(product)
        .then((res) => resolve(product))
        .catch((err) => reject(err));
    });
  }
  updateProduct(id: string, product: Product): Promise<Product | null> {
    return this._collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: product },
      { returnDocument: "after" }
    );
  }

  deleteProduct(id: string): Promise<Product | null> {
    return this._collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { hasdeleted: true } },
      { returnDocument: "after" }
    );
  }

  countProducts(filter: any, pagination: Pagination): Promise<number> {
    return this._collection.countDocuments(filter);
  }
}
