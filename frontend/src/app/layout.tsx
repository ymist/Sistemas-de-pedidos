import "../styles/globals.scss";
export const metadata = {
	title: "Misty'S",
	description:
		"Hamburgueres artesanais  e irresistíveis, com um toque selvagem que só nós proporcionamos, Venha CONHECER!!!",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
