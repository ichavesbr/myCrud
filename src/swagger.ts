const swaggerSpec = {
  openapi: "3.0.4",
  info: {
    title: "CRUD API",
    version: "1.0.0",
    description: "API de gerenciamento de usuários.",
  },
  servers: [
    { url: "https://api.igorchaves.com", description: "Produção" },
    { url: "http://localhost:3000", description: "Local" },
  ],
  tags: [
    { name: "Users", description: "Gerenciamento de usuários" },
    { name: "Login", description: "Autenticação e controle de acesso" },
  ],
  paths: {
    "/users": {
      get: {
        summary: "Lista todos os usuários",
        tags: ["Users"],
        parameters: [],
        responses: {
          200: {
            description: "Listagem retornada com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/UserOutput" },
                },
              },
            },
          },
          500: { description: "Erro interno no servidor." },
        },
      },
      post: {
        summary: "Cadastra um novo usuário",
        tags: ["Users"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UserInput" },
            },
          },
        },
        responses: {
          201: {
            description: "Usuário cadastrado com sucesso.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UserOutput" },
              },
            },
          },
          400: { description: "Dados inválidos ou campos obrigatórios ausentes." },
          500: { description: "Erro interno no servidor." },
        },
      },
    },
    "/users/{id}": {
      get: {
        summary: "Busca um usuário pelo ID",
        tags: ["Users"],
        parameters: [
          {
            in: "path",
            name: "id",
            schema: { type: "string", format: "uuid" },
            required: true,
            description: "UUID do usuário",
          },
        ],
        responses: {
          200: {
            description: "Usuário localizado com sucesso.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UserOutput" },
              },
            },
          },
          404: { description: "Usuário não encontrado." },
          500: { description: "Erro interno no servidor." },
        },
      },
      patch: {
        summary: "Atualiza os dados de um usuário",
        tags: ["Users"],
        parameters: [
          {
            in: "path",
            name: "id",
            schema: { type: "string", format: "uuid" },
            required: true,
            description: "UUID do usuário",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UserPatchInput" },
            },
          },
        },
        responses: {
          200: {
            description: "Dados atualizados com sucesso.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UserOutput" },
              },
            },
          },
          404: { description: "Usuário não encontrado." },
          500: { description: "Erro interno no servidor." },
        },
      },
      delete: {
        summary: "Remove um usuário pelo ID",
        tags: ["Users"],
        parameters: [
          {
            in: "path",
            name: "id",
            schema: { type: "string", format: "uuid" },
            required: true,
            description: "UUID do usuário",
          },
        ],
        responses: {
          200: {
            description: "Usuário removido com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    mensagem: { type: "string" },
                  },
                  example: { mensagem: "usuário deletado" },
                },
              },
            },
          },
          404: { description: "Usuário não encontrado." },
          500: { description: "Erro interno no servidor." },
        },
      },
    },
    "/login": {
      post: {
        summary: "Autentica o usuário e retorna um token JWT",
        tags: ["Login"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginInput" },
            },
          },
        },
        responses: {
          200: {
            description: "Autenticação realizada com sucesso.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/LoginOutput" },
              },
            },
          },
          401: { description: "Credenciais inválidas." },
          422: { description: "Dados inválidos ou campos obrigatórios ausentes." },
          500: { description: "Erro interno no servidor." },
        },
      },
    },
  },
  components: {
    schemas: {
      UserInput: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: {
            type: "string",
            description: "Nome completo do usuário.",
            minLength: 3,
          },
          email: {
            type: "string",
            format: "email",
            description: "E-mail utilizado para autenticação.",
          },
          password: {
            type: "string",
            description: "Senha de acesso. Mínimo 8 caracteres, ao menos 1 número.",
            minLength: 8,
          },
        },
        example: {
          name: "Carlos Oliveira",
          email: "carlos.oliveira@empresa.com",
          password: "Secure@2024",
        },
      },

      UserPatchInput: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Nome completo do usuário.",
            minLength: 3,
          },
          email: {
            type: "string",
            format: "email",
            description: "E-mail utilizado para autenticação.",
          },
          password: {
            type: "string",
            description: "Senha de acesso. Mínimo 8 caracteres, ao menos 1 número.",
            minLength: 8,
          },
        },
        example: {
          name: "Carlos Oliveira",
        },
      },

      UserOutput: {
        type: "object",
        properties: {
          id: {
            type: "string",
            format: "uuid",
            description: "Identificador único do usuário (UUID v4).",
          },
          name: {
            type: "string",
            description: "Nome completo do usuário.",
          },
          email: {
            type: "string",
            format: "email",
            description: "E-mail do usuário.",
          },
        },
        example: {
          id: "8560fd28-1397-4472-9048-594727ff55f9",
          name: "Carlos Oliveira",
          email: "carlos.oliveira@empresa.com",
        },
      },

      LoginInput: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            format: "email",
            description: "E-mail cadastrado na plataforma.",
          },
          password: {
            type: "string",
            description: "Senha de acesso.",
            minLength: 8,
          },
        },
        example: {
          email: "carlos.oliveira@empresa.com",
          password: "Secure@2024",
        },
      },

      LoginOutput: {
        type: "object",
        properties: {
          token: {
            type: "string",
            description: "Token JWT para uso no header Authorization das requisições protegidas.",
          },
          expiresIn: {
            type: "integer",
            description: "Validade do token em segundos.",
            example: 86400,
          },
        },
        example: {
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          expiresIn: 86400,
        },
      },
    },
  },
}

export { swaggerSpec }

// FAZER DEPOIS
// rota login nao esta pedindo nome e email como obrigatorios aparentemente
// ao editar usuario com id errada da "mensagem": "usuário undefined editado" status 200
