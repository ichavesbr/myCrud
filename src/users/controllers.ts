import type { NextFunction, Request, Response } from "express"
import { hashPassword } from "../utils/password.js"
import { prisma } from "../utils/prisma.js"

// ✅ concertado - 26/03
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 3

    const users = await prisma.user.findMany({
      omit: { password: true },
      skip: (page - 1) * limit,
      take: limit,
    })

    res.status(200).json({ page, limit, data: users })
  } catch (error) {
    next(error)
  }
}

// ✅ concertado - 26/03
const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string
    const user = await prisma.user.findUnique({ where: { id: id }, omit: { password: true } })
    if (!user) return res.status(404).json({ mensagem: "Usuário não encontrado" })

    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

// ✅ concertado - 26/03
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string
    const user = await prisma.user.findUnique({ where: { id: id } })
    if (!user) return res.status(404).json({ mensagem: "Usuário não encontrado" })
    await prisma.user.delete({ where: { id: id } })

    res.status(200).json({ mensagem: "usuário deletado" })
  } catch (error) {
    next(error)
  }
}

// ✅ concertado - 26/03
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) return res.status(400).json({ mensagem_de_erro: "Todos campos são obrigatórios" })

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) return res.status(409).json({ mensagem_de_erro: "Email já cadastrado" })

    const hashedPassword = await hashPassword(password)
    await prisma.user.create({ data: { name, email, password: hashedPassword } })

    res.status(201).json({ mensagem: "usuário cadastrado com sucesso" })
  } catch (error) {
    next(error)
  }
}

// ✅ concertado - 26/03
const editUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string // forcei a tipagem porque pode ser string ou string[]
    const user = await prisma.user.findUnique({ where: { id: id }, omit: { password: true } })
    if (!user) return res.status(404).json({ mensagem: "Usuário não encontrado" })

    const { name, email, password } = req.body

    const data: any = {}
    if (name) data.name = name
    if (email) data.email = email
    if (password) data.password = await hashPassword(password)
    await prisma.user.update({ where: { id }, data })

    res.status(200).json({ mensagem: "cadastro alterado com sucesso" })
  } catch (error) {
    next(error)
  }
}

export { getUsers, getUser, createUser, editUser, deleteUser }

// falta zod e JWT
