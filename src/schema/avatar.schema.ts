import { MAX_USER_NAME_SIZE } from "@/lib/data/constants";
import { z } from "zod";

export const AvatarSchema = z.object({
	avatar: z.object({
		avatarid: z.string(),
		color: z.object({
			hue: z.number(),
			brightness: z.number(),
			cycle: z.boolean(),
		}),
	}),
	label: z.object({
		name: z
			.string()
			.min(1, "Please enter a valid user name")
			.max(
				MAX_USER_NAME_SIZE,
				`Please keep the user name to ${MAX_USER_NAME_SIZE} characters or less`
			),
		color: z.object({
			hue: z.number(),
			brightness: z.number(),
			cycle: z.boolean(),
		}),
		hidelabel: z.boolean().default(false),
	}),
});

export type T_AvatarSchema = z.infer<typeof AvatarSchema>;
