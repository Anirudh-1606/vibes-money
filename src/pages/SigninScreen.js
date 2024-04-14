import { StatusBar } from "expo-status-bar";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image,
	Alert,
	SafeAreaView,
} from "react-native";
import { NeynarSigninButton } from "@neynar/react-native-signin";
import { useApp } from "../context/AppContext";
const NEYNAR_API_KEY = "D41505D1-7B44-440D-958B-DF4F7BD16ABD";
const NEYNAR_CLIENT_ID = "f4b3ab5b-f6b6-4826-b90b-bcab0f9ce9e1";

const SigninScreen = () => {
	const { handleSignin } = useApp();

	const handleError = (err) => {
		console.log(err);
	};

	const fetchAuthorizationUrl = async () => {
		const res = await fetch(`http://192.168.31.21:5500/get-auth-url`);
		if (!res.ok) {
			throw new Error("Failed to fetch auth url");
		}
		const { authorization_url } = await res.json();
		console.log(authorization_url);
		return authorization_url;
	};

	return (
		<SafeAreaView style={styles.container}>
			<Image style={styles.logo} source={require("../../assets/icon.png")} />
			<Text
				style={{ fontFamily: "Poppins-Regular", fontSize: 24, color: "white" }}
			>
				Where Culture Meets Bitcoin
			</Text>
			<Text
				style={{
					fontFamily: "Poppins-Regular",
					fontSize: 16,
					width: "70%",
					textAlign: "center",
					marginTop: 10,
					color: "white",
					marginBottom: "15%",
				}}
			>
				Create a brand new wallet or add an existing one to get started easily.
			</Text>
			<TouchableOpacity style={styles.primary_btn}>
				<Text
					style={{
						fontFamily: "Poppins-Regular",
						fontSize: 18,
						color: "white",
					}}
				>
					Create a New Wallet
				</Text>
			</TouchableOpacity>
			<NeynarSigninButton
				fetchAuthorizationUrl={fetchAuthorizationUrl}
				apiKey={NEYNAR_API_KEY}
				clientId={NEYNAR_CLIENT_ID}
				successCallback={handleSignin}
				errorCallback={handleError}
				width={"90%"}
				borderRadius={0}
				height={60}
				buttonStyles={{
					marginTop: 10,
				}}
				textStyles={{
					fontFamily: "Poppins-Regular",
				}}
			/>

			<StatusBar style="auto" />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0F0F0F",
		alignItems: "center",
	},
	logo: {
		marginTop: "45%",
		width: 151,
		height: 200,
		marginBottom: "15%",
	},
	primary_btn: {
		width: "90%",
		alignItems: "center",
		padding: 18,
		backgroundColor: "#7F35FF",
		marginTop: "20%",
	},
	secondary_btn: {
		marginTop: 10,
		width: "90%",
		alignItems: "center",
		padding: 20,
		borderWidth: 1,
		borderColor: "white",
	},
});
export default SigninScreen;
