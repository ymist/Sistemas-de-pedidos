import { useNavigation } from "expo-router";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function Home() {
	const navigation = useNavigation();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState("");

	const { signIn } = useContext(AuthContext);

	useEffect(() => {
		navigation.setOptions({ headerShown: false });
	}, [navigation]);

	const handleLogin = async () => {
		setErrors("");
		if (!email || !password) {
			setErrors("Preencha o email e a senha!");
			return;
		}
		console.log("teste");
		const resp = await signIn({ email, password });

		console.log(resp);
	};

	return (
		<View style={styles.container}>
			<View style={styles.loginContainer}>
				<Image style={styles.image} source={require("../assets/images/mistys.png")} />
				<TextInput
					placeholder="Email"
					onChangeText={(e) => {
						setErrors("");
						setEmail(e);
					}}
					placeholderTextColor="#41414e"
					value={email}
					style={styles.input}></TextInput>

				<TextInput
					placeholder="Senha"
					placeholderTextColor="#41414e"
					onChangeText={(e) => {
						setErrors("");
						setPassword(e);
					}}
					value={password}
					secureTextEntry={true}
					style={styles.input}></TextInput>
				<View style={styles.containerError}>
					<Text style={styles.error}>{errors}</Text>
				</View>
				<TouchableOpacity style={styles.button} onPress={handleLogin}>
					<Text style={styles.buttonText}>Entrar</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#1d1d2e",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		color: "#fff",
	},
	error: {
		color: "#ff545f",
		fontSize: 15,
		fontWeight: 400,
	},
	containerError: {
		width: "95%",
		marginBottom: 15,
		letterSpacing: 1,
	},
	input: {
		width: "95%",
		backgroundColor: "#101026",
		height: 40,
		borderRadius: 10,
		paddingLeft: 10,
		paddingVertical: 5,
		marginBottom: 15,
		color: "#dddddd",
		borderColor: "#dddddd",
		borderWidth: 1,
	},
	image: {
		width: 150,
		height: 150,
		marginBottom: 20,
	},
	loginContainer: {
		justifyContent: "center",
		width: "95%",
		alignItems: "center",
	},
	button: {
		width: "95%",
		height: 35,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 5,
		color: "#101026",
		backgroundColor: "#3fffa3",
	},
	buttonText: {
		fontWeight: 500,
		fontSize: 18,
	},
});
