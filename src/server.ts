import "dotenv/config"
import cors from "cors"
import express from "express"
import cookieParser from "cookie-parser"
import { userRoutes } from "./users/routes.js"
import { swaggerSpec } from "./swagger.js"
import { errorHandler } from "./middleware/errorHandler.js"
import swaggerUi from "swagger-ui-express"
import { authRoutes } from "./auth/routes.js"
import { rotaprotegidaRoutes } from "./rotaprotegida/rotaprotegida.js"
import { cookieJwtAuth } from "./middleware/cookieJwtAuth.js"

const PORT = process.env.PORT || 4242
const app = express()

// Middlewares: funções (req, res, next) que interceptam a requisição
// Fluxo: req → middleware1 → middleware2 → rota → res

const allowedOrigins = ["https://igorchaves.com", "https://www.igorchaves.com", "http://localhost:3000"]
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
)

app.use(express.json())
app.use(cookieParser())
app.use("/users", userRoutes)
app.use("/login", authRoutes)
app.use("/rotaprotegida", cookieJwtAuth, rotaprotegidaRoutes)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use(errorHandler)

// Inicia o servidor
app.listen(PORT, () => console.log(`server iniciado na port ${PORT}`))

//🚨🚨 ATENÇÃO 🚨🚨: O banco de dados foi criar via SQL dentro do próprio NEON.

//✅ [24/02/2026] colocar dados recebidos no bd
//✅ [26/02/2026] cadastrar id automático no bd
//✅ [28/02/2026] enviar status code na resposta do GET
//✅ [01/03/2026] tipar o req e res
//✅ [03/03/2026] implementar tratamento de erros (try/catch)
//✅ [05/03/2026] separar sql queries em arquivo diferente
//✅ [07/03/2026] remover código repetido do catch
//✅ [09/03/2026] criar novo campo (email) e definir como unico
//✅ [11/03/2026] prevenir que o mesmo email seja cadastrado
//✅ [13/03/2026] criar novo campo (senha)
//✅ [15/03/2026] criptografar senha
//✅ [16/03/2026] criar rotas getUser
//✅ [16/03/2026] criar rotas editUser
//✅ [16/03/2026] criar rotas deleteUser
//✅ [16/03/2026] refatora código (estrutura de pastas, nome de arquivos, funções)
//✅ [16/03/2026] arrumou status codes
//✅ [17/03/2026] instalar e configurar swagger (API documentation)
//✅ [18/03/2026] configurar cloudflare
//✅ [18/03/2026] verificar erros do console de experimentalWarning etc
//✅ [20/03/2026] implementar autenticacao de login com email, senha
//✅ [20/03/2026] refatorando swagger
//✅ [26/03/2026] implementar prisma
//✅ [01/04/2026] atualizar cors

//⚠️ [27/03/2026] implementar JWT + token de validacao
//🚧 criar um middleware de auth para proteger rotas privadas (+ tokens de validacao em requisições futuras)
//🚧 enviar pra nova rota autenticado
//🔄 refatorar swagger
//🔄 refatorar cloudflare e railway (migrar para AWS apos periodo de teste - 30 dias)
//🚧 implementar zod para validar campos
//🚧 implementar migration (criar schemas das tabelas)
//🚧 implementar sistema de seguranca de login com JWT
//🚧 implementar rota getUser via email para rota login, depois atualizar a msm funcao na rota users
//--> atualmente a rota users pega usuario especifico via ID. Ficou incoveniente por isso precisa mudar de ID para email
//--> tambem atualizar na documentacao do swagger de cada rota senao da problema provavelmente
//🚧 implementar arquivos de tipos do TS para form de dados (user, name, etc)
//🚧 implementar testes unitarios
//🚧 adicionar rota /health para testar api
