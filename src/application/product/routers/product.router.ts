import express, { Router } from "express";
import { ProductController } from "../controllers/product.controller";

export function productHttpRoutes(
  app: express.Application,
  productController: ProductController
) {
  const router = Router();

  router.post(
    "/product/filter",
    productController.getAllProduct.bind(productController)
  );
  router.get(
    "/product/:id",
    productController.getProductById.bind(productController)
  );
  router.post(
    "/product",
    productController.createProduct.bind(productController)
  );
  router.patch(
    "/product/:id",
    productController.updateProduct.bind(productController)
  );
  router.delete(
    "/product/:id",
    productController.deleteProduct.bind(productController)
  );

  app.use("/api", router);
}
