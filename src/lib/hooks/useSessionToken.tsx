import { useMutation, useQueries } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { AnonLogin, CreateSessionToken, DecodeSlug } from "../api/api";
import { HKAA_LAYOUT, T_Modes } from "../data/constants";

type T_SessionTokenData = {
	mode: T_Modes;
	accessToken?: string;
	slug: string;
	extraData?: {
		[key: string]: any;
	};
};
const useSessionToken = (data: T_SessionTokenData) => {
	const [decodeToken, anonLogin] = useQueries({
		queries: [
			{
				queryKey: ["decodeToken", data.slug],
				queryFn: () => DecodeSlug(data.slug),
			},
			{
				queryKey: ["anonLogin"],
				queryFn: () => AnonLogin(),
			},
		],
	});

	const sessionToken = useMutation({
		mutationKey: ["sessionToken", ...Object.values(data)],
		mutationFn: ([accessToken, roomId]: [string, string]) =>
			CreateSessionToken(accessToken, {
				layoutId: HKAA_LAYOUT,
				roomId: roomId,
				mode: data.mode,
				extraData: data.extraData,
			}),
	});

	const isLoading = useMemo(
		() =>
			decodeToken.isLoading || anonLogin.isLoading || sessionToken.isLoading,
		[decodeToken.isLoading, anonLogin.isLoading, sessionToken.isLoading]
	);
	const isError = useMemo(
		() => decodeToken.isError || anonLogin.isError || sessionToken.isError,
		[decodeToken.isError, anonLogin.isError, sessionToken.isError]
	);

	const isSuccess = useMemo(
		() =>
			decodeToken.isSuccess && anonLogin.isSuccess && sessionToken.isSuccess,
		[decodeToken.isSuccess, anonLogin.isSuccess, sessionToken.isSuccess]
	);

	useEffect(() => {
		if (decodeToken.error) console.log(decodeToken.error);
		if (anonLogin.error) console.log(anonLogin.error);
		if (sessionToken.error) console.log(sessionToken.error);
	}, [decodeToken.error, anonLogin.error, sessionToken.error]);

	useEffect(() => {
		if (!decodeToken.data) return;
		if (data.accessToken)
			sessionToken.mutate([data.accessToken, decodeToken.data.data.roomid]);
		else if (anonLogin.data)
			sessionToken.mutate([
				anonLogin.data.data.token,
				decodeToken.data.data.roomid,
			]);
	}, [data.accessToken, decodeToken.data]);

	return {
		accessToken: data.accessToken ?? anonLogin.data?.data.token ?? "",
		sessionToken: sessionToken.data?.data.sessiontoken ?? "",
		isLoading,
		isError,
		isSuccess,
		error: decodeToken.error ?? anonLogin.error ?? sessionToken.error,
		roomId: decodeToken.data?.data.roomid ?? "",
	};
};

export default useSessionToken;
