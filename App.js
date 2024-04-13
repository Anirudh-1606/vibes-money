import { StatusBar } from "expo-status-bar";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image,
	Button,
	Alert,
	SafeAreaView,
} from "react-native";
import { useFonts } from "expo-font";
import Intro from "./src/pages/IntroScreen";
import SigninScreen from "./src/pages/SigninScreen";

export default function App() {
	const [fontsLoaded, fontError] = useFonts({
		"Poppins-Regular": require("./assets/fonts/Poppins/Poppins-Regular.ttf"),
	});

	if (!fontsLoaded && !fontError) {
		return null;
	}

	return (
		<SafeAreaView style={styles.container}>
			<SigninScreen />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
