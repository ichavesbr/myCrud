import "dotenv/config"
import cors from "cors"
import express from "express"
import { userRoutes } from "./src/users/routes.ts"
import { errorHandler } from "./src/middleware/errorHandler.ts"

const PORT = process.env.PORT || 4242
const app = express()

// Middleware (funcao que roda entre req e res! "req -> middleware -> res")
app.use(cors())
app.use(express.json())
app.use("/users", userRoutes)
app.use(errorHandler)

// Inicia o servidor
app.listen(PORT, () => console.log(`server iniciado na port ${PORT}`))

// ATENCAO: O banco de dados foi criar via SQL dentro do proprio NEON.

//✅ [24/02/2026] colocar dados recebidos no bd
//✅ [26/02/2026] cadastrar id automatico no bd
//✅ [28/02/2026] enviar status code na resposta do GET
//✅ [01/03/2026] tipar o req e res
//✅ [03/03/2026] implementar tratamento de erros (try/catch)
//✅ [05/03/2026] separar sql queries em arquivo diferente
//✅ [07/03/2026] remover codigo repetido do catch
//✅ [09/03/2026] criar novo campo (email) e definir como unico
//✅ [11/03/2026] prevenir que o mesmo email seja cadastrado
//✅ [13/03/2026] criar novo campo (senha)
//✅ [15/03/2026] criptografar senha
//✅ [16/03/2026] criar rotas getUser
//✅ [16/03/2026] criar rotas editUser
//✅ [16/03/2026] criar rotas deleteUser
//🚧 implementar login com email, senha
//🚧 implementar prisma
