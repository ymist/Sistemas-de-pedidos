import "../styles/globals.scss";
import { AppProps } from "next/app";
import React from "react";

import { AuthContext, AuthProvider } from "../contexts/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<AuthProvider>
				<Component {...pageProps} />
			</AuthProvider>
		</>
	);
}

export default MyApp;
