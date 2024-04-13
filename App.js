import { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";

export default function App() {
	const [fontsLoaded, fontError] = useFonts({
		"Poppins-Regular": require("./assets/fonts/Poppins/Poppins-Regular.ttf"),
	});

	if (!fontsLoaded && !fontError) {
		return null;
	}

	return (
		<View style={styles.container}>
			<Text style={{ fontFamily: "Poppins-Regular", fontSize: 30 }}>
				Money Vibes Less's Go
			</Text>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
