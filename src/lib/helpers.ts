import { T_PrefixUrlTypes } from "@api/types";
import format from "date-fns/format";

export const JoinParams = (
	baseUrl: string,
	params: { [key: string]: string },
	singleParams?: string[]
) => {
	try {
		const paramsQueryString = Object.entries(params)
			.map(
				([key, value]) =>
					`${encodeURIComponent(key)}=${encodeURIComponent(value)}`
			)
			.join("&");

		const singleParamsQueryString = singleParams
			?.map((param) => `${encodeURIComponent(param)}`)
			.join("&");

		let finalUrl = `${baseUrl}?${paramsQueryString}`;

		if (singleParamsQueryString) finalUrl += `&${singleParamsQueryString}`;
		const url = new URL(finalUrl);
		return url.href;
	} catch (error) {
		console.log(error);
	}
};
export const ByteToMb = (bytes: number) => {
	return bytes / 1024 / 1024;
};

export const FormatDateTime = (date: Date) => {
	return format(date, "do MMMM yyyy");
};

export function ParseJson<T>(json: string): T {
	return JSON.parse(json) as T;
}

// Courtesy of @Sakar Subedi
export function ReplaceWithPrefixUrl(
	prefixUrl: T_PrefixUrlTypes | undefined,
	url: string | File | null
) {
	if (!url || url === "undefined") {
		return "https://shadowfactorystorage.blob.core.windows.net/shadowverse/beworlds/marketting_website_assets/SF-holder-500x500.png";
	}

	if (url instanceof File) return URL.createObjectURL(url);

	// Check if the URL starts with "/" (absolute path) or contains "http://" or "https://"
	if (
		url.startsWith("/") ||
		url.startsWith("http://") ||
		url.startsWith("https://")
	) {
		return url;
	}
	// Define an array of valid file extensions for images, audio, video, and glb files.
	const imageExtensions = [".png", ".jpg", ".jpeg", ".gif", ".bmp", ".webp"];
	const audioExtensions = [".mp3", ".ogg", ".wav"];
	const videoExtensions = [".mp4", ".webm", ".ogg"];
	const glbExtensions = [".glb"];

	// Extract the file extension from the URL.
	const fileExtension = url.split(".").pop()?.toLowerCase();

	if (imageExtensions.includes(`.${fileExtension}`)) {
		// if extention is .webp then return prefix_images else prefix_original
		if (fileExtension === ".webp") return `${prefixUrl?.prefix_images}${url}`;
		return `${prefixUrl?.prefix_original}${url}`;
	} else if (audioExtensions.includes(`.${fileExtension}`)) {
		return `${prefixUrl?.prefix_audio}${url}`;
	} else if (videoExtensions.includes(`.${fileExtension}`)) {
		return `${prefixUrl?.prefix_videos}${url}`;
	} else if (glbExtensions.includes(`.${fileExtension}`)) {
		return `${prefixUrl?.prefix_models}${url}`;
	}
	return `${prefixUrl?.prefix_original}${url}`;
}
export function GenerateRGBAString({
	r,
	g,
	b,
	a,
}: {
	r: number;
	g: number;
	b: number;
	a?: number;
}): string {
	if (a) return `rgba(${r},${g},${b},${a})`;
	return `rgb(${r},${g},${b})`;
}
