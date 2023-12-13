import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad {
	sub: string;
}

export function isAuthenticaded(req: Request, res: Response, next: NextFunction) {
	//Recebe o token e faz a autentificacao dele
	const authToken = req.headers.authorization;

	if (!authToken) {
		return res.status(401).end(); // Barra a tentativa de login se nao tiver um Token JWT
	}
	const [, token] = authToken.split(" ");

	try {
		//Validar esse token
		const { sub } = verify(token, process.env.JWT_SECRET) as PayLoad;

		//Recuperar o id do token e colocar numa variavel no req
		req.user_id = sub;

		return next();
	} catch (err) {
		return res.status(401).end();
	}
}
