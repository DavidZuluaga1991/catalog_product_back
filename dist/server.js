"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureServer = void 0;
// import express from 'express';
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongodb_1 = require("./infrastructure/database/mongodb");
const product_controller_1 = require("./application/product/controllers/product.controller");
const product_service_1 = require("./application/product/services/product.service");
const product_repository_1 = require("./application/product/repository/product.repository");
const product_router_1 = require("./application/product/routers/product.router");
const error_handling_middleware_1 = require("./common/middlewares/error.handling.middleware");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDocument = __importStar(require("./common/swagger/swagger.json"));
const app = (0, express_1.default)();
const configureServer = () => {
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    const corsOptions = {
        origin: "http://localhost:4200",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: false,
    };
    app.use((0, cors_1.default)(corsOptions));
    const database = new mongodb_1.MongoDB();
    database
        .connect()
        .then(() => {
        const productRepository = new product_repository_1.ProductRepository(database);
        const httpPort = new product_controller_1.ProductController(new product_service_1.ProductService(productRepository));
        (0, product_router_1.productHttpRoutes)(app, httpPort);
    })
        .catch((error) => {
        console.error("Error al iniciar el servidor:", error);
    });
    app.get("/", (req, res) => {
        res.send("¡El servidor está en funcionamiento!");
    });
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
    app.use(error_handling_middleware_1.errorHandlingMiddleware);
    return app;
};
exports.configureServer = configureServer;
