"use client";
import Head from "next/head";

//images and styles
import { FormEvent, useState, useContext } from "react";

import logoImg from "../../../public/mistys.png";
import styles from "../../styles/page.module.scss";

import Image from "next/image";
import Link from "next/link";

//components
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { canSSRGuest } from "../../utils/canSSRGuest";

export default function SignUp() {
	const { signUp } = useContext(AuthContext);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [loading, setLoading] = useState(false);

	const handleSignUp = async (event: FormEvent) => {
		event.preventDefault();
		if (name === "" || email === "" || password === "") {
			toast.warning("Preencha os campos!");
			return;
		}

		setLoading(true);
		let credentials = {
			name,
			email,
			password,
		};
		await signUp(credentials);
		setLoading(false);
	};

	return (
		<>
			<Head>
				<link
					rel="shortcut icon"
					href="../../../public/favicon.ico"
					type="image/x-icon"
				/>
				<title>Faça seu Cadastro - Misty&#8217;S</title>
			</Head>
			<div className={styles.containerCenter}>
				<Image
					src={logoImg}
					width="350"
					height="370"
					alt="Logo Misty's"
				/>
				<div className={styles.login}>
					<h1>Criando Sua Conta</h1>
					<form onSubmit={handleSignUp}>
						<Input
							placeholder="Digite Seu Nome"
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
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
							Cadastrar
						</Button>
						<Link className={styles.text} href="/">
							Ja possui uma conta? Faça seu Login
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
