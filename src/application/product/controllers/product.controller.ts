import { Request, Response } from "express";
import { ProductPersistence } from "../../../ports/persistence/product/product.persistence";
import { Product } from "../../../domain/models/products.model";
import { ResultSearch } from "../../../common/models/result-search.model";
import { Utils } from "../../../common/middlewares/utils.middleware";
import { Filter } from "../../../common/models/filter.model";
import { ProductService } from "../services/product.service";

export class ProductController {
  constructor(private _productService: ProductService) {}
  public async getAllProduct(req: Request, res: Response) {
    const { pagination, filter } = req.body;

    const products = await this._productService.getAllProducts(
      filter,
      pagination
    );
    console.log(products);
    res.json(products);
  }

  public getProductById(req: Request, res: Response) {
    const { id } = req.params;
    this._productService
      .getProductById(id)
      .then((product) => {
        res.json(product);
      })
      .catch((err) => {
        throw new Error("PRODUCT_NOT_FOUND");
      });
  }

  public createProduct(req: Request, res: Response) {
    const { sku, name, description, image, price, stock, type } = req.body;
    const newProduct: Product = {
      sku,
      name,
      description,
      image,
      price,
      stock,
      type,
      hasdeleted: false,
    };
    this._productService
      .createProduct(newProduct)
      .then((product) => {
        res.status(201).json({ product });
      })
      .catch((err) => {
        throw new Error("PRODUCT_NOT_FOUND");
      });
  }

  public updateProduct(req: Request, res: Response) {
    const { id } = req.params;
    const { sku, name, description, image, price, stock, type } = req.body;
    const product: Product = {
      sku,
      name,
      description,
      image,
      price,
      stock,
      type,
      hasdeleted: false,
    };
    this._productService
      .updateProduct(id, product)
      .then((product) => {
        res.status(201).json({ product });
      })
      .catch((err) => new Error("PRODUCT_COULD_NOT_BE_UPDATED"));
  }

  public deleteProduct(req: Request, res: Response) {
    const { id } = req.params;
    this._productService
      .deleteProduct(id)
      .then((product) => {
        res.status(200).json({ message: "PRODUCT_DISPOSED_CORRECTLY" });
      })
      .catch((err) => {
        throw new Error("THE_PRODUCT_COULD_NOT_BE_SUCCESSFULLY_REMOVED");
      });
  }
}
