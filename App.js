import React, { useEffect, useRef } from "react";
import { CommonActions, NavigationContainer } from "@react-navigation/native";
import { AppProvider, useApp } from "./src/context/AppContext";
import AppNavigator from "./src/AppNavigator";
import { useFonts } from "expo-font";

const AuthNavigation = () => {
	const { isAuthenticated } = useApp();
	const navigationRef = useRef(null);

	useEffect(() => {
		if (isAuthenticated) {
			navigationRef.current?.dispatch(
				CommonActions.reset({
					index: 0,
					routes: [{ name: "Home" }],
				}),
			);
		} else {
			navigationRef.current?.navigate("Signin");
		}
	}, [isAuthenticated]);

	return (
		<NavigationContainer ref={navigationRef}>
			<AppNavigator />
		</NavigationContainer>
	);
};

export default function App() {
	const [fontsLoaded, fontError] = useFonts({
		"Poppins-Regular": require("./assets/fonts/Poppins/Poppins-Regular.ttf"),
	});

	if (!fontsLoaded && !fontError) {
		return null;
	}

	return (
		<AppProvider>
			<AuthNavigation />
		</AppProvider>
	);
}
