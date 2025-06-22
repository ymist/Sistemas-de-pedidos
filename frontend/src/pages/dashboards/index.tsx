import styles from "./styles.module.scss";

import { useState } from "react";

import { setupAPIClient } from "../../services/api";
import { canSSRAuth } from "../../utils/canSSRAuth";

import Head from "next/head";
import { Header } from "../../components/Header";
import { FiRefreshCcw } from "react-icons/fi";
import { ModalOrder } from "../../components/ModalOrder";

import Modal from "react-modal";

type OrderProps = {
	id: string;
	table: string | number;
	status: boolean;
	draft: boolean;
	name: string | null;
};

interface HomeProps {
	orders: OrderProps[];
}

export type OrderItemProps = {
	id: string;
	amount: number;
	order_id: string;
	product: {
		id: string;
		name: string;
		description: string;
		price: string;
		banner: string;
	};
	order: {
		id: string;
		table: string | number;
		status: boolean;
		name: string | null;
	};
};

export default function Dashboard({ orders }: HomeProps) {
	const [orderList, setOrderList] = useState(orders || []);
	const [modalItem, setModalItem] = useState<OrderItemProps[]>();
	const [modalVisible, setModalVisible] = useState(false);

	const handleCloseModal = () => {
		setModalVisible(false);
	};
	const handleOpenModalView = async (id: string) => {
		const apiClient = setupAPIClient();

		const response = await apiClient("/order/detail", {
			params: {
				order_id: id,
			},
		});

		setModalItem(response.data);
		setModalVisible(true);
	};

	const handleFinishItem = async (id: string) => {
		const apiClient = setupAPIClient();
		console.log(id);

		await apiClient.put("/order/close", {
			order_id: id,
		});

		const response = await apiClient("/order/open");

		setOrderList(response.data);

		setModalVisible(false);
	};

	Modal.setAppElement("#__next");

	return (
		<>
			<Head>
				<title>Painel - Misty&#8217;S</title>
			</Head>
			<div>
				<Header></Header>

				<main className={styles.container}>
					<div className={styles.containerHeader}>
						<h1>Ultimos Pedidos</h1>
						<button>
							<FiRefreshCcw size={25} color="#3fffa3" />
						</button>
					</div>
					<article className={styles.listOrders}>
						{orderList.length === 0 && (
							<span className={styles.emptyList}>
								Nenhum pedido aberto encontrado
							</span>
						)}

						{orderList.map((order) => (
							<section
								key={order.id}
								className={styles.orderItem}>
								<button
									onClick={() =>
										handleOpenModalView(order.id)
									}>
									<div className={styles.tag}></div>
									<span className={styles.table}>
										Mesa {order.table}
									</span>
								</button>
							</section>
						))}
					</article>
				</main>
				{modalVisible && (
					<ModalOrder
						isOpen={modalVisible}
						onRequestClose={handleCloseModal}
						order={modalItem}
						handleFinishOrder={handleFinishItem}
					/>
				)}
			</div>
		</>
	);
}

export const getServerSideProps = canSSRAuth(async (context) => {
	const apiClient = setupAPIClient(context);

	const response = await apiClient.get("/order/open");

	return {
		props: {
			orders: response.data,
		},
	};
});
