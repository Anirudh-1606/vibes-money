import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	Keyboard,
} from "react-native";
import { useApp } from "../context/AppContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Snackbar } from "react-native-paper";
import { removeUser } from "../utils";

const HomeScreen = () => {
	const API_URL = "http://192.168.31.21:5500";
	const [inputValue, setInputValue] = useState("");
	const { isAuthenticated, setIsAuthenticated } = useApp();
	const { displayName, pfp, signerUuid } = useApp();
	const [snackbarVisible, setSnackbarVisible] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");

	const handleSignOut = () => {
		setIsAuthenticated(false);
		removeUser();
	};

	const handleCastPress = async () => {
		Keyboard.dismiss();
		if (inputValue === "") return;
		try {
			const response = await fetch(`${API_URL}/cast`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					signerUuid,
					text: inputValue,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to cast");
			}
			const { hash } = await response.json();
			setSnackbarMessage(`Cast successful! Hash: ${hash}`);
			setSnackbarVisible(true);
			setInputValue("");
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return displayName && pfp ? (
		<SafeAreaView style={styles.container}>
			<View style={styles.topBar}>
				<View style={styles.leftContainer}>
					<Image
						source={{
							uri: pfp,
						}}
						style={styles.avatar}
					/>

					<Text style={styles.username}>{displayName}</Text>
				</View>
				<View style={styles.rightContainer}>
					<TouchableOpacity onPress={handleSignOut}>
						<Text style={{ color: "white" }}>Logout</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View>
				<TextInput
					style={{
						flex: 1,
						color: "white",
						borderWidth: 1,
						borderColor: "white",
						width: "100%",
						paddingTop: 25,
						paddingBottom: 20,
						fontSize: 16,
						marginTop: 20,
					}}
					placeholder="Say Something"
					value={inputValue}
					onChangeText={setInputValue}
					multiline={true}
					numberOfLines={8}
					textAlignVertical="top"
				/>
				<TouchableOpacity style={styles.castButton} onPress={handleCastPress}>
					<Text style={styles.castButtonText}>Cast</Text>
				</TouchableOpacity>
				<Snackbar
					visible={snackbarVisible}
					onDismiss={() => setSnackbarVisible(false)}
					style={{ backgroundColor: "#08bd0eff" }}
				>
					{snackbarMessage}
				</Snackbar>
			</View>
		</SafeAreaView>
	) : (
		<SafeAreaView style={styles.loadingContainer}>
			<Text style={styles.greeting}>Loading...</Text>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
		padding: 20,
	},

	topBar: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 20,
	},

	leftContainer: {
		flexDirection: "row",
		alignItems: "center",
		alignContent: "center",
	},
	avatar: {
		width: 40,
		height: 40,
		borderRadius: 25,
		marginRight: 10,
	},
	input: {
		flex: 1,
		color: "white",
		paddingTop: 10,
		borderWidth: 1,
		borderColor: "white",
		width: "100%",
	},
	castButton: {
		width: "100%",
		alignItems: "center",
		padding: 20,
		backgroundColor: "#7F35FF",
		marginTop: 20,
	},
	castButtonText: {
		color: "white",
		fontFamily: "Poppins-Regular",
		fontSize: 16,
	},
	username: {
		fontWeight: "500",
		fontSize: 18,
		fontFamily: "Poppins-Regular",
		color: "white",
	},
	loadingContainer: {
		flex: 1,
		backgroundColor: "black",
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
});
