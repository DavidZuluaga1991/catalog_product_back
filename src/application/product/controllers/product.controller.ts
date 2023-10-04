import { Request, Response } from "express";
import { Product } from "../../../domain/models/products.model";
import { ProductService } from "../services/product.service";

export class ProductController {
  constructor(private _productService: ProductService) {}

  public async getAllProduct(req: Request, res: Response) {
    const { pagination, filter } = req.body;
    try {
      const products = await this._productService.getAllProducts(
        filter,
        pagination
      );
      res.json(products);
    } catch (error) {
      throw new Error("PRODUCT_NOT_FOUND");
    }
  }

  public async getProductById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const product = await this._productService.getProductById(id);
      res.json(product);
    } catch (err) {
      throw new Error("PRODUCTS_NOT_FOUND");
    }
  }

  public async createProduct(req: Request, res: Response) {
    const { sku, name, description, image, price, stock, type } = req.body;
    try {
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
      const product = await this._productService.createProduct(newProduct);
      res.status(201).json({ product });
    } catch (error) {
      throw new Error("PRODUCT_NOT_FOUND");
    }
  }

  public async updateProduct(req: Request, res: Response) {
    const { id } = req.params;
    const { sku, name, description, image, price, stock, type } = req.body;
    try {
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
      await this._productService.updateProduct(id, product);
      res.status(201).json({ product });
    } catch (error) {
      throw new Error("PRODUCT_COULD_NOT_BE_UPDATED");
    }
  }

  public deleteProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
      this._productService.deleteProduct(id);
      res.status(200).json({ message: "PRODUCT_DISPOSED_CORRECTLY" });
    } catch (error) {
      throw new Error("THE_PRODUCT_COULD_NOT_BE_SUCCESSFULLY_REMOVED");
    }
  }
}
