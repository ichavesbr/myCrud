import type { NextFunction, Request, Response } from "express"
import { comparePassword } from "../utils/password.js"
import { getUserByEmailQuery } from "../users/models.js"

const authHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
    const { rows } = await getUserByEmailQuery(email) // se nao encontrar usuario com este email retorna array vazio --> []
    if (rows.length === 0) return res.status(401).json({ mensagem: "email ou senha incorretos" })

    const userData = rows[0]
    const verifyPassword = await comparePassword(password, userData.hashed_password)
    if (!verifyPassword) return res.status(401).json({ mensagem: "email ou senha incorretos" })

    res.status(200).json({ mensagem: "Usuario logado com sucesso" })
  } catch (error) {
    next(error)
  }
}

export { authHandler }

// criar token JWT (com dados do usuário - id, etc)
// retornar token pro usuário
// criar um middleware de autenticação que protege as rotas privadas, verificando e validando o token em requisições futuras
// enviar pra nova rota autenticado
