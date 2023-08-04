import { CloudUpload } from "@/lib/api/api";
import { MAX_FILE_SIZE } from "@/lib/data/constants";
import { ByteToMb } from "@/lib/helpers";
import useShowStatusNotification from "@/lib/hooks/useShowStatusNotification";
import { useExperience } from "@/lib/providers/experience/Experience.provider";
import { Button, FileButton, Tabs, Text, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconUpload } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactPlayer from "react-player";
import StyledSelect from "../common/StyledSelect.template";
import StyledTabs from "../common/StyledTabs.template";
import TextInputExperience from "../common/TextInput.template";

type T_Form = {
	src: string | File | null;
	type: "image" | "video" | "audio" | "live";
};

type T_Props = {
	closeHotspotPanel: () => void;
};
const HotspotPanel: React.FC<T_Props> = (props) => {
	const [url, setUrl] = useState("");
	const hotspotForm = useForm<T_Form>({
		initialValues: {
			src: null,
			type: "image",
		},
	});
	const {
		hotspotInfo: { selectedAsset },
		sendHotspotAssetSelected,
	} = useExperience();

	const uploadMedia = useMutation({
		mutationFn: (file: File) => CloudUpload(file),
	});

	const onSubmit = useCallback((data: T_Form) => {
		// if src is type of file, upload to cloudinary
		if (!selectedAsset) return;

		// if file is not present or url is not present, add error
		if (!data.src) {
			hotspotForm.setErrors({
				src: "Please upload a file or enter a url",
			});
			return;
		}

		if (data.src instanceof File) uploadMedia.mutate(data.src);
		else {
			sendHotspotAssetSelected({
				...selectedAsset,
				value: {
					source:
						data.type === "live"
							? "video"
							: data.type === "image"
							? "2d"
							: data.type,
					url: data.src,
					isLive: data.type === "live",
				},
			});
			props.closeHotspotPanel();
		}
	}, []);

	useEffect(() => {
		if (!uploadMedia.data || !selectedAsset) return;
		const fileType = (hotspotForm.values.src as File).type;

		const source = fileType.split("/")[0] as "image" | "video" | "audio";
		const url = Object.values(uploadMedia.data.urls)[0];
		sendHotspotAssetSelected({
			...selectedAsset,
			value: {
				source: source === "image" ? "2d" : source,
				url,
			},
		});
		props.closeHotspotPanel();
	}, [uploadMedia.data, selectedAsset]);

	useShowStatusNotification({
		loading: {
			status: uploadMedia.isLoading,
			text: "Media is Uploading",
		},
		success: {
			status: uploadMedia.isSuccess,
			text: "Media Uploaded Successfully",
		},
		error: {
			status: uploadMedia.isError,
			text: "An Error Occured While Uploading Media",
		},
	});

	return (
		<form className="grid gap-[24px]" onSubmit={hotspotForm.onSubmit(onSubmit)}>
			<Text size={20} weight={600} align="center" className="uppercase">
				Hotspot
			</Text>
			<StyledTabs defaultValue="upload">
				<Tabs.List grow>
					<Tabs.Tab value="upload">Upload Media</Tabs.Tab>
					<Tabs.Tab value="web_cam">Web Cam</Tabs.Tab>
				</Tabs.List>
				<Tabs.Panel value="upload">
					<div className="w-full grid gap-[24px] mt-[24px]">
						<div className="w-full grid gap-[16px]">
							<div className="w-full grid gap-[4px]">
								<div className="w-full flex justify-end">
									<FileButton
										onChange={(f) => {
											if (f && f.size > MAX_FILE_SIZE) {
												showNotification({
													title: "Upload Error",
													message: `File size is too large. Please upload a file less than ${ByteToMb(
														MAX_FILE_SIZE
													)}MB`,
													color: "red",
												});
												return;
											}
											hotspotForm.setValues({
												src: f,
											});
										}}
									>
										{(fileBtnProps) => (
											<Button
												{...fileBtnProps}
												size="xs"
												variant="transparent"
												className="outline-none"
												leftIcon={<IconUpload size="20px" />}
												styles={(theme) => ({
													root: {
														color: theme.colors.blue[9],
													},
												})}
											>
												Upload From Computer
											</Button>
										)}
									</FileButton>
								</div>
								<div className="w-full h-[254px]">
									<MediaRenderer src={hotspotForm.values.src} />
								</div>
								<Text size={12} align="center" color="gray.7">
									Supported file types: mp4, mkv, ogv, mov, mp3, ogg, wav, jpg,
									png, webp, gif, glb, gltf
								</Text>
							</div>
							<Text align="center">OR</Text>
							<div className="w-full flex gap-[8px]">
								<div className="w-full">
									<TextInputExperience
										value={url}
										onChange={(e) => setUrl(e.currentTarget.value)}
										placeholder="Enter url for image, audio, or video"
										rightSection={
											<Button
												size="xs"
												mr={30}
												onClick={() => {
													hotspotForm.setValues({
														src: url,
													});
												}}
											>
												Load
											</Button>
										}
										error={hotspotForm.errors.src}
									/>
								</div>
								<div className="w-[130px]">
									<StyledSelect
										onChange={(e) => {
											if (e)
												hotspotForm.setValues({
													type: e as "video" | "image" | "audio" | "live",
												});
										}}
										defaultValue="audio"
										data={[
											{
												label: "Video",
												value: "video",
											},
											{
												label: "Image",
												value: "image",
											},
											{
												label: "Audio",
												value: "audio",
											},
											{
												label: "Live Stream",
												value: "live",
											},
										]}
									/>
								</div>
							</div>
						</div>
						<div className="flex justify-center gap-[48px]">
							<Button
								variant="outline"
								radius={rem(8)}
								styles={() => ({
									root: {
										padding: "12px 24px",
										height: "auto",
										width: "146px",
										borderWidth: rem(3),
									},
								})}
								onClick={props.closeHotspotPanel}
							>
								CANCEL
							</Button>
							<Button
								type="submit"
								radius={rem(8)}
								styles={() => ({
									root: {
										padding: "12px 24px",
										height: "auto",
										width: "146px",
										borderWidth: rem(3),
									},
								})}
							>
								DONE
							</Button>
						</div>
					</div>
				</Tabs.Panel>
				<Tabs.Panel value="web_cam">
					<div className="mt-[24px] h-[475px]">
						<div className="grid gap-[24px]">
							<Text>Livestream yourself via web cam</Text>
							<Button
								color="blue.0"
								radius={8}
								onClick={() => {
									if (!selectedAsset) return;
									sendHotspotAssetSelected({
										...selectedAsset,
										assettype: "stream",
										value: {
											email: "",
											type: "camera",
											source: "stream",
										},
									});
									props.closeHotspotPanel();
								}}
							>
								CONNECT WEB CAM
							</Button>
						</div>
					</div>
				</Tabs.Panel>
			</StyledTabs>
		</form>
	);
};

const MediaRenderer: React.FC<{
	src: string | File | null;
}> = (props) => {
	const fileExt = useMemo(() => {
		if (typeof props.src === "string") return props.src.split(".").pop();
		else if (props.src instanceof File) return props.src.type.split("/").pop();
		else return null;
	}, [props.src]);

	const isImage = useMemo(() => {
		return fileExt && ["jpg", "png", "webp"].includes(fileExt);
	}, [fileExt]);

	return (
		<div className="grid w-full gap-[4px]">
			<div className="w-full h-[254px]">
				{props.src === null && (
					<img
						src="/assets/placeholder.svg"
						className="w-full h-full object-cover object-center rounded-[8px]"
					/>
				)}
				{props.src !== null && isImage && (
					<img
						src={
							typeof props.src === "string"
								? props.src
								: URL.createObjectURL(props.src)
						}
						className="w-full h-full object-cover object-center rounded-[8px]"
					/>
				)}
				{props.src !== null && !isImage && (
					<ReactPlayer
						url={
							typeof props.src === "string"
								? props.src
								: URL.createObjectURL(props.src)
						}
						controls
						width="100%"
						height="100%"
						playing
						loop
						muted
					/>
				)}
			</div>
		</div>
	);
};

export default HotspotPanel;
