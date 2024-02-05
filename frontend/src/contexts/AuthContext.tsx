import { createContext, ReactNode, useState, useEffect } from "react";
import { api } from "../services/apiClient";

import Router from "next/router";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import { toast } from "react-toastify";

type AuthContextData = {
	user: UserProps;
	isAuthenticated: boolean;
	signIn: (credentials: SignInProps) => Promise<void>;
	signOut: () => void;
	signUp: (credentials: SignUpProps) => Promise<void>;
};

type UserProps = {
	id: string;
	name: string;
	email: string;
};

type SignInProps = {
	email: string;
	password: string;
};
type SignUpProps = {
	name: string;
	email: string;
	password: string;
};

type AuthProviderProps = {
	children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
	try {
		destroyCookie(undefined, "@mistys.token");
		Router.push("/");
	} catch {
		console.log("Erro ao deslogar");
	}
}

export function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<UserProps>();
	const isAuthenticated = !!user;

	useEffect(() => {
		//Ciclo de vida utilizado para se caso xistir um cookie, pegar as informacoes do usuario
		const { "@mistys.token": token } = parseCookies();
		if (token) {
			api.get("/userinfo")
				.then((response) => {
					const { id, name, email } = response.data;

					setUser({
						id,
						name,
						email,
					});
				})
				.catch(() => {
					// Se deu erro deslogamos o user
					signOut();
				});
		}
	}, []);

	async function signIn({ email, password }: SignInProps) {
		try {
			const response = await api.post("/login", {
				email,
				password,
			});
			const { id, name, token } = response.data;
			setCookie(undefined, "@mistys.token", token, {
				maxAge: 60 * 60 * 24 * 30, // Expira em 1 mes
				path: "/", // Quais caminhos tem acesso ao cookie
			});

			setUser({
				id,
				name,
				email,
			});

			//Passar para as proximas requisicoes o nosso token
			api.defaults.headers["Authorization"] = `Bearer ${token}`;

			toast.success(`Bem Vindo ${name}!`);

			//Redirecionar o user para /Dashboards
			Router.push("/dashboards");

			//console.log(response);
		} catch (err) {
			toast.error("Erro ao acessar sua conta!");
			console.log("erro ao accessar", err);
		}
	}

	const signUp = async ({ name, email, password }: SignUpProps) => {
		try {
			const response = await api.post("/users", {
				name,
				email,
				password,
			});
			toast.success(`Cadastro feito com sucesso!!! ${name}!`);
			console.log("Cadastrado com sucesso!");

			Router.push("/");
		} catch (err) {
			toast.error("Erro ao cadastrar!");
			console.log("erro ao cadastrar", err);
		}
	};

	return (
		<AuthContext.Provider
			value={{ user, isAuthenticated, signIn, signOut, signUp }}>
			{children}
		</AuthContext.Provider>
	);
}
