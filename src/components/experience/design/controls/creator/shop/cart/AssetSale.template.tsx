import Button from "@/components/common/Button";
import {
	Modal,
	ModalProps,
	Text,
	TextInput,
	TextInputProps,
	TextProps,
	Textarea,
	TextareaProps,
	Tooltip,
	rem,
	useMantineTheme,
} from "@mantine/core";
import { Dropzone, DropzoneProps } from "@mantine/dropzone";
import { IconInfoCircle, IconUpload } from "@tabler/icons-react";
import React from "react";
const AssetSale: React.FC<ModalProps> = (props) => {
	const theme = useMantineTheme();
	return (
		<Modal
			{...props}
			size={rem(587)}
			padding={rem(40)}
			centered
			radius={16}
			closeButtonProps={{
				iconSize: rem(24),
				color: "gray.9",
			}}
		>
			<div className="grid gap-[40px]">
				<Text size={28} weight={400} align="center">
					Link to Product Page
				</Text>
				<div className="grid gap-[12px]">
					<div className="grid gap-[4px]">
						<div className="w-full flex items-center gap-[4px]">
							<InputLabel>Upload Product Image(s)</InputLabel>
							<Tooltip label="Upload Image">
								<IconInfoCircle size={18} color={theme.colors.gray[7]} />
							</Tooltip>
						</div>
						<StyledDropzone onDrop={() => {}}>
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
					</div>
					<StyledTextInput
						placeholder="Enter product name"
						label={<InputLabel>Product Name</InputLabel>}
					/>
					<StyledTextArea
						placeholder="Enter a description"
						label={<InputLabel>Description</InputLabel>}
					/>
					<StyledTextInput
						type="number"
						placeholder="Enter product price"
						label={<InputLabel>Price</InputLabel>}
						rightSection={
							<Text
								size={14}
								className="grid place-items-center mt-[5px] mr-[20px]"
							>
								HKD
							</Text>
						}
					/>
					<StyledTextInput
						placeholder="https://example.com/product-info"
						label={<InputLabel>Product URL</InputLabel>}
					/>
				</div>
				<div className="grid place-items-center">
					<Button>Done</Button>
				</div>
			</div>
		</Modal>
	);
};

const InputLabel: React.FC<TextProps> = (props) => {
	return (
		<Text
			size={14}
			weight={600}
			color="gray.6"
			className="uppercase"
			{...props}
		/>
	);
};

const StyledDropzone: React.FC<DropzoneProps> = (props) => {
	return (
		<Dropzone
			{...props}
			padding={rem(24)}
			radius={4}
			styles={() => ({
				root: {
					height: rem(187),
					borderStyle: "solid",
					display: "grid",
					placeItems: "center",
				},
			})}
		/>
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
export default AssetSale;
