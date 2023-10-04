"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
class ProductController {
    constructor(_productService) {
        this._productService = _productService;
    }
    getAllProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { pagination, filter } = req.body;
            try {
                const products = yield this._productService.getAllProducts(filter, pagination);
                res.json(products);
            }
            catch (error) {
                throw new Error("PRODUCT_NOT_FOUND");
            }
        });
    }
    getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const product = yield this._productService.getProductById(id);
                res.json(product);
            }
            catch (err) {
                throw new Error("PRODUCTS_NOT_FOUND");
            }
        });
    }
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sku, name, description, image, price, stock, type } = req.body;
            try {
                const newProduct = {
                    sku,
                    name,
                    description,
                    image,
                    price,
                    stock,
                    type,
                    hasdeleted: false,
                };
                const product = yield this._productService.createProduct(newProduct);
                res.status(201).json({ product });
            }
            catch (error) {
                throw new Error("PRODUCT_NOT_FOUND");
            }
        });
    }
    updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { sku, name, description, image, price, stock, type } = req.body;
            try {
                const product = {
                    sku,
                    name,
                    description,
                    image,
                    price,
                    stock,
                    type,
                    hasdeleted: false,
                };
                yield this._productService.updateProduct(id, product);
                res.status(201).json({ product });
            }
            catch (error) {
                throw new Error("PRODUCT_COULD_NOT_BE_UPDATED");
            }
        });
    }
    deleteProduct(req, res) {
        const { id } = req.params;
        try {
            this._productService.deleteProduct(id);
            res.status(200).json({ message: "PRODUCT_DISPOSED_CORRECTLY" });
        }
        catch (error) {
            throw new Error("THE_PRODUCT_COULD_NOT_BE_SUCCESSFULLY_REMOVED");
        }
    }
}
exports.ProductController = ProductController;
