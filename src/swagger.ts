import path from "path"
import { fileURLToPath } from "url"
import swaggerJSDoc from "swagger-jsdoc"

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
  },

  // O .js cobre quando rodando após build (dist/), o .ts cobre tsx em dev
  apis: [path.join(__dirname, "./users/routes.ts"), path.join(__dirname, "./users/routes.js")],
})

export { swaggerSpec }
