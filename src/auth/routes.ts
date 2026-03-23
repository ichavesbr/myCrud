import { Router } from "express"
import { authHandler } from "./controllers.js"

const authRoutes = Router()

authRoutes.get("/", (req, res) => res.send("PAGINA DE LOGIN"))
authRoutes.post("/", authHandler)

export { authRoutes }
