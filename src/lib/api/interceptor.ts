import axios from "axios";

import { API_ENDPOINT } from "@/lib/config";

const axiosInstance = axios.create({
	baseURL: API_ENDPOINT,
});

export default axiosInstance;
