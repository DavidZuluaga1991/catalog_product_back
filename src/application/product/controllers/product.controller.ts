import { Request, Response } from "express";
import { ProductPersistence } from "../../../ports/persistence/product/product.persistence";
import { Product } from "../../../domain/models/products.model";
import { ResultSearch } from "../../../common/models/result-search.model";
import { Utils } from "../../../common/middlewares/utils.middleware";
import { Filter } from "../../../common/models/filter.model";

export class ProductController {
  utils: Utils = new Utils();

  constructor(private _productPersistence: ProductPersistence) {}

  public getAllProduct2(req: Request, res: Response) {
    const filter = {
      $or: [{ hasdeleted: false }, { hasdeleted: undefined }],
    };
    const pagination = this.utils.ValidatePagination(
      req.query.pageSize + "",
      req.query.page + ""
    );
    this._productPersistence
      .countProducts(filter, pagination)
      .then((count) => {
        const totalPages = this.utils.GetTotalPages(count, pagination.pageSize);
        this._productPersistence
          .getAllProducts(filter, pagination)
          .then((products) => {
            const result: ResultSearch<Product[]> = {
              data: products,
              pagination: {
                ...pagination,
                countData: products.length,
                totalPages,
              },
            };
            res.json(result);
          });
      })
      .catch((err) => {
        throw new Error("PRODUCT_NOT_FOUND");
      });
  }

  public getAllProduct(req: Request, res: Response) {
    const { pagination, filter } = req.body;

    const infoFilters = filter?.map((filter: Filter) => {
      return { [filter.key]: { $regex: filter.value, $options: "i" } };
    });

    let tempFilter: any = {
      $and: [
        {
          $or: [{ hasdeleted: false }, { hasdeleted: undefined }],
        },
      ],
    };

    if (infoFilters.length > 0) {
      tempFilter = {
        $and: [...tempFilter.$and, ...infoFilters],
      };
    }
    const tempPagination = this.utils.ValidatePagination(
      pagination.pageSize + "",
      pagination.page + ""
    );
    this._productPersistence
      .countProducts(tempFilter, tempPagination)
      .then((count) => {
        const totalPages = this.utils.GetTotalPages(
          count,
          tempPagination.pageSize
        );
        this._productPersistence
          .getAllProducts(tempFilter, tempPagination)
          .then((products) => {
            const result: ResultSearch<Product[]> = {
              data: products,
              pagination: {
                ...tempPagination,
                countData: products.length,
                totalPages,
              },
            };
            res.json(result);
          });
      })
      .catch((err) => {
        throw new Error("PRODUCT_NOT_FOUND");
      });
  }

  public getProductById(req: Request, res: Response) {
    const { id } = req.params;
    this._productPersistence
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
    this._productPersistence
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
    this._productPersistence
      .updateProduct(id, product)
      .then((product) => {
        res.status(201).json({ product });
      })
      .catch((err) => new Error("PRODUCT_COULD_NOT_BE_UPDATED"));
  }

  public deleteProduct(req: Request, res: Response) {
    const { id } = req.params;
    this._productPersistence
      .deleteProduct(id)
      .then((product) => {
        res.status(200).json({ message: "PRODUCT_DISPOSED_CORRECTLY" });
      })
      .catch((err) => {
        throw new Error("THE_PRODUCT_COULD_NOT_BE_SUCCESSFULLY_REMOVED");
      });
  }
}
