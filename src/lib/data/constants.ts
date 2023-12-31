import { rem } from "@mantine/core";

export const HEADER_HEIGHT = rem(90);
export const MAIN_PADDING_X = rem(80);
export const MAIN_PADDING_Y = rem(20);
export const FONT_FAMILY =
	"__Roboto_Condensed_0fa0e8, __Roboto_Condensed_Fallback_0fa0e8, Roboto Condensed, sans-serif";

export const MODES = {
	VISITOR: 1,
	CREATOR: 2,
} as const;

export type T_Modes = (typeof MODES)[keyof typeof MODES];
export const HKAA_LAYOUT = "AAHK_V03";
// export const HKAA_LAYOUT = "AAHK";
export const HKAA_MAIN_INSTANCE_SLUG = "hkaa-main-instance";

export const IMG_MIMES = ["image/jpeg", "image/png", "image/webp"];

export const VIDEO_MIMES = ["video/mp4", "video/webm"];

export const VALID_MEDIA_UPLOAD_MIMES = [...IMG_MIMES, ...VIDEO_MIMES];

export const VALID_IMAGE_MIMES_STR = IMG_MIMES.join(", ");
export const VALID_MEDIA_EXT = VALID_MEDIA_UPLOAD_MIMES.map(
	(mime) => mime.split("/")[1]
);
export const SHOP_PATH = "/admin/shop";
export const MAX_FILE_SIZE = 1024 * 1024 * 10; // 10MB

export const ASSET_TRANSFORM = {
	positon: {
		step: 0.01,
		offset: -10,
		scalar: 20,
		min: -10,
		max: 10,
	},
	scale: {
		step: 0.01,
		scalar: 10,
		offset: 0,
	},
	rotation: {
		step: 0.01,
		scalar: 360,
		offset: 0,
	},
};

export const MAX_ROOM_NAME_SIZE = 60;
export const MAX_USER_NAME_SIZE = 60;
export const PLACEHOLDER_IMG_SRC = "/assets/placeholder.svg";
export const AVATAR_HEAD_PREFIX_URL =
	"https://shadowfactorystorage.blob.core.windows.net/shadowverse/beworlds/avatars";
export const ROOM_USERS_REFETCH_INTERVAL = 5 * 1000; // 5 seconds
