import { PropsWithChildren, createContext, useContext, useState } from "react";

type T_User = {
	primary: {
		username: string;
		nickname: string;
		email: string;
		uuid: string | null;
	};
	role: string;
	token: string;
	tokenspan: number;
};
type T_AuthTrue = {
	status: true;
	user: T_User;
};
type T_AuthFalse = {
	status: false;
	user: undefined;
};
type T_Auth = T_AuthTrue | T_AuthFalse;
type T_AuthContext = {
	auth: T_Auth;
	setAuth: (auth: T_Auth) => void;
};

const initialValues: T_AuthContext = {
	auth: {
		status: false,
		user: undefined,
	},
	setAuth: (auth: T_Auth) => {},
};

const AuthContext = createContext<T_AuthContext>(
	initialValues as T_AuthContext
);

export const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<PropsWithChildren> = (props) => {
	const [auth, setAuth] = useState<T_Auth>(initialValues.auth);

	return (
		<AuthContext.Provider
			value={{
				auth: auth,
				setAuth: setAuth,
			}}
			{...props}
		/>
	);
};

export default AuthProvider;
