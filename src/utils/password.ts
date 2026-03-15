import bcrypt from "bcryptjs"

// Todos utilitários sobre senha ficam aqui neste arquivo
const hashPassword = (password: string) => bcrypt.hash(password, 10)
const comparePassword = (password: string, hash: string) => bcrypt.compare(password, hash)

export { hashPassword, comparePassword }
