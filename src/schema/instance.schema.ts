import {
	IMG_MIMES,
	MAX_FILE_SIZE,
	MAX_ROOM_NAME_SIZE,
	VALID_IMAGE_MIMES_STR,
} from "@/lib/data/constants";
import { ByteToMb } from "@/lib/helpers";
import { z } from "zod";

export const InstanceEditSchema = z.object({
	name: z
		.string()
		.min(1, "Please enter a valid user name")
		.max(
			MAX_ROOM_NAME_SIZE,
			`Please keep the Shop name to ${MAX_ROOM_NAME_SIZE} characters or less`
		),
	description: z.string(),
	image: z.custom<string | File>().superRefine((v, ctx) => {
		if (typeof v === "string") {
			try {
				new URL(v);
			} catch (error) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Please enter valid url",
				});
			}
		} else if (v instanceof File) {
			const type = v.type;
			const size = v.size;
			if (!IMG_MIMES.includes(type)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: `Please upload a valid image file. Accepted file types are: ${VALID_IMAGE_MIMES_STR}`,
				});
			} else if (size > MAX_FILE_SIZE) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: `Please upload a file smaller than ${ByteToMb(
						MAX_FILE_SIZE
					)} mb`,
				});
			}
		}
	}),
	uuid: z.string(),
	url: z.string(),
});

export type T_InstanceEditSchema = z.infer<typeof InstanceEditSchema>;
