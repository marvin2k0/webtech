import {Request, Response, Router} from "express";
import {error, success} from "../model/http/rest-response";

const router: Router = Router()

router.get("/", (req: Request, res: Response) => {
    res.status(200)
        .json(success<string>("Successful"))
})

router.get("/error", (req: Request, res: Response) => {
    res.status(500)
        .json(error("Something went wrong"))
})

export default router