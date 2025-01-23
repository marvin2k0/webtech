import express, {json} from "express"
import {logger} from "./utils/Logger";
import userRoutes from "./routes/user.routes"
import testRoutes from "./routes/test.routes"
import courseRoutes from "./routes/course.routes";
import fileRoutes from "./routes/file.routes"
import {connect} from "mongoose";
import {errorHandler} from "./middleware/error.handler.middleware";
import {logRequests} from "./middleware/access.logger.middleware";
import cors from "cors"
import swaggerUi from "swagger-ui-express"
import swaggerFile from "./swagger/swagger.json";
import interactionRoutes from "./routes/interaction.routes";

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

connect(mongoUri)
    .then(() => {
        logger.info("Successfully connected to database")

        app.listen(port, () => {
            logger.info(`Server has started and is available under http://localhost:${port}`)
        })
    })
    .catch(error => {
        logger.error("Could not connect to database.", error)
        process.exit(1)
    })

app.use(cors())
app.use(json({ limit: '100mb' }));
app.use(logRequests)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use("/users", userRoutes)
app.use("/course", courseRoutes)
app.use("/test", testRoutes)
app.use("/files", fileRoutes)
app.use("/interaction", interactionRoutes)
app.use(errorHandler)
