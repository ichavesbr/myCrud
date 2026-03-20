import { Router } from "express"
import { authHandler } from "./controllers.js"

const authRoutes = Router()

/**
 * @openapi
 * /login/
 *   post:
 *     summary: Antentica usuario
 *     tags: [login]
 */
authRoutes.post("/", authHandler)

export { authRoutes }
