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
		<NeynarSigninButton
			fetchAuthorizationUrl={fetchAuthorizationUrl}
			apiKey={NEYNAR_API_KEY}
			clientId={NEYNAR_CLIENT_ID}
			successCallback={handleSignin}
			errorCallback={handleError}
		/>
	);
};
export default SigninScreen;
