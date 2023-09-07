import CustomButtom from "@/components/common/Button";
import {
	T_UploadAssetSchema,
	UploadAssetSchema,
} from "@/components/experience/lib/schema/uploadAsset.schema";
import { UploadAssetToLibrary } from "@/lib/api/api";
import useShowStatusNotification from "@/lib/hooks/useShowStatusNotification";
import { useAuth } from "@/lib/providers/Auth/AuthProvider";
import {
	Button,
	Divider,
	FileButton,
	Text,
	TextInput,
	Textarea,
	rem,
	useMantineTheme,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconUpload } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import StyledDropzone from "../../../common/StyledDropzone.template";
import StyledLabel from "../../../common/StyledLabel.template";
import AssetViewer from "./AssetViewer.template";
type T_Props = {
	onDone: () => void;
};
const UploadAsset: React.FC<T_Props> = (props) => {
	const theme = useMantineTheme();
	const [customUrl, setCustomUrl] = useState("");

	const { auth } = useAuth();

	const form = useForm<T_UploadAssetSchema>({
		initialValues: {
			assettype: "audio",
			description: "",
			name: "",
			source: "",
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

	const fileType = useMemo(() => {
		if (form.values.source instanceof File)
			return form.values.source.type.length > 0
				? form.values.source.type
				: form.values.source.name.split(".").pop() ?? "invalid_file_type";
		else return "url";
	}, [form.values.source]);

	useEffect(() => {
		switch (fileType) {
			case "image/png":
			case "image/jpg":
			case "image/jpeg":
			case "image/webp":
			case "video/mp4":
			case "video/mkv":
				form.setFieldValue("assettype", "2d");
				break;
			case "audio/mp3":
			case "audio/wav":
			case "audio/mpeg":
				form.setFieldValue("assettype", "audio");
				break;
			case "glb":
				form.setFieldValue("assettype", "3d");
				break;
		}
	}, [fileType]);

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
						accept={["application/octet-stream"]}
						onDrop={(f) => {
							if (!f) return;
							if (f.length <= 0) return;
							form.setFieldValue("source", f[0]);
						}}
						className="w-full"
						padding={0}
						bg="gray.2"
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
							<Text size={16} weight={500} color="gray.5">
								3D models must be under 10 MB
							</Text>
							<Text size={16} weight={500} color="gray.5">
								Supported file types: glb, gltf
							</Text>
						</div>
					</StyledDropzone>
				) : (
					<div className="flex flex-col items-end gap-[4px]">
						<div className="w-fit">
							<FileButton
								accept="application/octet-stream"
								onChange={(f) => {
									if (!f) return;
									form.setFieldValue("source", f);
								}}
							>
								{(assetBtnProps) => (
									<Button
										{...assetBtnProps}
										variant="transparent"
										leftIcon={<IconUpload />}
										size="xs"
										styles={(theme) => ({
											root: {
												color: theme.colors.blue[1],
											},
										})}
									>
										Change Asset
									</Button>
								)}
							</FileButton>
						</div>
						<AssetViewer
							url={
								form.values.source instanceof File
									? URL.createObjectURL(form.values.source)
									: form.values.source
							}
							fileType={fileType}
						/>
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
