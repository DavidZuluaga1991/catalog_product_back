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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDB = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_URL = process.env.MONGODB_URL;
const DB_NAME = process.env.MONGODB_DB_NAME;
class MongoDB {
    constructor() {
        this.client = new mongodb_1.MongoClient(MONGO_URL !== null && MONGO_URL !== void 0 ? MONGO_URL : '', {
            serverApi: {
                version: mongodb_1.ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.connect();
            // try {
            //     // Connect the client to the server	(optional starting in v4.7)
            //     await this.client.connect();
            //     // Send a ping to confirm a successful connection
            //     await this.client.db(DB_NAME).command({ ping: 1 });
            //     console.log("Pinged your deployment. You successfully connected to MongoDB!");
            //   } finally {
            //     // Ensures that the client will close when you finish/error
            //     await this.client.close();
            //   }
        });
    }
    getDb() {
        return this.client.db(DB_NAME);
    }
}
exports.MongoDB = MongoDB;
