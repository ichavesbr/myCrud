import bcrypt from "bcryptjs"

const encryptPassword = (password: string) => bcrypt.hash(password, 10)

export { encryptPassword }
