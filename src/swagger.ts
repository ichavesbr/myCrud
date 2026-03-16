import swaggerJSDoc from "swagger-jsdoc"
import { fileURLToPath } from "url"
import path from "path"

// ESM não tem __dirname nativo, então recriamos a partir do import.meta.url
// import.meta.url = "file:///projeto/src/swagger.ts"
// __dirname vai ser "/projeto/src"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CRUD API",
      version: "1.0.0",
      description: "Versao inicial simples do swagger docs",
    },
    apis: [path.join(__dirname, "./users/routes.ts"), path.join(__dirname, "./users/routes.js")],
  },

  // O swaggerJSDoc lê esses arquivos em tempo de execução buscando comentários /** @openapi */
  // Precisamos de path absoluto porque com ESM o cwd pode variar
  // O .js cobre quando rodando após build (dist/), o .ts cobre ts-node em dev
  apis: [path.join(__dirname, "./users/routes.ts"), path.join(__dirname, "./users/routes.js")],
})

export { swaggerSpec }
