"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
class Utils {
    ValidatePagination(strPageSize, strPage) {
        var _a;
        const pageSize = parseInt((_a = strPageSize + "") !== null && _a !== void 0 ? _a : 10);
        const page = parseInt(strPage !== null && strPage !== void 0 ? strPage : 1);
        const pagination = { pageSize, page: page < 1 ? 1 : page };
        pagination.skip = pagination.page === 1 ? pagination.page : ((pagination.page - 1) * pagination.pageSize);
        return pagination;
    }
    GetTotalPages(count, pageSize) {
        const tempTotal = count / pageSize;
        return (tempTotal | 0) < tempTotal ? (tempTotal | 0) + 1 : tempTotal;
    }
}
exports.Utils = Utils;
