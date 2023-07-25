import { T_Demo } from "@api/types";
import axios, { AxiosResponse } from "axios";

const axiosInstance = axios.create({
	baseURL: "http://localhost:3000",
	withCredentials: true,
});

export async function DemoApi() {
	const response: AxiosResponse<T_Demo> = await axiosInstance.get("/demo");
	return response.data;
}
