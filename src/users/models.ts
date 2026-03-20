import Pool from "../config/db.js"

// Queries
const getUsersQuery = () => Pool.query('SELECT * FROM "dados_usuario"')
const getUserQuery = (id: string) => Pool.query('SELECT * FROM "dados_usuario" WHERE id = $1', [id])
const getUserByEmailQuery = (email: string) => Pool.query('SELECT * FROM "dados_usuario" WHERE email = $1', [email])
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

export { getUsersQuery, getUserQuery, getUserByEmailQuery, createUserQuery, editUserQuery, deleteUserQuery }

// Fazer algum dia:
// substituir getUserQuery por getUserByEmailQuery no código todo.
// --> getUserQuery busca por ID, era só pra teste e agora nao é mais necessário.
// --> getUserQuery pode ser reaproveitada nas rotas users e login
