import Head from "next/head";
import styles from "./styles.module.scss";
import { Header } from "../../components/Header";
import { canSSRAuth } from "../../utils/canSSRAuth";

import { FiUpload } from "react-icons/fi";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Image from "next/image";

import { setupAPIClient } from "../../services/api";
import { api } from "../../services/apiClient";
import { toast } from "react-toastify";

type ItemProps = {
	id: string;
	name: string;
};

interface CategoryProps {
	category_list: ItemProps[];
}

export default function Product({ category_list }: CategoryProps) {
	console.log(category_list);
	const [avatarUrl, setAvatar] = useState("");
	const [imageUrl, setImageUrl] = useState(null);

	const [categories, setCategories] = useState(category_list || []);
	const [selectCategory, setSelectCategory] = useState(0);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");

	const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) {
			return;
		}

		const image = event.target.files[0];

		if (!image) {
			return;
		}
		if (image.type === "image/png" || image.type === "image/jpeg") {
			setImageUrl(image);
			setAvatar(URL.createObjectURL(image));
		}
	};

	const handleRegister = async (e: FormEvent) => {
		e.preventDefault();

		try {
			const data = new FormData();

			if (
				name === "" ||
				price === "" ||
				description === "" ||
				categories[selectCategory].id === "none" ||
				avatarUrl === null
			) {
				toast.warning("Preencha os Campos Corretamente");
				return;
			}

			data.append("name", name);
			data.append("price", price);
			data.append("description", description);
			data.append("file", imageUrl);
			data.append("category_id", categories[selectCategory].id);

			const apiClient = setupAPIClient();

			await apiClient.post("/product", data);

			toast.success("Produto Cadastrado com Sucesso");

			setName("");
			setPrice("");
			setDescription("");
			setAvatar("");
			setImageUrl(null);
			setSelectCategory(0);
		} catch (err) {
			toast.error("Erro ao cadastrar o produto!!!");
			console.log(err);
		}
	};

	return (
		<>
			<Head>
				<title>Novo Produto - Misty&#8217;S</title>
			</Head>
			<div>
				<Header />

				<main className={styles.container}>
					<h1>Novo Produto</h1>

					<form className={styles.form} onSubmit={handleRegister}>
						<label className={styles.label}>
							<span>
								<FiUpload size={38} color="#fff" />
							</span>

							<input
								type="file"
								accept="image/png, image/jpeg"
								onChange={handleFile}
							/>
							{avatarUrl && (
								<Image
									className={styles.namePreview}
									src={avatarUrl}
									alt="Foto do Produto"
									width={250}
									height={250}
								/>
							)}
						</label>

						<select
							value={selectCategory}
							onChange={(e) =>
								setSelectCategory(Number(e.target.value))
							}>
							{categories.map((item, index) => {
								return (
									<option key={item.id} value={index}>
										{item.name}
									</option>
								);
							})}
						</select>
						<input
							type="text"
							value={name}
							placeholder="Digite o Nome do Produto"
							className={styles.input}
							onChange={(e) => setName(e.target.value)}
						/>
						<input
							type="text"
							value={price}
							placeholder="Digite o Preco do Produto"
							className={styles.input}
							onChange={(e) => setPrice(e.target.value)}
						/>
						<textarea
							value={description}
							placeholder="Descreva o seu produto..."
							className={styles.input}
							onChange={(e) => setDescription(e.target.value)}
						/>

						<button type="submit" className={styles.buttonAdd}>
							Cadastrar
						</button>
					</form>
				</main>
			</div>
		</>
	);
}

export const getServerSideProps = canSSRAuth(async (context) => {
	const apiClient = setupAPIClient(context);

	const response = await apiClient.get("/category");
	const categories = response.data;

	categories.unshift({ id: "none", name: "--none--" });

	return {
		props: {
			category_list: categories,
		},
	};
});
