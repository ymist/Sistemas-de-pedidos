import styles from "./styles.module.scss";
import { useContext } from "react";

import Link from "next/link";
import Image from "next/image";
import { FiLogOut } from "react-icons/fi";

import { AuthContext } from "../../contexts/AuthContext";

export function Header() {
	const { signOut, user } = useContext(AuthContext);
	return (
		<header className={styles.headerContainer}>
			<div className={styles.headerContent}>
				<Link href="/dashboards">
					<Image
						src="/mistys.png"
						width={70}
						height={70}
						alt="Logo Header"
					/>
				</Link>
				<nav>
					<Link href="/category">Categorias</Link>
					<Link href="/product">Cardapio</Link>
					<button onClick={signOut}>
						<FiLogOut color="#fff" size={24} />
					</button>
				</nav>
			</div>
		</header>
	);
}
