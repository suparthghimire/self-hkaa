import { T_LinkAsset } from "@/components/experience/lib/schema/linkAsset.schema";
import { T_UploadAssetSchema } from "@/components/experience/lib/schema/uploadAsset.schema";
import { T_InstanceEditSchema } from "@/schema/instance.schema";
import {
	T_AnonLoginSuccess,
	T_ApiError,
	T_AssetSale,
	T_AvatarHeads,
	T_CloudUpload,
	T_DecodeSlugSuccess,
	T_Demo,
	T_LibraryAsset,
	T_LoginSuccess,
	T_PrefixUrl,
	T_Response,
	T_Room,
	T_RoomAnalytics,
	T_RoomUsers,
	T_Rooms,
	T_SessionTokenSuccess,
	T_User,
} from "@api/types";
import axios, { AxiosResponse } from "axios";
import Cookie from "js-cookie";
import { API_ENDPOINT, NODE_ENV } from "../config";
import { T_Modes } from "../data/constants";
const axiosInstance = axios.create({
	baseURL: API_ENDPOINT,
	// withCredentials: true,
});

export async function DemoApi() {
	const response: AxiosResponse<T_Demo> = await axiosInstance.get("/demo");
	return response.data;
}

export async function AnonLogin() {
	const response: AxiosResponse<T_AnonLoginSuccess> = await axiosInstance.post(
		"/v1/auth/signin/anonymous"
	);
	return response.data;
}

export async function CreateSessionToken(
	accessToken: string,
	data: {
		roomId: string;
		layoutId: string;
		mode: T_Modes;
		config?: string;
		extraData?: {
			[key: string]: any;
		};
	}
) {
	const _config = data.config
		? data.config
		: NODE_ENV === "development"
		? "config-dev"
		: undefined;

	const response: AxiosResponse<T_SessionTokenSuccess> =
		await axiosInstance.post(
			"/v1/room/createsessiontoken",
			{
				roomid: data.roomId,
				layoutid: data.layoutId,
				mode: data.mode,
				ui: "lucid",
				webglversion: 1,
				...(_config && { config: _config }),
				...data.extraData,
			},
			{
				headers: {
					"x-access-token": accessToken,
				},
			}
		);
	return response.data;
}

export async function DecodeSlug(slug: string) {
	const response: AxiosResponse<T_DecodeSlugSuccess> = await axiosInstance.get(
		"/v1/rooms/room-uuid",
		{
			params: { hashid: slug },
		}
	);
	return response.data;
}

export async function AdminLogin(data: { identity: string; password: string }) {
	const response: AxiosResponse<T_LoginSuccess> = await axiosInstance.post(
		"/v1/auth/signin",
		{
			identity: data.identity,
			password: data.password,
		}
	);
	// set token in cookie
	const expiresIn50Mins = new Date(new Date().getTime() + 50 * 60 * 1000);
	Cookie.set("x-access-token", response.data.data.token, {
		expires: expiresIn50Mins,
	});
	return response.data;
}

export async function CloudUpload(file: File) {
	const folderName = "roomassets";
	const ext = file.name.split(".").pop();
	const fileNameWithoutExt = file.name.split(".").slice(0, -1).join(".");
	const filename = fileNameWithoutExt + "_" + file.size + "." + ext;

	// replace space with underscore
	const filenameWithUnderscore = filename.replace(/ /g, "_");

	// create form data
	const formData = new FormData();
	formData.append("folder", folderName);
	formData.append("uploadfiles", file);
	formData.append("filename", filenameWithUnderscore);

	const response: AxiosResponse<T_CloudUpload> = await axiosInstance.post(
		"/cloudupload",
		formData,
		{
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}
	);
	return response.data;
}

export async function Logout(token: string) {
	const response = await axiosInstance.post(
		"/v1/auth/signout",
		{},
		{
			headers: {
				"x-access-token": token,
			},
		}
	);
	return response.data;
}

export async function GetMyData(token: string) {
	const response: AxiosResponse<T_Response<T_User>> = await axiosInstance.get(
		"/v1/user/account",
		{
			headers: {
				"x-access-token": token,
			},
		}
	);
	return response.data;
}

export async function UploadAssetToLibrary(
	data: T_UploadAssetSchema,
	token: string
) {
	// if data.source is file. upload it and get url
	// upload data.thumbnail and get url

	const thumbnailUpload = await CloudUpload(data.thumb!);
	const thumbnailUrl = Object.values(thumbnailUpload.urls)[0];

	let source = data.source;
	let url = "";
	if (source) {
		const sourceUpload = await CloudUpload(source);
		url = Object.values(sourceUpload.urls)[0];
	}

	const nonemptyTags = data.tags
		.split(",")
		.map((i) => i.trim())
		.filter((i) => i.length > 0);

	const uniqueTags = [...new Set(nonemptyTags)];

	const response: AxiosResponse<T_Response<T_LibraryAsset<number>>> =
		await axiosInstance.put(
			"/v1/assets",
			{
				name: data.name,
				description: data.description,
				tags: JSON.stringify(uniqueTags),
				thumb: thumbnailUrl,
				source: url,
				assettype: data.assettype,
			},
			{
				headers: {
					"x-access-token": token,
				},
			}
		);
	return response.data;
}

export async function GetAllLibraryAssets(token: string) {
	const response: AxiosResponse<
		T_Response<{ assets: T_LibraryAsset<number>[] }>
	> = await axiosInstance.get("/v1/assets", {
		headers: {
			"x-access-token": token,
		},
	});
	return response.data;
}

export async function DeleteLibraryAsset(token: string, id: number) {
	const response: AxiosResponse<
		T_Response<{ assets: T_LibraryAsset<number>[] }>
	> = await axiosInstance.delete(`/v1/assets/${id}`, {
		headers: {
			"x-access-token": token,
		},
	});
	return response.data;
}

export async function CreateAssetSale(data: T_LinkAsset, token: string) {
	const mediaFiles = data.media.filter((m) => m instanceof File) as File[];
	// upload all media

	const mediaUpload = await Promise.all(
		mediaFiles.map((m) => {
			return CloudUpload(m);
		})
	);

	const mediaSrc = mediaUpload.map((m) => Object.values(m.urls)[0]);

	const media = [
		...mediaSrc,
		...data.media.filter((m) => typeof m === "string"),
	] as string[];

	const response: AxiosResponse<T_Response<T_AssetSale>> =
		await axiosInstance.post(
			`/v1/assets/sale`,
			{
				...data,
				media,
			},
			{
				headers: {
					"x-access-token": token,
				},
			}
		);
	return response.data;
}

export async function GetSingleAssetSale(token: string, id: string) {
	const params = new URLSearchParams({
		id: id,
	});
	console.log("params");
	console.log("params", id);
	const response: AxiosResponse<T_Response<T_AssetSale>> =
		await axiosInstance.get("/v1/assets/sale", {
			params,
			headers: {
				"x-access-token": token,
			},
		});
	return response.data;
}

export async function UpdateAssetSale(
	data: T_LinkAsset,
	id: number,
	token: string
) {
	const mediaFiles = data.media.filter((m) => m instanceof File) as File[];
	// upload all media

	const mediaUpload = await Promise.all(
		mediaFiles.map((m) => {
			return CloudUpload(m);
		})
	);

	const mediaSrc = mediaUpload.map((m) => Object.values(m.urls)[0]);

	const media = [
		...mediaSrc,
		...data.media.filter((m) => typeof m === "string"),
	] as string[];

	const response: AxiosResponse<T_Response<T_AssetSale>> =
		await axiosInstance.patch(
			`/v1/assets/sale/${id}`,
			{
				...data,
				media,
			},
			{
				headers: {
					"x-access-token": token,
				},
			}
		);
	return response.data;
}

export async function GetRoomStat() {
	// https://shadowversedev.shadowfactory.io:8443/worlds/users
	const response: AxiosResponse<T_RoomAnalytics> = await axiosInstance.get(
		"/worlds/users"
	);
	const data = response.data;

	// filter all data where world_name ends with _2
	return data.filter((d) => d.worldName.endsWith("_2"));
}
export async function GetAllRooms() {
	const response: AxiosResponse<T_Rooms> = await axiosInstance.get("/v1/rooms");

	return response.data;
}
export async function UpdateRoom(
	token: string,
	data: T_InstanceEditSchema,
	id: number
) {
	let imageSrc = data.image;
	if (imageSrc instanceof File) {
		const imageUpload = await CloudUpload(imageSrc);
		imageSrc = Object.values(imageUpload.urls)[0];
	}
	const response: AxiosResponse<T_Response<T_Room>> = await axiosInstance.post(
		`/v1/rooms`,
		{
			data: {
				...data,
				image: imageSrc,
			},
		},
		{
			headers: {
				"x-access-token": token,
			},
		}
	);
	return response.data;
}

export async function GetUserAvatarHeads() {
	const response: AxiosResponse<
		T_Response<T_AvatarHeads>,
		T_ApiError
	> = await axiosInstance.get("/v1/system/avatars/config");
	return response.data;
}

export async function GetAssetPrefixURL() {
	const response: AxiosResponse<T_Response<T_PrefixUrl>> =
		await axiosInstance.get("/v1/general/prefix-url");
	return response.data;
}

export async function GetRoomUsers() {
	const url = "https://hkaa-iframe.lucidworlds.com/worlds/users";
	const response: AxiosResponse<T_RoomUsers> = await axios.get(url);
	return response.data;
}

// export async function GetRoomUsers() {
// 	const url = "/api/room-users";
// 	const response: AxiosResponse<T_RoomUsers> = await axios.get(url);
// 	return response.data;
// }
