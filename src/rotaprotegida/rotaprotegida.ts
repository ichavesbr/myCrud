import { Router } from "express"

const rotaprotegidaRoutes = Router()

rotaprotegidaRoutes.get("/", (req, res) => res.send("BEM VINDO A ROTA PROTEGIDA"))

export { rotaprotegidaRoutes }
