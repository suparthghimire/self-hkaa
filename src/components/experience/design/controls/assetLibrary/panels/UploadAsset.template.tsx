import CustomButtom from "@/components/common/Button";
import {
	Button,
	Divider,
	FileButton,
	Select,
	Text,
	TextInput,
	Textarea,
	rem,
	useMantineTheme,
} from "@mantine/core";
import React, { useState } from "react";
import StyledLabel from "../../../common/StyledLabel.template";
const UploadAsset: React.FC = () => {
	const theme = useMantineTheme();
	const [_file, setFile] = useState<File | null>(null);
	return (
		<div className="flex w-full h-full justify-center gap-[24px]">
			<div className="w-full h-full justify-center flex flex-col gap-[24px]">
				<div className="w-full h-[207px]">
					<img
						src="/assets/placeholder.svg"
						className="object-cover w-full h-full object-center rounded-[8px]"
						alt="Placeholder Image"
					/>
				</div>
				<Text align="center" color="gray.9">
					OR
				</Text>
				<div className="flex items-end gap-[8px]">
					<TextInput
						className="w-full"
						placeholder="https://"
						styles={() => ({
							input: {
								height: rem(48),
							},
						})}
						label={<StyledLabel>Enter URL</StyledLabel>}
						rightSection={<Button mr={40}>Load</Button>}
					/>
					<Select
						styles={() => ({
							input: {
								width: "97px",
								height: rem(48),
							},
						})}
						defaultValue="audio"
						data={[
							{ value: "image", label: "Image" },
							{ value: "audio", label: "Audio" },
							{ value: "video", label: "Video" },
						]}
					/>
				</div>
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
					/>
					<TextInput
						className="w-full"
						placeholder="Tags should be separated by spaces"
						styles={() => ({
							input: {
								height: rem(48),
							},
						})}
						label={<StyledLabel>Tags</StyledLabel>}
					/>
					<div className="grid gap-[2px]">
						<div className="flex gap-[8px] items-center">
							<StyledLabel>Thumbnail</StyledLabel>
							<FileButton onChange={() => {}}>
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
						<div className="w-[97px] h-[58px]">
							<img
								src="/assets/placeholder.svg"
								className="object-cover w-full h-full object-center rounded-[8px]"
								alt="Placeholder Image"
							/>
						</div>
					</div>
				</div>
				<div className="grid place-items-center">
					<CustomButtom>Done</CustomButtom>
				</div>
			</div>
		</div>
	);
};
export default UploadAsset;
