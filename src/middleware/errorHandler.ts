import type { NextFunction, Request, Response } from "express"

const emailExists = (error: unknown) =>
  error instanceof Error && error.message === `duplicate key value violates unique constraint "dados_usuario_email_key"`

const errorHandler = (error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  // error é unknown no TS, instanceof Error é necessário para acessar .message
  if (error instanceof Error) console.error("DEU ERRO:", error.message)
  else console.error("DEU ERRO (desconhecido):", error)
  if (emailExists(error)) res.status(500).json({ mensagem_de_erro: "Email ja cadastrado!" })
  res.status(500).json({ mensagem_de_erro: "Erro interno do servidor" })
}

export { errorHandler }

// Lembrar:
// _req significa que nao vai receber requisicao, poderia ser apenas _ mas por convesao fica _req
// o mesmo vale pro _next, aqui neste arquivo nao vai ser usado mas fora vai dai fica sem _
// error, req, res, next sao obrigatorios em todos middlewares de erro (e next em TODOS)
// next (nao é Next.js) passa o controle para o proximo middleware apos executar o atual
// nao entendi bem o pq de usar, e como funciona ao certo, rever isso um dia
