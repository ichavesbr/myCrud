import type { NextFunction, Request, Response } from "express"
import { comparePassword } from "../utils/password.js"
import { prisma } from "../utils/prisma.js"

const authHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ mensagem_de_erro: "Todos campos são obrigatórios" })

    const user = await prisma.user.findUnique({ where: { email: email } })
    if (!user) return res.status(404).json({ mensagem_de_erro: "email ou senha incorretos" })

    const verifyPassword = await comparePassword(password, user.password)
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
