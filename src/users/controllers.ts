import type { NextFunction, Request, Response } from "express"
import { deleteUserQuery, editUserQuery } from "./models.js"
import { hashPassword } from "../utils/password.js"
import { prisma } from "../utils/prisma.js"

const getUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await prisma.user.findMany({ omit: { password: true } })
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body
    const user = await prisma.user.findUnique({ where: { email: email }, omit: { password: true } })
    if (!user) return res.status(404).json({ mensagem: "Usuário não encontrado" })
    res.status(200).send(user)
  } catch (error) {
    next(error)
  }
}

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string // forcei a tipagem porque pode ser string ou string[]
    // const { rows } = await getUserQuery(id) // se nao encontrar id retorna array vazio --> []
    // if (rows.length === 0) return res.status(404).json({ mensagem: "Usuário não encontrado" })
    // await deleteUserQuery(id)
    // res.status(200).json({ mensagem: "usuário deletado" })
  } catch (error) {
    next(error)
  }
}

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) return res.status(400).json({ mensagem_de_erro: "Todos campos são obrigatórios" })
    const hashedPassword = await hashPassword(password)
    await prisma.user.create({ data: { name, email, password: hashedPassword } })
    res.status(201).json({ mensagem: "usuário cadastrado com sucesso" })
  } catch (error) {
    next(error)
  }
}

const editUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string // forcei a tipagem porque pode ser string ou string[]
    const { name, email, password } = req.body
    const hashedPassword = await hashPassword(password)
    await editUserQuery(id, name, email, hashedPassword)
    res.status(200).json({ mensagem: `usuário ${name} editado` })
  } catch (error) {
    next(error)
  }
}

export { getUsers, getUser, createUser, editUser, deleteUser }
