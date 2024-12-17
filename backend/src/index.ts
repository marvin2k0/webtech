import express, {json, Request, Response} from "express"
import {logger} from "./utils/Logger";
import userRoutes from "./routes/user.routes"
import {MongoClient} from "mongodb";

const app = express()
const port = process.env.PORT || 8080
const dbUser = process.env.DB_USER!
const dbPassword = process.env.DB_PASSWORD!
const dbName = process.env.DB_NAME!
const mongoUri = `mongodb+srv://${dbUser}:${dbPassword}@webtech.umbdw.mongodb.net/?retryWrites=true&w=majority&appName=${dbName}`

if (!(dbUser && dbPassword && dbName)) {
    logger.error("DB_USER or DB_PASSWORD variables are not set but are needed for the system to start.")
    process.exit(1)
}

MongoClient.connect(mongoUri)
    .then(client => {
        logger.info("Successfully connected to database.")
        app.locals.db = client.db("webtech")

        app.listen(port, () => {
            logger.info(`Server has started and is available under http://localhost:${port}`)
        })
    })
    .catch(error => {
        logger.error("There was an error connecting to the database", error)
        process.exit(1)
    })

app.use(json())
app.use("/users", userRoutes)

app.post('/@todo', (req: Request, res: Response) => {
    const {username, email, password} = req.body;

    res.status(200).json({
        username: username,
        email: email,
        password: password
    })
})