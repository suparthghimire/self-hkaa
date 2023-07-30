import CustomButton from "@/components/common/Button";
import ServerError from "@/components/common/ServerError";
import { CloudUpload } from "@/lib/api/api";
import { VALID_MEDIA_UPLOAD_MIMES } from "@/lib/data/constants";
import useShowStatusNotification from "@/lib/hooks/useShowStatusNotification";
import { useExperience } from "@/lib/providers/experience/Experience.provider";
import { T_WorldInfo } from "@experience/types";
import { Button, FileButton, Switch, Text } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import React, { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import TextInputExperience from "../common/TextInput.template";
const SaveRoomSchema = z.object({
	name: z.string().nonempty("Please enter valid name"),
	description: z.string().nonempty("Please enter valid description"),
	urlshortcode: z.string().nonempty("Please enter valid urlshortcode"),
	isPublic: z.boolean().default(false),
	image: z.custom<File | string>().superRefine((data, ctx) => {
		if (data instanceof File) {
			const mime = data.type;
			if (!VALID_MEDIA_UPLOAD_MIMES.includes(mime))
				ctx.addIssue({
					code: "custom",
					message: "Please upload a valid image file",
				});
		}
	}),
});

type T_Props = {
	closeSavePanel: () => void;
};

const SaveInstancePanel: React.FC<T_Props> = (props) => {
	const [inputDisabled, setInputDisabled] = useState({
		name: true,
		description: true,
	});

	const {
		roomInfo: { slug },
		worldInfo,
		saveRoom,
		saveStatus,
		captureImage,
	} = useExperience();

	const uploadImage = useMutation({
		mutationFn: (file: File) => CloudUpload(file),
	});
	const saveForm = useForm<T_WorldInfo>({
		initialValues: {
			description: worldInfo.description,
			image: worldInfo.image,
			name: worldInfo.name,
			isPublic: worldInfo.isPublic,
			urlshortcode: slug,
		},
		validate: zodResolver(SaveRoomSchema),
	});

	const handleSubmit = useCallback((data: T_WorldInfo) => {
		// if image is a file, first upload to cloud and get url
		// then save the room
		if (typeof data.image === "string") {
			console.log("SAVE ROOM", data);
			saveRoom(data);
		} else if (data.image instanceof File) {
			console.log("UPLOADING IMAGE", data.image);
			uploadImage.mutate(data.image);
		}
	}, []);

	useEffect(() => {
		if (!uploadImage.data) return;

		const url = Object.values(uploadImage.data.urls)[0];

		saveRoom({
			...saveForm.values,
			image: url,
		});
	}, [uploadImage.data]);

	useEffect(() => {
		saveForm.setValues({
			description: worldInfo.description,
			image: worldInfo.image,
			name: worldInfo.name,
			isPublic: worldInfo.isPublic,
			urlshortcode: slug,
		});
	}, [worldInfo.image]);

	useEffect(() => {
		if (saveStatus === "success") props.closeSavePanel();
	}, [saveStatus]);

	useShowStatusNotification({
		loading: {
			status: saveStatus === "loading",
			text: "Saving Instance",
		},
		success: {
			status: saveStatus === "success",
			text: "Instance Saved Successfully",
		},
		error: {
			status: saveStatus === "error",
			text: "There was an error saving instance",
		},
	});
	useShowStatusNotification({
		loading: {
			status: uploadImage.isLoading,
			text: "Uploading Image",
		},
		success: {
			status: uploadImage.isSuccess,
			text: "Image Uploaded Successfully",
		},
		error: {
			status: uploadImage.isError,
			text: "There was an error uploading image",
		},
	});

	return (
		<form onSubmit={saveForm.onSubmit(handleSubmit)} className="min-h-[616px]">
			{saveStatus === "error" && (
				<ServerError error="There was an error while saving instance" />
			)}
			<Text size={32} weight={500} align="center">
				Save Instance
			</Text>
			<div className="mt-[40px] w-full">
				<div className="w-full grid gap-[12px]">
					<TextInputExperience
						{...saveForm.getInputProps("name")}
						label={
							<InputLabel
								label="Name"
								onEdit={() => {
									setInputDisabled((pv) => ({
										...pv,
										name: false,
									}));
								}}
							/>
						}
						disabled={inputDisabled.name}
						placeholder="Enter a name for your instance"
					/>
					<TextInputExperience
						{...saveForm.getInputProps("description")}
						label={
							<InputLabel
								label="Description"
								onEdit={() => {
									setInputDisabled((pv) => ({
										...pv,
										description: false,
									}));
								}}
							/>
						}
						disabled={inputDisabled.description}
						placeholder="Enter a description for your instance"
					/>
					<div className="flex items-start gap-[40px]">
						<div className="grid gap-[4px]">
							<Text size={14} weight={500} className="uppercase">
								Custom URL
							</Text>
							<div className="flex items-center w-full gap-[8px]">
								<div
									className="h-[40px] grid place-items-center rounded-[4px] px-[16px] py-[8px]"
									style={{
										border: "1px solid #D1D5DB",
									}}
								>
									hkaa.lucidworlds.com
								</div>
								<TextInputExperience
									{...saveForm.getInputProps("urlshortcode")}
									disabled
								/>
							</div>
						</div>
						<div className="grid gap-[4px]">
							<Text size={14} weight={500} className="uppercase">
								Visibility
							</Text>
							<div className="flex items-center w-full gap-[8px]">
								<Text>Public</Text>
								<Switch {...saveForm.getInputProps("isPublic")} />
								<Text>Private</Text>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="mt-[24px] w-[251px] flex justify-between">
				<Text size={14} weight={500} className="uppercase">
					Preview Image
				</Text>
				<Button color="blue.9" onClick={captureImage}>
					Capture Image
				</Button>
			</div>
			<div className="mt-[8px] flex gap-[40px] h-[151px] items-center">
				<div className="relative w-[251px] h-full">
					<img
						src={
							saveForm.values.image instanceof File
								? URL.createObjectURL(saveForm.values.image)
								: saveForm.values.image
						}
						alt="Room Image"
						className="w-full h-full object-cover rounded-[8px]"
					/>
				</div>
				<Text size={16} weight={500}>
					OR
				</Text>
				<FileButton
					onChange={(file) => {
						if (!file) return;
						saveForm.setFieldValue("image", file);
					}}
					accept={VALID_MEDIA_UPLOAD_MIMES.join(",")}
				>
					{(fileProps) => (
						<Button {...fileProps} color="blue.9">
							Upload From Computer
						</Button>
					)}
				</FileButton>
			</div>
			<div className="mt-[40px] grid place-items-center">
				<CustomButton
					type="submit"
					loading={saveStatus === "loading" || uploadImage.isLoading}
				>
					Done
				</CustomButton>
			</div>
		</form>
	);
};

type T_InputLabelProps = {
	label: string;
	onEdit: () => void;
};
const InputLabel: React.FC<T_InputLabelProps> = (props) => {
	return (
		<div className="flex gap-[8px]">
			<Text size={14} weight={500} className="uppercase">
				{props.label}
			</Text>
			<Text
				size={14}
				weight={500}
				onClick={props.onEdit}
				className="underline cursor-pointer"
			>
				EDIT
			</Text>
		</div>
	);
};

export default SaveInstancePanel;
