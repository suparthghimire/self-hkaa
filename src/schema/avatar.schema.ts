import { z } from "zod";

export const avatarSchema = z.object({
	avatar: z.object({
		avatarid: z.string(),
		color: z.object({
			hue: z.number(),
			alpha: z.number(),
			cycle: z.boolean(),
		}),
	}),
	name: z.object({
		name: z.string(),
		color: z.object({
			hue: z.number(),
			alpha: z.number(),
			cycle: z.boolean(),
		}),
	}),
});

export type T_AvatarSchema = z.infer<typeof avatarSchema>;
