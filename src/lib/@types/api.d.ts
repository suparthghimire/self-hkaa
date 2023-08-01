declare module "@api/types" {
	export type T_Demo = {
		key: string;
	};
	export type T_LibraryAsset = {
		image: string;
		title: string;
	};
	export type T_Response<T> = {
		success: boolean;
		data: T;
		message: string;
	};
	export type T_User = {
		primary: {
			nickname: string;
			uuid: string;
		};
		userid: number;
		uuid: string;
	};
	export type T_AnonLoginSuccess = T_Response<{
		user: T_User;
		role: string;
		token: string;
		tokenspan: number;
	}>;
	export type T_LoginSuccess = T_Response<{
		user: {
			primary: {
				username: string;
				nickname: string;
				email: string;
				uuid: string | null;
			};
		};
		role: string;
		token: string;
		tokenspan: number;
	}>;
	export type T_SessionTokenSuccess = T_Response<{
		sessiontoken: string;
		mode: string;
	}>;
	export type T_DecodeSlugSuccess = T_Response<{
		roomid: string;
		longurl: string;
		shortHash: string;
	}>;
	export type T_CloudUpload = {
		names: string[];
		urls: {
			[key: string]: string;
		};
		errfiles: [];
		errors: boolean;
	};
}
