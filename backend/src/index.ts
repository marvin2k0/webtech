import express from "express"
import {logger} from "./utils/Logger";

const app = express()
const port = process.env.PORT || 8080

app.listen(port, () => {
    logger.info(`Server has started and is available under http://localhost:${port}`)
})