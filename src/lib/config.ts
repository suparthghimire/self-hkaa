export const API_ENDPOINT =
	process.env.NEXT_PUBLIC_API_ENDPOINT ??
	"https://hkaa-backend.lucidworlds.com/api";

export const IFRAME_ENDPOINT =
	process.env.NEXT_PUBLIC_IFRAME_ENDPOINT ??
	"https://hkaa-iframe.lucidworlds.com/world.html";

export const USE_TEST_ROOM =
	process.env.NEXT_PUBLIC_USE_TEST_ROOM === "true" ? true : false ?? false;
export const ADMIN_LOGIN_ENABLED =
	process.env.NEXT_PUBLIC_ADMIN_LOGIN === "false" ? false : true ?? true;
