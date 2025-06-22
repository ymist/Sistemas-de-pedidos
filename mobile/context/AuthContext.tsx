import { api } from "@/api/apiClient";
import React, { createContext, useContext, useState, ReactNode } from "react";

type AuthContextType = {
	isLoggedIn: boolean;
	login: () => void;
	logout: () => void;
};

type AuthContextData = {
	user: UserProps;
	isAuthenticated: boolean;
	signIn: (credentials: SignInProps) => Promise<void>;
	signOut: () => void;
};

type UserProps = {
	id: string;
	name: string;
	email: string;
	token: string;
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

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<UserProps>({
		id: "",
		name: "",
		email: "",
		token: "",
	});
	const isAuthenticated = !!user.name;

	const signIn = async ({ email, password }: SignInProps) => {
		const respUser = await api.post("/login", {
			email: email,
			password: password,
		});

		console.log(respUser.status, respUser.data);

		if (respUser.status === 200) {
			setUser(respUser.data);
		}
	};

	const signOut = async () => {
		return;
	};

	return <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>{children}</AuthContext.Provider>;
};
