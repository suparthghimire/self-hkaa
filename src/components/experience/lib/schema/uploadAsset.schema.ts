import { MAX_FILE_SIZE } from "@/lib/data/constants";
import { ByteToMb } from "@/lib/helpers";
import { z } from "zod";

export const UploadAssetSchema = z.object({
	name: z.string().nonempty("Name is required"),
	description: z.string().nonempty("Description is required"),
	tags: z.string().nonempty("Tags is required"),
	thumb: z
		.custom<File>()
		.nullable()
		.superRefine((v, ctx) => {
			if (!v) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Thumbnail is required",
				});
				return;
			}
			if (v instanceof File) {
				if (
					v.type !== "image/jpeg" &&
					v.type !== "image/png" &&
					v.type !== "image/webp"
				) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: "Thumbnail must be an image",
					});
				}
				if (v.size > MAX_FILE_SIZE) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: `Thumbnail size must be less than ${ByteToMb(
							MAX_FILE_SIZE
						)}MB`,
					});
				}
			}
		}),
	source: z.custom<string | File>().superRefine((v, ctx) => {
		try {
			if (typeof v === "string") {
				const url = new URL(v);
			}
			// verify file size to MAX_FILE_SIZE
			if (v instanceof File) {
				if (v.size > MAX_FILE_SIZE)
					throw new Error(
						`File size must be less than ${ByteToMb(MAX_FILE_SIZE)}MB`
					);
			}
		} catch (error) {
			if (error instanceof Error)
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: error.message.includes("URL")
						? "Please enter valid URL"
						: error.message,
				});
		}
	}),
	assettype: z
		.enum(["3d", "audio", "image", "video"], {
			errorMap: (error) => ({
				message: "Please select valid asset type",
			}),
		})
		.transform((v) => {
			switch (v) {
				case "3d":
					return "3d";
				case "image":
				case "video":
					return "2d";
				case "audio":
					return "audio";
			}
		}),
});

export type T_UploadAssetSchema = z.infer<typeof UploadAssetSchema>;
