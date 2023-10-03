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
exports.ProductService = void 0;
const utils_middleware_1 = require("../../../common/middlewares/utils.middleware");
class ProductService {
    constructor(_productPersistence) {
        this._productPersistence = _productPersistence;
        this.utils = new utils_middleware_1.Utils();
    }
    getAllProducts(filter, pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const tempPagination = this.utils.ValidatePagination(pagination.pageSize + "", pagination.page + "");
            const products = yield this._productPersistence.getAllProducts(filter, tempPagination);
            const count = yield this._productPersistence.countProducts(filter, tempPagination);
            const totalPages = this.utils.GetTotalPages(count, tempPagination.pageSize);
            const result = {
                data: products,
                pagination: Object.assign(Object.assign({}, tempPagination), { countData: products.length, totalPages }),
            };
            return new Promise((resolve, reject) => {
                resolve(result);
            });
        });
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
