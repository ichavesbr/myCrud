import { Router } from "express"
import { createUser, deleteUser, editUser, getUser, getUsers } from "./controllers.ts"

const userRoutes = Router()

// Rotas
userRoutes.get("/", getUsers)
userRoutes.get("/:id", getUser)
userRoutes.post("/", createUser)
userRoutes.put("/:id", editUser)
userRoutes.delete("/:id", deleteUser)

export { userRoutes }
