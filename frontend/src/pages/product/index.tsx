import Head from "next/head";
import styles from "./styles.module.scss";
import { Header } from "../../components/Header";
import { canSSRAuth } from "../../utils/canSSRAuth";

import { FiUpload } from "react-icons/fi";
import { ChangeEvent, useState } from "react";
import Image from "next/image";

export default function Product() {
	const [avatarUrl, setAvatar] = useState("");
	const [imageUrl, setImageUrl] = useState(null);

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

	return (
		<>
			<Head>
				<title>Novo Produto - Misty&#8217;S</title>
			</Head>
			<div>
				<Header />

				<main className={styles.container}>
					<h1>Novo Produto</h1>

					<form className={styles.form}>
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

						<select name="" id="">
							<option>--none--</option>
							<option>Bebida</option>
						</select>
						<input
							type="text"
							placeholder="Digite o Nome do Produto"
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Digite o Preco do Produto"
							className={styles.input}
						/>
						<textarea
							placeholder="Descreva o seu produto..."
							className={styles.input}
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
	return {
		props: {},
	};
});
