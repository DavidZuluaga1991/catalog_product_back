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
exports.ProductRepository = void 0;
const mongodb_1 = require("mongodb");
class ProductRepository {
    constructor(_db) {
        this._db = _db;
        this._collection = this._db.getDb().collection("product");
    }
    getAllProducts(filter, pagination) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._collection
                .find(this.generateFilter(filter))
                .skip((_a = pagination.skip) !== null && _a !== void 0 ? _a : 1)
                .limit(pagination.pageSize)
                .toArray();
        });
    }
    getProductById(id) {
        return this._collection.findOne({ _id: new mongodb_1.ObjectId(id) });
    }
    createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const insert = yield this._collection.insertOne(product);
                return product;
            }
            catch (error) {
                throw new Error("NOT_INSERT_PRODUCT");
            }
        });
    }
    updateProduct(id, product) {
        return this._collection.findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, { $set: product }, { returnDocument: "after" });
    }
    deleteProduct(id) {
        return this._collection.findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, { $set: { hasdeleted: true } }, { returnDocument: "after" });
    }
    countProducts(filter, pagination) {
        return this._collection.countDocuments(this.generateFilter(filter));
    }
    generateFilter(filter) {
        const infoFilters = filter.map((filter) => {
            return { [filter.key]: { $regex: filter.value, $options: "i" } };
        });
        let tempFilter = {
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
        return tempFilter;
    }
}
exports.ProductRepository = ProductRepository;
