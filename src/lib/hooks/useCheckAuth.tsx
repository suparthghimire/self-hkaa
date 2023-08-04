import Cookie from "js-cookie";
import { useMemo } from "react";
const useCheckAuth = () => {
	const storedAccessToken: string | undefined = useMemo(
		() => Cookie.get("x-access-token"),
		[Cookie]
	);
	return {
		isAuth: storedAccessToken ? true : false,
		accessToken: storedAccessToken,
	};
};

export default useCheckAuth;
