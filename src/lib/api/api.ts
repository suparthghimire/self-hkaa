import { T_UploadAssetSchema } from "@/components/experience/lib/schema/uploadAsset.schema";
import {
	T_AnonLoginSuccess,
	T_CloudUpload,
	T_DecodeSlugSuccess,
	T_Demo,
	T_LibraryAsset,
	T_LoginSuccess,
	T_Response,
	T_SessionTokenSuccess,
	T_User,
} from "@api/types";
import axios, { AxiosResponse } from "axios";
import Cookie from "js-cookie";
import { API_ENDPOINT } from "../config";
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
	}
) {
	const response: AxiosResponse<T_SessionTokenSuccess> =
		await axiosInstance.post(
			"/v1/room/createsessiontoken",
			{
				roomid: data.roomId,
				layoutid: data.layoutId,
				mode: data.mode,
				ui: "lucid",
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
	const response: AxiosResponse<T_DecodeSlugSuccess> = await axiosInstance.post(
		"/v1/url/redirect",
		{
			hashid: slug,
		},
		{}
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
	if (source instanceof File) {
		const sourceUpload = await CloudUpload(source);
		source = Object.values(sourceUpload.urls)[0];
	}

	const response: AxiosResponse<T_Response<T_LibraryAsset>> =
		await axiosInstance.put(
			"/v1/assets/",
			{
				name: data.name,
				description: data.description,
				tags: data.tags,
				thumb: thumbnailUrl,
				source: source,
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
