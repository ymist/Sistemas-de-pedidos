import { AuthProvider } from "@/context/AuthContext";
import { Stack } from "expo-router";

export default function Layout() {
	return (
		<AuthProvider>
			<Stack
				screenOptions={{
					headerStyle: {
						backgroundColor: "#1d1d2e",
					},
					headerTintColor: "#fff",
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
			/>
		</AuthProvider>
	);
}
