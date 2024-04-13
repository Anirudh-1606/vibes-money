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

const Intro = () => {
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
			<TouchableOpacity
				style={styles.secondary_btn}
				onPress={() => Alert.alert("Add an Existing Wallet Button pressed")}
			>
				<Text
					style={{
						fontFamily: "Poppins-Regular",
						fontSize: 18,
						color: "white",
					}}
				>
					Add an Existing Wallet
				</Text>
			</TouchableOpacity>

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
		width: 150,
		height: 200,
		marginBottom: "15%",
	},
	primary_btn: {
		width: "90%",
		alignItems: "center",
		padding: 20,
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

export default Intro;
