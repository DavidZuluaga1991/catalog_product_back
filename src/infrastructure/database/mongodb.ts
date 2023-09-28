import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGODB_URL;
const DB_NAME = process.env.MONGODB_DB_NAME;

export class MongoDB {
    private client = new MongoClient(MONGO_URL ?? '', {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
    constructor() {}
    async connect() {
      return await this.client.connect();
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
    }

    getDb() {
        return this.client.db(DB_NAME);
    }
}