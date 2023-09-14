import Button from "@/components/common/Button";
import { GetUserAvatarHeads } from "@/lib/api/api";
import { AVATAR_HEAD_PREFIX_URL } from "@/lib/data/constants";
import { GenerateRGBAString } from "@/lib/helpers";
import { useExperience } from "@/lib/providers/experience/Experience.provider";
import { AvatarSchema, T_AvatarSchema } from "@/schema/avatar.schema";
import {
	AlphaSlider,
	Center,
	HueSlider,
	Loader,
	ModalProps,
	Text,
	TextInput,
	TextInputProps,
	rem,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { hsl } from "color-convert";
import Image from "next/image";
import React from "react";
import { MARGIN } from "../../UI/ExperienceUI";
import CustomModal from "../../common/CustomModal";
const AvatarPanel: React.FC<ModalProps> = (props) => {
	const { avatarInfo, updateAvatar } = useExperience();

	const form = useForm<T_AvatarSchema>({
		initialValues: avatarInfo,
		validate: zodResolver(AvatarSchema),
	});

	const [dn_r, dn_g, dn_b] = hsl.rgb([form.values.label.color.hue, 100, 50]);
	const [a_r, a_g, a_b] = hsl.rgb([form.values.avatar.color.hue, 100, 50]);
	const dn_rgba = GenerateRGBAString({
		r: dn_r,
		g: dn_g,
		b: dn_b,
	});
	const a_rgba = GenerateRGBAString({
		r: a_r,
		g: a_g,
		b: a_b,
	});

	const handleSubmit = (data: T_AvatarSchema) => {
		updateAvatar(data);
		props.onClose();
	};

	return (
		<CustomModal
			{...props}
			overlayProps={{
				opacity: 0.5,
			}}
			withCloseButton={false}
			styles={() => ({
				content: {
					position: "absolute",
					bottom: "10vh",
					width: "420px",
					right: MARGIN,
				},
				header: {
					textAlign: "center",
					display: "flex",
					justifyContent: "center",
					paddingTop: rem(60),
					paddingBottom: rem(40),
				},
				title: {
					textAlign: "center",
					fontSize: "20px",
					fontWeight: 700,
				},
			})}
			title="Create your Avatar"
		>
			<form className="grid gap-[40px]" onSubmit={form.onSubmit(handleSubmit)}>
				<div className="grid gap-[20px]">
					<div className="w-full flex items-center gap-2">
						<StyledTextInput
							placeholder="user1234"
							label="DISPLAY NAME"
							{...form.getInputProps("label.name")}
						/>
					</div>
					<div className="w-full">
						<Text size={12} weight={700}>
							DISPLAY NAME COLOR
						</Text>
						<div className="grid w-full gap-[20px]">
							<HueSlider
								onChangeEnd={() => {}}
								value={form.values.label.color.hue}
								onChange={(value) =>
									form.setValues({
										label: {
											...form.values.label,
											color: {
												...form.values.label.color,
												hue: value,
											},
										},
									})
								}
							/>
							<AlphaSlider
								color={dn_rgba}
								onChangeEnd={() => {}}
								value={form.values.label.color.brightness}
								onChange={(value) =>
									form.setValues({
										label: {
											...form.values.label,
											color: {
												...form.values.label.color,
												brightness: value,
											},
										},
									})
								}
							/>
						</div>
					</div>
				</div>
				<div className="grid gap-[20px]">
					<div className="w-full">
						<Text size={12} weight={700}>
							CUSTOMIZE HEAD
						</Text>
						<AvatarHeadSelector
							value={form.values.avatar.avatarid}
							onChange={(val: string) => {
								form.setValues({
									avatar: {
										...form.values.avatar,
										avatarid: val,
									},
								});
							}}
						/>
					</div>
					<div className="w-full">
						<Text size={12} weight={700}>
							AVATAR COLOR
						</Text>
						<div className="grid w-full gap-[20px]">
							<HueSlider
								onChangeEnd={() => {}}
								value={form.values.avatar.color.hue}
								onChange={(value) =>
									form.setValues({
										avatar: {
											...form.values.avatar,
											color: {
												...form.values.avatar.color,
												hue: value,
											},
										},
									})
								}
							/>
							<AlphaSlider
								color={a_rgba}
								onChangeEnd={() => {}}
								value={form.values.avatar.color.brightness}
								onChange={(value) =>
									form.setValues({
										avatar: {
											...form.values.avatar,
											color: {
												...form.values.avatar.color,
												brightness: value,
											},
										},
									})
								}
							/>
						</div>
					</div>
				</div>
				<div className="div grid place-items-center">
					<Button type="submit">APPLY</Button>
				</div>
			</form>
		</CustomModal>
	);
};

const StyledTextInput: React.FC<TextInputProps> = (props) => {
	return (
		<TextInput
			{...props}
			className="w-full"
			placeholder="user1234"
			styles={() => ({
				label: {
					fontWeight: 700,
					fontSize: 12,
				},
				input: {
					borderRadius: 8,
				},
			})}
		/>
	);
};

export default AvatarPanel;

const AvatarHeadSelector: React.FC<{
	onChange: (val: string) => void;
	value: string;
}> = (props) => {
	const avatars = useQuery({
		queryKey: ["avatars"],
		queryFn: () => GetUserAvatarHeads(),
	});

	if (!avatars.data || avatars.isLoading)
		return (
			<Center className="h-[105px]">
				<Loader />
			</Center>
		);
	else if (avatars.isError) return <>Error while fetching avatars</>;

	return (
		<div className="flex justify-between">
			{Object.values(avatars.data.data.public).map((avatar) => (
				<Button
					variant="transparent"
					styles={(theme) => ({
						root: {
							border:
								props.value === avatar.name ? "2px solid #6A89F8" : undefined,
							padding: 0,
							":hover": {
								opacity: 0.7,
							},
						},
					})}
					className="w-[105px] relative h-[105px] grid place-items-center"
					key={avatar.name}
					onClick={() => props.onChange(avatar.name)}
				>
					<Image
						src={`${AVATAR_HEAD_PREFIX_URL}/${avatar.thumb}`}
						alt={avatar.name}
						fill
						className="object-cover rounded-[8px]"
					/>
				</Button>
			))}
		</div>
	);
};
