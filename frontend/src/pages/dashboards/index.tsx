import Head from "next/head";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { Header } from "../../components/Header";

export default function Dashboard() {
	return (
		<>
			<Head>
				<title>Painel - Misty&#8217;S</title>
			</Head>
			<div>
				<Header></Header>
			</div>
		</>
	);
}

export const getServerSideProps = canSSRAuth(async (context) => {
	return {
		props: {},
	};
});
