"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const utils_middleware_1 = require("../../../common/middlewares/utils.middleware");
class ProductController {
    constructor(_productPersistence) {
        this._productPersistence = _productPersistence;
        this.utils = new utils_middleware_1.Utils();
    }
    getAllProduct(req, res) {
        const { sku } = req.body;
        console.log(req.body);
        const filter = {
            $or: [{ hasdeleted: false }, { hasdeleted: undefined }],
        };
        const pagination = this.utils.ValidatePagination(req.query.pageSize + "", req.query.page + "");
        this._productPersistence
            .countProducts(filter, pagination)
            .then((count) => {
            const totalPages = this.utils.GetTotalPages(count, pagination.pageSize);
            this._productPersistence
                .getAllProducts(filter, pagination)
                .then((products) => {
                const result = {
                    data: products,
                    pagination: Object.assign(Object.assign({}, pagination), { countData: products.length, totalPages }),
                };
                res.json(result);
            });
        })
            .catch((err) => {
            throw new Error("PRODUCT_NOT_FOUND");
        });
    }
    getProductById(req, res) {
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
        this._productPersistence
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
        this._productPersistence
            .updateProduct(id, product)
            .then((product) => {
            res.status(201).json({ product });
        })
            .catch((err) => new Error("PRODUCT_COULD_NOT_BE_UPDATED"));
    }
    deleteProduct(req, res) {
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
exports.ProductController = ProductController;
