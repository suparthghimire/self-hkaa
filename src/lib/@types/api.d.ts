declare module "@api/types" {
	export type T_Demo = {
		key: string;
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

	export type T_User = {
		user: {
			primary: {
				username: "suparth";
				nickname: "CoconutCoffee";
				email: "suparthnarayanghimire2014@gmail.com";
				image: null;
			};
		};
	};
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
	export type T_LibraryAsset<T_Id = string> = {
		id: T_Id;
		uuid?: string;
		name: string;
		source: string;
		description: string;
		thumb: string;
		tags: string;
		assettype: "2d" | "3d";
		position?: [number, number, number];
		rotation?: [number, number, number];
		scale?: [number, number, number];
		shopifyid?: string;
		[key: string]: any;
	};
	export type T_AssetSale = {
		assetSale: {
			id: number;
			name: string;
			description: string;
			price: string;
			url: string;
			media: (string | File)[] | string;
		};
	};
	export type T_RoomAnalytics = {
		worldName: string;
		activeUsers: number;
		totalUsers: number;
	}[];

	export interface T_Room {
		id: number;
		uuid: string;
		name: string;
		description: string;
		image: string;
		tags: null;
		layoutid: string;
		accesslevel: null;
		accesstoken: null;
		enabled: boolean;
		published: boolean;
		configuration: string;
		meta: null;
		createdAt: string;
		updatedAt: string;
		userId: number;
		user: T_User;
		urlshortcode: string;

		assets: any[];
	}

	export type T_Rooms = T_Response<{
		rooms: T_Room[];
	}>;
	export type T_ApiError = T_Response<{
		data?: any;
	}>;
}

// Generated by https://quicktype.io
