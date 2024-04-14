import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

const ProfileScreen = () => {
	return (
		<SafeAreaView style={styles.container}>
			<Text
				style={{ fontFamily: "Poppins-Regular", fontSize: 24, color: "white" }}
			>
				Profile Screen
			</Text>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0F0F0F",
		alignItems: "center",
	},
});
export default ProfileScreen;
