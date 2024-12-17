import {logger} from "./Logger";
import {MongoClient} from "mongodb";

export class DatabaseClient {
    tryConnect(): Promise<MongoClient> {
        const dbUser = process.env.DB_USER!
        const dbPassword = process.env.DB_PASSWORD!
        const dbName = process.env.DB_NAME!
        const mongoUri = `mongodb+srv://${dbUser}:${dbPassword}@webtech.umbdw.mongodb.net/?retryWrites=true&w=majority&appName=${dbName}`

        if (!(dbUser && dbPassword && dbName)) {
            logger.error("DB_USER or DB_PASSWORD variables are not set but are needed for the system to start.")
            process.exit(1)
        }

        return MongoClient.connect(mongoUri)
    }
}