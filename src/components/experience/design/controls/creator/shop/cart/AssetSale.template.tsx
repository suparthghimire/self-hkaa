import Button from "@/components/common/Button";
import StyledDropzone from "@/components/experience/design/common/StyledDropzone.template";
import StyledLabel from "@/components/experience/design/common/StyledLabel.template";
import {
	Modal,
	ModalProps,
	Text,
	TextInput,
	TextInputProps,
	Textarea,
	TextareaProps,
	Tooltip,
	rem,
	useMantineTheme,
} from "@mantine/core";
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
							<StyledLabel>Upload Product Image(s)</StyledLabel>
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
						label={<StyledLabel>Product Name</StyledLabel>}
					/>
					<StyledTextArea
						placeholder="Enter a description"
						label={<StyledLabel>Description</StyledLabel>}
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
					/>
					<StyledTextInput
						placeholder="https://example.com/product-info"
						label={<StyledLabel>Product URL</StyledLabel>}
					/>
				</div>
				<div className="grid place-items-center">
					<Button onClick={props.onClose}>Done</Button>
				</div>
			</div>
		</Modal>
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
