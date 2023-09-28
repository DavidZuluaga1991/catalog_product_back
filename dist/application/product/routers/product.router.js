"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productHttpRoutes = void 0;
const express_1 = require("express");
function productHttpRoutes(app, productController) {
    const router = (0, express_1.Router)();
    router.get("/product", productController.getAllProduct.bind(productController));
    router.get("/product/:id", productController.getProductById.bind(productController));
    router.post("/product", productController.createProduct.bind(productController));
    router.patch("/product/:id", productController.updateProduct.bind(productController));
    router.delete("/product/:id", productController.deleteProduct.bind(productController));
    app.use("/api", router);
}
exports.productHttpRoutes = productHttpRoutes;
