import { Router } from "express"
import { createUser, deleteUser, editUser, getUser, getUsers } from "./controllers.js"

const userRoutes = Router()

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Retorna todos os usuários
 *     tags: [Users]
 */
userRoutes.get("/", getUsers)

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Retorna um usuário pelo ID
 *     tags: [Users]
 */
userRoutes.get("/:id", getUser)

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 */
userRoutes.post("/", createUser)

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     summary: Edita um usuário pelo ID
 *     tags: [Users]
 */
userRoutes.put("/:id", editUser)

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Deleta um usuário pelo ID
 *     tags: [Users]
 */
userRoutes.delete("/:id", deleteUser)

export { userRoutes }
