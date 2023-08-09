import {
	MAX_FILE_SIZE,
	VALID_MEDIA_EXT,
	VALID_MEDIA_UPLOAD_MIMES,
} from "@/lib/data/constants";
import { z } from "zod";

export const LinkAssetSchema = z.object({
	media: z.array(
		z.custom<File | string>().superRefine((val, ctx) => {
			try {
				//throws error;
				if (typeof val === "string") new URL(val);
				// check fuiel tyope to be video or image
				else if (val instanceof File) {
					// check file size <10mb
					if (val.size > MAX_FILE_SIZE) throw new Error("File size too large");
					const fileType = val.type;
					if (!VALID_MEDIA_UPLOAD_MIMES.includes(fileType))
						throw new Error(
							`Invalid file type. Valid types are: ${VALID_MEDIA_EXT.join(
								", "
							)}`
						);
				}
			} catch (error) {
				if (error instanceof Error) {
					if (error.message.includes("URL"))
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							message: "Invalid URL",
						});
					else {
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							message: error.message,
						});
					}
				}
			}
		})
	),
	name: z.string().nonempty("Please enter valid name"),
	description: z.string().nonempty("Please enter valid description"),
	price: z.string().nonempty("Please enter valid price"),
	url: z.string().url("Please enter valid url"),
});

export type T_LinkAsset = z.infer<typeof LinkAssetSchema>;
