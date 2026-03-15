import Pool from "../config/db.ts"

// Queries
const getUsersQuery = () => Pool.query('SELECT * FROM "dados_usuario"')
const getUserQuery = (id: string) => Pool.query('SELECT * FROM "dados_usuario" WHERE id = $1', [id])
const deleteUserQuery = (id: string) => Pool.query('DELETE FROM "dados_usuario" WHERE id = $1', [id])
const createUserQuery = (name: string, email: string, hashedPassword: string) => {
  return Pool.query('INSERT INTO "dados_usuario"(name, email, hashed_password) VALUES ($1, $2, $3) RETURNING *', [
    name,
    email,
    hashedPassword,
  ])
}
const editUserQuery = (id: string, name?: string, email?: string, hashedPassword?: string) => {
  return Pool.query('UPDATE "dados_usuario" SET name = $1, email = $2, hashed_password = $3 WHERE id = $4', [
    name,
    email,
    hashedPassword,
    id,
  ])
}

export { getUsersQuery, getUserQuery, createUserQuery, editUserQuery, deleteUserQuery }
