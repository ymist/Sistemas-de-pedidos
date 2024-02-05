import Head from "next/head";
import styles from "./styles.module.scss";
import { Header } from "../../components/Header";
import { FormEvent, useState } from "react";

import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";

import { canSSRAuth } from "../../utils/canSSRAuth";

export default function Category() {
	const [name, setName] = useState("");

	async function handleRegister(event: FormEvent) {
		event.preventDefault();

		if (name == "") {
			toast.warning("Digite um nome correto!");
			return;
		}

		const apiClient = setupAPIClient();

		await apiClient.post("/category", {
			name: name,
		});

		toast.success("Categoria Cadastrada com Sucesso!");
		setName("");
	}

	return (
		<>
			<Head>
				<title>Categorias - Misty&#8217;S </title>
			</Head>
			<div>
				<Header />
				<main className={styles.container}>
					<h1>Cadastrar Categorias</h1>
					<form className={styles.form} onSubmit={handleRegister}>
						<input
							type="text"
							placeholder="Digite o Nome da Categoria"
							className={styles.input}
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>

						<button className={styles.buttonAdd} type="submit">
							Cadastrar
						</button>
					</form>
				</main>
			</div>
		</>
	);
}

export const getServerSideProps = canSSRAuth(async (context) => {
	return {
		props: {},
	};
});
