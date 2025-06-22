import axios, { AxiosError } from "axios";
import { AuthTokenError } from "./errors/AuthTokenError";

export function setupAPIClient(ctx = undefined) {
	const api = axios.create({
		baseURL: "http://localhost:3333",
	});

	api.interceptors.response.use(
		(response) => {
			return response;
		},
		(error: AxiosError) => {
			if (error.response && error.response.status === 401) {
				// Qualquer erro 401 devemos deslogar o usuario
				if (typeof window !== "undefined") {
					// Chamar funcao para deslogar o usuario
					// signOut();
				} else {
					return Promise.reject(new AuthTokenError());
				}
			}

			return Promise.reject(error);
		},
	);

	return api;
}
