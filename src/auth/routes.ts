import { Router } from "express"
import { authHandler } from "./controllers.js"

const authRoutes = Router()

authRoutes.post("/", authHandler)

export { authRoutes }
