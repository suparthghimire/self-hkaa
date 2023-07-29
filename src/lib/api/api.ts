import {
	T_DecodeSlugSuccess,
	T_Demo,
	T_LoginSuccess,
	T_SessionTokenSuccess,
} from "@api/types";
import axios, { AxiosResponse } from "axios";
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
	const response: AxiosResponse<T_LoginSuccess> = await axiosInstance.post(
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

export async function AdminLogin(email: string, password: string) {
	const response: AxiosResponse<T_LoginSuccess> = await axiosInstance.post(
		"/v1/auth/signin",
		{
			identity: email,
			password: password,
		}
	);
	return response.data;
}
