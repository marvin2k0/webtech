import express, {json, Request, Response} from "express"
import {logger} from "./utils/Logger";
import userRoutes from "./routes/user.routes"

const app = express()
const port = process.env.PORT || 8080

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

app.listen(port, () => {
    logger.info(`Server has started and is available under http://localhost:${port}`)
})