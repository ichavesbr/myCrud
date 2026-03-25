import "dotenv/config"
import cors from "cors"
import express from "express"
import { userRoutes } from "./users/routes.js"
import { swaggerSpec } from "./swagger.js"
import { errorHandler } from "./middleware/errorHandler.js"
import swaggerUi from "swagger-ui-express"
import { authRoutes } from "./auth/routes.js"
import { main } from "./utils/testePrisma.js"

const PORT = process.env.PORT || 4242
const app = express()
// Middlewares: funções (req, res, next) que interceptam a requisição
// Fluxo: req → middleware1 → middleware2 → rota → res
app.use(cors({ origin: "*" }))
app.use(express.json())
app.use("/users", userRoutes)
app.use("/login", authRoutes)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use(errorHandler)
main()

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
//🔄 [18/03/2026] REVER UM DIA - configurar cloudflare
//✅ [18/03/2026] verificar erros do console de experimentalWarning etc
//✅ [20/03/2026] implementar autenticacao de login com email, senha
//✅ [20/03/2026] refatorando swagger

//⚠️ [25/03/2026] implementar prisma
//🚧 implementar migration (criar schemas das tabelas)
//🚧 implementar sistema de seguranca de login com JWT
//🚧 implementar rota getUser via email para rota login, depois atualizar a msm funcao na rota users
//--> atualmente a rota users pega usuario especifico via ID. Ficou incoveniente por isso precisa mudar de ID para email
//--> tambem atualizar na documentacao do swagger de cada rota senao da problema provavelmente
//🚧 implementar arquivos de tipos do TS para form de dados (user, name, etc)
//🚧 implementar testes unitarios
//🚧 adicionar rota /health para testar api

// [25/03/2026] APOS INSTALAR PRISMA deu isso aqui.
// verificar se esses erros ao instalar o PRISMA pode ser corrigidos ou vao dar problema no futuro
// npm warn EBADENGINE Unsupported engine {
// npm warn EBADENGINE   package: '@prisma/studio-core@0.21.1',
// npm warn EBADENGINE   required: { node: '^20.19 || ^22.12 || ^24.0', pnpm: '8' },
// npm warn EBADENGINE   current: { node: 'v25.7.0', npm: '11.10.1' }
// npm warn EBADENGINE }
