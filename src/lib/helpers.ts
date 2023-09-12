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
