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
            const products = yield this._productService.getAllProducts(filter, pagination);
            console.log(products);
            res.json(products);
        });
    }
    getProductById(req, res) {
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
    createProduct(req, res) {
        const { sku, name, description, image, price, stock, type } = req.body;
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
        this._productService
            .createProduct(newProduct)
            .then((product) => {
            res.status(201).json({ product });
        })
            .catch((err) => {
            throw new Error("PRODUCT_NOT_FOUND");
        });
    }
    updateProduct(req, res) {
        const { id } = req.params;
        const { sku, name, description, image, price, stock, type } = req.body;
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
        this._productService
            .updateProduct(id, product)
            .then((product) => {
            res.status(201).json({ product });
        })
            .catch((err) => new Error("PRODUCT_COULD_NOT_BE_UPDATED"));
    }
    deleteProduct(req, res) {
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
exports.ProductController = ProductController;
