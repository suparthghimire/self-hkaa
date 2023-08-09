import StyledDropzone from "@/components/experience/design/common/StyledDropzone.template";
import StyledLabel from "@/components/experience/design/common/StyledLabel.template";
import { T_LinkAsset } from "@/components/experience/lib/schema/linkAsset.schema";
import { VIDEO_MIMES } from "@/lib/data/constants";
import { useAuth } from "@/lib/providers/Auth/AuthProvider";
import { useExperience } from "@/lib/providers/experience/Experience.provider";
import { T_AssetSale } from "@api/types";
import {
	ActionIcon,
	Button,
	FileButton,
	ScrollArea,
	Text,
	TextInput,
	TextInputProps,
	Textarea,
	TextareaProps,
	Tooltip,
	rem,
	useMantineTheme,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { IconInfoCircle, IconUpload, IconX } from "@tabler/icons-react";
import React, { memo, useEffect } from "react";

type T_Props = {
	form: UseFormReturnType<T_LinkAsset>;
	mutationFn: () => void;
	isLoading: boolean;
};

const AssetSaleForm: React.FC<T_Props> = (props) => {
	const theme = useMantineTheme();

	const {
		asset: { selected },
	} = useExperience();

	const form = props.form;
	const {
		auth: { user },
	} = useAuth();

	return (
		<form
			className="grid gap-[40px]"
			onSubmit={form.onSubmit((v) => {
				props.mutationFn();
			})}
		>
			<Text size={28} weight={400} align="center">
				Link to Product Page
			</Text>
			<div className="grid gap-[12px]">
				<div className="grid gap-[4px]">
					<div className="w-full flex items-center gap-[4px]">
						<StyledLabel>Upload Product Image(s)</StyledLabel>
						<Tooltip label="Upload Image">
							<IconInfoCircle size={18} color={theme.colors.gray[7]} />
						</Tooltip>
					</div>
					{form.values.media.length <= 0 ? (
						<StyledDropzone
							onDrop={(files) => {
								form.setFieldValue("media", files);
							}}
						>
							<div className="w-full grid place-items-center gap-[20px]">
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
							</div>
						</StyledDropzone>
					) : (
						<div className="flex gap-3">
							<ScrollArea offsetScrollbars className="max-w-[450px] flex gap-3">
								<DisplayMediaList
									media={form.values.media}
									onDelete={(idx) => {
										form.removeListItem("media", idx);
									}}
								/>
							</ScrollArea>
							<FileButton
								onChange={(f: File | null) => {
									if (!f) return;
									form.insertListItem("media", f);
								}}
							>
								{(uploadBtnProps) => (
									<Button
										{...uploadBtnProps}
										p={0}
										radius={rem(50)}
										styles={() => ({
											root: {
												padding: 0,
												height: rem(50),
												width: rem(50),
											},
										})}
									>
										<IconUpload />
									</Button>
								)}
							</FileButton>
						</div>
					)}
				</div>
				<StyledTextInput
					placeholder="Enter product name"
					label={<StyledLabel>Product Name</StyledLabel>}
					{...form.getInputProps("name")}
				/>
				<StyledTextArea
					placeholder="Enter a description"
					label={<StyledLabel>Description</StyledLabel>}
					{...form.getInputProps("description")}
				/>
				<StyledTextInput
					type="number"
					placeholder="Enter product price"
					label={<StyledLabel>Price</StyledLabel>}
					rightSection={
						<Text
							size={14}
							className="grid place-items-center mt-[5px] mr-[20px]"
						>
							HKD
						</Text>
					}
					{...form.getInputProps("price")}
				/>
				<StyledTextInput
					placeholder="https://example.com/product-info"
					label={<StyledLabel>Product URL</StyledLabel>}
					{...form.getInputProps("url")}
				/>
			</div>
			<div className="grid place-items-center">
				<Button type="submit" loading={props.isLoading}>
					Done
				</Button>
			</div>
		</form>
	);
};

const StyledTextInput: React.FC<TextInputProps> = (props) => {
	return (
		<TextInput
			{...props}
			styles={() => ({
				label: {
					marginBottom: "4px",
				},
				input: {
					padding: "16px",
					height: rem(40),
				},
			})}
		/>
	);
};
const StyledTextArea: React.FC<TextareaProps> = (props) => {
	return (
		<Textarea
			{...props}
			styles={() => ({
				label: {
					marginBottom: "4px",
				},
				input: {
					padding: "16px",
					height: rem(56),
				},
			})}
		/>
	);
};
export default AssetSaleForm;

const DisplayMediaList: React.FC<{
	media: (File | string)[];
	onDelete: (idx: number) => void;
}> = memo((props) => {
	return (
		<div className="max-w-full w-fit flex gap-3 relative">
			{props.media.map((m, midx) => {
				let url = "";
				let type = "image";
				if (m instanceof File) {
					url = URL.createObjectURL(m);
					type = m.type.split("/")[0];
				} else {
					try {
						const ext = m.split(".").pop();
						if (ext && !VIDEO_MIMES.includes(`video/${ext}`)) type = "video";
						url = new URL(m).href;
					} catch (error) {
						url = "/assets/placeholder.svg";
					}
				}
				return (
					<div
						className="relative w-[50px] h-[50px] rounded-full"
						key={`media-${midx}`}
					>
						{type === "image" ? (
							<img
								src={url}
								className="w-full h-full object-cover rounded-full"
							/>
						) : (
							<img
								src="/assets/placeholder.svg"
								className="w-full h-full object-cover rounded-full"
							/>
						)}
						<div className="absolute top-0 right-0">
							<ActionIcon
								variant="filled"
								color="red"
								radius={100}
								size={20}
								onClick={() => {
									props.onDelete(midx);
								}}
							>
								<IconX size={20} />
							</ActionIcon>
						</div>
					</div>
				);
			})}
		</div>
	);
});

const useSetFormValues = (
	form: UseFormReturnType<T_LinkAsset>,
	data: T_AssetSale | undefined
) => {
	useEffect(() => {
		if (!data) return;
		let media: (string | File)[] = [];
		try {
			if (typeof data.assetSale.media === "string")
				media = JSON.parse(data.assetSale.media) as string[];
		} catch (error) {
			console.error("CANNOT PARSE INVALID JSON");
		} finally {
			form.setValues({
				media,
				name: data.assetSale.name,
				description: data.assetSale.description,
				price: data.assetSale.price,
				url: data.assetSale.url,
			});
		}
	}, [data, form]);
};
