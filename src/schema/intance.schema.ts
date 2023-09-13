import { IMG_MIMES, MAX_FILE_SIZE } from "@/lib/data/constants";
import { z } from "zod";

export const InstanceEditSchema = z.object({
	name: z.string(),
	description: z.string(),
	image: z.custom<string | File>().superRefine((v, ctx) => {
		if (typeof v === "string")
			z.string()
				.url()
				.parse(v, {
					path: ["image"],
				});
		else if (v instanceof File) {
			const type = v.type;
			const size = v.size;
			z.enum(IMG_MIMES).parse(type, {
				path: ["image"],
			});
			z.number()
				.max(MAX_FILE_SIZE)
				.parse(size, {
					path: ["image"],
				});
		}
	}),
});

export type T_InstanceEditSchema = z.infer<typeof InstanceEditSchema>;
