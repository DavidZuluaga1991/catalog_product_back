// import express from 'express';
import bodyParser from "body-parser";
import express, { Request, Response, Express } from "express";
import cors from "cors";
import { MongoDB } from "./infrastructure/database/mongodb";
import { ProductController } from "./application/product/controllers/product.controller";
import { ProductService } from "./application/product/services/product.service";
import { ProductRepository } from "./application/product/repository/product.repository";
import { productHttpRoutes } from "./application/product/routers/product.router";
import { errorHandlingMiddleware } from "./common/middlewares/error.handling.middleware";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./common/swagger/swagger.json";

const app: Express = express();
export const configureServer = (): Express => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  const allowedOrigins = ["https://catalog-product-front.vercel.app"];

  // const corsOptions = {
  //   origin: (origin: any, callback: any) => {
  //     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
  //       callback(null, true);
  //     } else {
  //       callback(new Error("No permitido por CORS"));
  //     }
  //   },
  //   methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  // };
  // app.use(cors(corsOptions));

  app.use(cors());

  const database = new MongoDB();

  database
    .connect()
    .then(() => {
      const productRepository = new ProductRepository(database);
      const httpPort = new ProductController(
        new ProductService(productRepository)
      );
      productHttpRoutes(app, httpPort);
    })
    .catch((error) => {
      console.error("Error al iniciar el servidor:", error);
    });

  app.get("/", (req: Request, res: Response) => {
    res.send("¡El servidor está en funcionamiento!");
  });

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use(errorHandlingMiddleware);

  return app;
};
