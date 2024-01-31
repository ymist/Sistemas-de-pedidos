"use client";
import Head from "next/head";

//images and styles
import logoImg from "../../../public/mistys.png";
import styles from "../../styles/page.module.scss";

import Image from "next/image";
import Link from "next/link";

//components
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

export default function SignUp() {
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
					<form>
						<Input placeholder="Digite Seu Nome" type="text" />
						<Input placeholder="Digite Seu Email" type="text" />
						<Input placeholder="Digite Sua Senha" type="password" />
						<Button type="submit" loading={false}>
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
