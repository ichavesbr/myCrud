import { Router } from "express"
import { createUser, deleteUser, editUser, getUser, getUsers } from "./controllers.js"

const userRoutes = Router()

userRoutes.get("/", getUsers)
userRoutes.get("/:id", getUser)
userRoutes.post("/", createUser)
userRoutes.patch("/:id", editUser)
userRoutes.delete("/:id", deleteUser)

export { userRoutes }
