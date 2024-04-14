import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SigninScreen from "./pages/SigninScreen";
import HomeScreen from "./pages/HomeScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Signin" component={SigninScreen} />
			<Stack.Screen name="Home" component={HomeScreen} />
		</Stack.Navigator>
	);
};

export default AppNavigator;
