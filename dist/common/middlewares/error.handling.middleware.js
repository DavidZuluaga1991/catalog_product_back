"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlingMiddleware = void 0;
const error_code_const_1 = require("../const/error-code.const");
const errorHandlingMiddleware = (error, req, res, next) => {
    const code = error_code_const_1.ErrorCode[error.message];
    if (code) {
        res.status(code).json({ message: error.message });
    }
    else {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.errorHandlingMiddleware = errorHandlingMiddleware;
