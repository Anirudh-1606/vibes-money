import { useContext, createContext, useMemo, useState, useEffect } from "react";
import { retrieveUser, storeUser } from "../utils";

const API_URL = "http://192.168.31.21:5500";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
	const [displayName, setDisplayName] = useState(null);
	const [pfp, setPfp] = useState(null);
	const [signerUuid, setSignerUuid] = useState(null);
	const [fid, setFid] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(null);

	const retrieveUserFromStorage = async () => {
		const user = await retrieveUser();
		if (!user) {
			setIsAuthenticated(false);
			return;
		}
		await fetchUserAndSetUser(parseInt(user.fid));
		setSignerUuid(user.signer_uuid);
		setFid(user.fid);
		setIsAuthenticated(user.is_authenticated);
	};

	useEffect(() => {
		retrieveUserFromStorage();
	}, []);

	const fetchUserAndSetUser = async (fid) => {
		try {
			const response = await fetch(`${API_URL}/user?fid=${fid}`);
			if (!response.ok) {
				throw new Error("Failed to fetch user");
			}
			const { display_name, pfp_url } = await response.json();
			setDisplayName(display_name);
			setPfp(pfp_url);
		} catch (err) {
			console.log(err);
		}
	};

	const handleSignin = async (data) => {
		console.log(data);
		setIsAuthenticated(null);
		storeUser(data);
		await fetchUserAndSetUser(parseInt(data.fid));
		setIsAuthenticated(data.is_authenticated);
		setFid(data.fid);
		setSignerUuid(data.signer_uuid);
	};

	const value = useMemo(
		() => ({
			displayName,
			setDisplayName,
			pfp,
			setPfp,
			signerUuid,
			setSignerUuid,
			fid,
			setFid,
			isAuthenticated,
			setIsAuthenticated,
			handleSignin,
		}),
		[displayName, pfp, signerUuid, fid, isAuthenticated],
	);

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error("AppContext must be used within AppProvider");
	}
	return context;
};
