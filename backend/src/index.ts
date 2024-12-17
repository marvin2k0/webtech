import express, {json, Request, Response} from "express"
import {logger} from "./utils/Logger";
import userRoutes from "./routes/user.routes"
import {DatabaseClient} from "./utils/database.client";

const app = express()
const port = process.env.PORT || 8080
const databaseClient = new DatabaseClient()

databaseClient.tryConnect().then(client => {
        logger.info("Successfully connected to database.")
        app.locals.db = client.db("webtech")

        app.post("/create", (req: Request, res: Response) => {
            client.db("webtech").collection("users").insertOne({username: "testnutzer", email: "testemail"})
            res.status(200)
                .json({message: "Success"})
        })

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