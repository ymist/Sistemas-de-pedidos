import {
	GetServerSideProps,
	GetServerSidePropsContext,
	GetServerSidePropsResult,
} from "next";

import { parseCookies, destroyCookie } from "nookies";
import { AuthTokenError } from "../services/errors/AuthTokenError";

//function para paginas  que so users logados podem ter acesso

export function canSSRAuth<P>(fn: GetServerSideProps<P>) {
	return async (
		context: GetServerSidePropsContext,
	): Promise<GetServerSidePropsResult<P>> => {
		const cookies = parseCookies(context);
		const token = cookies["@mistys.token"];
		if (!token) {
			return {
				redirect: {
					destination: "/",
					permanent: false,
				},
			};
		}

		try {
			return await fn(context);
		} catch (err) {
			if (err instanceof AuthTokenError) {
				destroyCookie(context, "@mistys.token");
				return {
					redirect: {
						destination: "/",
						permanent: false,
					},
				};
			}
		}
		return;
	};
}
