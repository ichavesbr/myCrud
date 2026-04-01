import type { NextFunction, Request, Response } from "express"
import { comparePassword } from "../utils/password.js"
import { prisma } from "../utils/prisma.js"
import jwt from "jsonwebtoken"

const authHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ mensagem_de_erro: "Todos campos são obrigatórios" })

    const user = await prisma.user.findUnique({ where: { email: email } })
    if (!user) return res.status(404).json({ mensagem_de_erro: "email ou senha incorretos" })

    const verifyPassword = await comparePassword(password, user.password)
    if (!verifyPassword) return res.status(401).json({ mensagem: "email ou senha incorretos" })

    const secret = process.env.MY_SECRET
    if (!secret) throw new Error("MY_SECRET não definido nas variáveis de ambiente")

    const token = jwt.sign({ sub: user.id, name: user.name }, secret, { expiresIn: "1h" })
    res.status(200).cookie("token", token, { httpOnly: true })

    return res.redirect("/rotaprotegida")
  } catch (error) {
    next(error)
  }
}

export { authHandler }
