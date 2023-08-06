declare module "@app/types" {
	export type T_UserType = "admin" | "user";
	export type T_Instance = {
		id: number;
		tabName: string;
		key: string;
		title: string;
		subTitle: string;
		description: string;
		buttonName: string;
		date: string;
		slug: string;
		sessionTokenData: {
			[key: string]: any;
		};
	};
}
