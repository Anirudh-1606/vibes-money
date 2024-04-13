import {
	NeynarSigninButton,
	ISuccessMessage,
} from "@neynar/react-native-signin";

const NEYNAR_API_KEY = "D41505D1-7B44-440D-958B-DF4F7BD16ABD";
const NEYNAR_CLIENT_ID = "f4b3ab5b-f6b6-4826-b90b-bcab0f9ce9e1";
const API_URL = "https://hub-api.neynar.com";

const SigninScreen = () => {
	const handleSignin = async (data) => {
		console.log(
			`User with fid -> ${data.fid} can use signer -> ${data.signer_uuid} to interact with farcaster`,
		);
	};

	const handleError = (err) => {
		console.log(err);
	};

	const fetchAuthorizationUrl = async () => {
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				api_key: "NEYNAR_API_KEY",
				client_id: "NEYNAR_CLIENT_ID",
			},
		};

		fetch(
			"https://api.neynar.com/v2/farcaster/login/authorize?response_type=code",
			options,
		)
			.then((response) => response.json())
			.then((response) => console.log(response))
			.catch((err) => console.error(err));
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
