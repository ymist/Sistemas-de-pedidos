"use client";
import Head from "next/head";
import React, { FormEvent, useContext, useState } from "react";

//images and styles
import logoImg from "../../public/mistys.png";
import styles from "../styles/page.module.scss";

import Image from "next/image";
import Link from "next/link";

//components
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

import { AuthContext, AuthProvider } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { GetServerSideProps } from "next";
import { canSSRGuest } from "../utils/canSSRGuest";

export default function Page() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const { signIn } = useContext(AuthContext);

	async function handleLogin(event: FormEvent) {
		event.preventDefault();

		if (email == "" || password == "") {
			toast.warning("Preencha os campos!");
			return;
		}
		setLoading(true);
		const credentials = {
			email,
			password,
		};
		console.log(credentials);
		await signIn(credentials);
		setLoading(false);
	}

	return (
		<>
			<Head>
				<title>Faça seu Login - Misty#8217;S</title>
				<link
					rel="shortcut icon"
					href="../../public/favicon.ico"
					type="image/x-icon"
				/>
			</Head>

			<div className={styles.containerCenter}>
				<Image
					src={logoImg}
					width="350"
					height="370"
					alt="Logo Misty's"
				/>
				<div className={styles.login}>
					<form onSubmit={(e) => handleLogin(e)}>
						<Input
							placeholder="Digite Seu Email"
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Input
							placeholder="Digite Sua Senha"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Button type="submit" loading={loading}>
							Entrar
						</Button>
						<Link className={styles.text} href="/signup">
							Nao possui uma conta? Cadastre-Se
						</Link>
					</form>
				</div>
			</div>
		</>
	);
}

export const getServerSideProps = canSSRGuest(async (context) => {
	return {
		props: {},
	};
});
