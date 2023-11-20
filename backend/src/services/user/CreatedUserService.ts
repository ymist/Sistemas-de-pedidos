import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
	name: string;
	email: string;
	password: string;
}

class CreateUserService {
	async execute({ name, email, password }: UserRequest) {
		//verificar se o User envio um email
		if (!email) {
			throw new Error("Email Incorreto");
		}

		//Verificar se esse email ja esta cadastrado no banco de dados
		const emailAlreadyExists = await prismaClient.user.findFirst({
			where: {
				email: email,
			},
		});

		//Retornar erro caso o email ja esteja sendo utilizado!
		if (emailAlreadyExists) {
			throw new Error("Este email ja esta sendo utilizado!");
		}

		const passwordHash = await hash(password, 8);

		const user = await prismaClient.user.create({
			data: {
				name: name,
				email: email,
				password: passwordHash,
			},
			select: {
				id: true,
				name: true,
				email: true,
			},
		});

		return { user };
	}
}

export { CreateUserService };
