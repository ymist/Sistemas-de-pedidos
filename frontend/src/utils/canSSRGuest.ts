import {
	GetServerSideProps,
	GetServerSidePropsContext,
	GetServerSidePropsResult,
} from "next";

import { parseCookies } from "nookies";

//function para paginas que so podem ser acessadas por visitante

export function canSSRGuest<P>(fn: GetServerSideProps<P>) {
	return async (
		context: GetServerSidePropsContext,
	): Promise<GetServerSidePropsResult<P>> => {
		const cookies = parseCookies(context);
		//Se o cara tentar  acessar a pagina porem tendo um login salvo redirecionamos
		if (cookies["@mistys.token"]) {
			return {
				redirect: {
					destination: "/dashboards",
					permanent: false,
				},
			};
		}

		return await fn(context);
	};
}
