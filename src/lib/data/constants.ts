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
export const VALID_MEDIA_UPLOAD_MIMES = [
	"image/jpeg",
	"image/png",
	"image/webp",
	"video/mp4",
	"video/webm",
];

export const VALID_MEDIA_EXT = VALID_MEDIA_UPLOAD_MIMES.map(
	(mime) => mime.split("/")[1]
);
export const SHOP_PATH = "/admin/shop";
