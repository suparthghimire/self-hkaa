import CustomButtom from "@/components/common/Button";
import {
	IsValidSrcType,
	T_UploadAssetSchema,
	UploadAssetSchema,
} from "@/components/experience/lib/schema/uploadAsset.schema";
import { UploadAssetToLibrary } from "@/lib/api/api";
import useShowStatusNotification from "@/lib/hooks/useShowStatusNotification";
import { useAuth } from "@/lib/providers/Auth/AuthProvider";
import {
	ActionIcon,
	Button,
	Divider,
	FileButton,
	Text,
	TextInput,
	Textarea,
	Tooltip,
	rem,
	useMantineTheme,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconTrash, IconUpload } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import StyledDropzone from "../../../common/StyledDropzone.template";
import StyledLabel from "../../../common/StyledLabel.template";
import AssetViewer3d from "./AssetViewer3d.template";
type T_Props = {
	onDone: () => void;
};
const UploadAsset: React.FC<T_Props> = (props) => {
	const theme = useMantineTheme();
	const [customUrl, setCustomUrl] = useState("");

	const { auth } = useAuth();

	const form = useForm<T_UploadAssetSchema>({
		initialValues: {
			assettype: "3d",
			description: "",
			name: "",
			source: null,
			tags: "",
			thumb: null,
		},
		validate: zodResolver(UploadAssetSchema),
	});

	const uploadAsset = useMutation({
		mutationFn: (data: T_UploadAssetSchema) =>
			UploadAssetToLibrary(data, auth.user?.token ?? ""),
		onSuccess: () => {
			props.onDone();
		},
	});

	useShowStatusNotification({
		error: {
			status: uploadAsset.isError,
			text: "Something went wrong while uploading asset",
		},
		loading: {
			status: uploadAsset.isLoading,
			text: "Uploading asset",
		},
		success: {
			status: uploadAsset.isSuccess,
			text: "Asset uploaded successfully",
		},
	});

	return (
		<form
			className="flex w-full h-full justify-center gap-[24px]"
			onSubmit={form.onSubmit((v) => uploadAsset.mutate(v))}
		>
			<div className="w-full h-full justify-center flex flex-col gap-[24px]">
				{!form.values.source ? (
					<StyledDropzone
						height="100%"
						width="342px"
						onDrop={(f) => {
							if (!f) return;
							const firstFile = f.at(0);

							if (!firstFile) return;
							// check file extention
							if (IsValidSrcType(firstFile))
								form.setFieldValue("source", firstFile);
							else
								showNotification({
									title: "Invalid file type",
									message: "File must be .glb or .gltf",
								});
						}}
						className="w-full"
						padding={0}
						bg="gray.1"
						radius={8}
					>
						<div className="grid place-items-center gap-[20px]">
							<IconUpload />
							<Text size={16} weight={500}>
								Drag and drop or{" "}
								<span
									style={{
										color: theme.colors.blue[1],
									}}
								>
									Choose File
								</span>{" "}
								to upload
							</Text>
							<div className="grid gap-[6px] place-items-center">
								<Text size={16} weight={500} color="gray.5">
									3D models must be under 10 MB
								</Text>
								<Text size={16} weight={500} color="gray.5">
									Supported file types: glb, gltf
								</Text>
							</div>
						</div>
					</StyledDropzone>
				) : (
					<div className="relative flex flex-col h-full items-start gap-[4px]">
						<div
							style={{
								border: "2px solid #ededed",
								backgroundColor: "#f5f5f5",
							}}
							className="w-full h-[450px] rounded-[8px]"
						>
							<AssetViewer3d url={URL.createObjectURL(form.values.source)} />
						</div>
						<div className="absolute top-2 right-2 z-[9999999999999]">
							<Image
								src="/assets/icons/teeny360icon.svg"
								alt="Teeny 360 Icon"
								width={24}
								height={24}
							/>
						</div>
						<Tooltip label="Remove Asset">
							<ActionIcon onClick={() => form.setFieldValue("source", null)}>
								<IconTrash />
							</ActionIcon>
						</Tooltip>
					</div>
				)}
			</div>
			<Divider orientation="vertical" />
			<div className="flex h-full w-full flex-col justify-between">
				<div className="flex flex-col gap-[12px]">
					<TextInput
						className="w-full"
						placeholder="Choose a name that helps ID the asset"
						styles={() => ({
							input: {
								height: rem(48),
							},
						})}
						label={<StyledLabel>Name</StyledLabel>}
						{...form.getInputProps("name")}
					/>
					<Textarea
						className="w-full"
						placeholder="Describe how this asset should be used"
						styles={() => ({
							input: {
								height: rem(56),
							},
						})}
						label={<StyledLabel>Description</StyledLabel>}
						{...form.getInputProps("description")}
					/>
					<TextInput
						className="w-full"
						placeholder="Tags should be separated by comma (,)"
						styles={() => ({
							input: {
								height: rem(48),
							},
						})}
						label={<StyledLabel>Tags</StyledLabel>}
						{...form.getInputProps("tags")}
					/>
					<div className="grid gap-[2px]">
						<div className="flex gap-[8px] items-center">
							<StyledLabel>Thumbnail</StyledLabel>
							<FileButton
								accept="image/png, image/jpg, image/jpeg, image/webp"
								onChange={(file) => {
									if (!file) return;
									form.setFieldValue("thumb", file);
								}}
							>
								{(fBtnProps) => (
									<Button
										{...fBtnProps}
										variant="transparent"
										px={0}
										py={0}
										className="cursor-pointer"
										styles={() => ({
											label: {
												color: theme.colors.blue[0],
												textDecoration: "underline",
												fontWeight: 500,
											},
										})}
									>
										UPLOAD
									</Button>
								)}
							</FileButton>
						</div>
						<div
							className="w-[97px] h-[58px] rounded-[8px]"
							style={{
								border: form.errors.thumb ? "1px solid red" : undefined,
							}}
						>
							<img
								src={
									form.values.thumb
										? URL.createObjectURL(form.values.thumb)
										: "/assets/placeholder.svg"
								}
								className="object-cover w-full h-full object-center rounded-[8px]"
								alt="Placeholder Image"
								style={{
									border: "1px solid #ededed",
								}}
							/>
						</div>
						{form.errors.thumb && (
							<Text size={12} color="red.5">
								{form.errors.thumb}
							</Text>
						)}
					</div>
				</div>
				<div className="grid place-items-center mt-[8px]">
					<CustomButtom loading={uploadAsset.isLoading} type="submit">
						Done
					</CustomButtom>
				</div>
			</div>
		</form>
	);
};

export default UploadAsset;
