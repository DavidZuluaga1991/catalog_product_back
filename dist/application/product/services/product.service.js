"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
class ProductService {
    constructor(_productPersistence) {
        this._productPersistence = _productPersistence;
    }
    getAllProducts(filter, pagination) {
        return this._productPersistence.getAllProducts(filter, pagination);
    }
    getProductById(id) {
        return this._productPersistence.getProductById(id);
    }
    createProduct(product) {
        return this._productPersistence.createProduct(product);
    }
    updateProduct(id, product) {
        return this._productPersistence.updateProduct(id, product);
    }
    deleteProduct(id) {
        return this._productPersistence.deleteProduct(id);
    }
    countProducts(filter, pagination) {
        return this._productPersistence.countProducts(filter, pagination);
    }
}
exports.ProductService = ProductService;
