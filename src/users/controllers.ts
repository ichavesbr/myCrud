import type { NextFunction, Request, Response } from "express"
import { createUserQuery, deleteUserQuery, editUserQuery, getUserQuery, getUsersQuery } from "./models.ts"
import { encryptPassword } from "../middleware/encryptPassword.ts"

// Controladores - tudo que nao for rota, nem query

const getUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { rows } = await getUsersQuery()
    res.status(200).json(rows)
  } catch (error) {
    next(error)
  }
}

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  // atualmente o id soh pode ser no formato uuid, senao vai dar erro de servidor e nao envia a msg pro usuario
  // nao eh problema agora, pq eh caso ficticio. no futuro no lugar de ID pode ser busca via NAME, EMAIL etc.
  try {
    const id = req.params.id as string // forcei a tipagem porque pode ser string ou string[]
    const { rows } = await getUserQuery(id) // se nao encontrar id retorna array vazio --> []
    if (rows.length === 0) return res.status(404).json({ mensagem: "Usuário não encontrado" })
    res.status(200).send(rows[0])
  } catch (error) {
    next(error)
  }
}

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string // forcei a tipagem porque pode ser string ou string[]
    await deleteUserQuery(id)
    res.status(201).json({ mensagem: "usuário deletado" })
  } catch (error) {
    next(error)
  }
}

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) throw new Error("todos campos obrigatórios!!!!!!")
    // if (!name || !email || !password) return res.status(400).json({ mensagem_de_erro: "Todos campos sao obrigatorios" })
    const hashedPassword = await encryptPassword(password)
    await createUserQuery(name, email, hashedPassword)
    res.status(201).json({ mensagem: `usuário ${name} cadastrado` })
  } catch (error) {
    next(error)
  }
}

const editUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string // forcei a tipagem porque pode ser string ou string[]
    const { name, email, password } = req.body
    const hashedPassword = await encryptPassword(password)
    await editUserQuery(id, name, email, hashedPassword)
    res.status(201).json({ mensagem: `usuário ${name} editado` })
  } catch (error) {
    next(error)
  }
}

export { getUsers, getUser, createUser, editUser, deleteUser }
