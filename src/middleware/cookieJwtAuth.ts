import type { NextFunction, Request, Response } from "express"
import jwt, { type JwtPayload } from "jsonwebtoken"

interface AuthRequest extends Request {
  user?: JwtPayload | string
}

const cookieJwtAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token

  try {
    const secret = process.env.MY_SECRET
    if (!secret) throw new Error("MY_SECRET não definido nas variáveis de ambiente")

    req.user = jwt.verify(token, secret)
    next()
  } catch (error) {
    res.clearCookie("token")
    return res.redirect("/")
  }
}

export { cookieJwtAuth }
