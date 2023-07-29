import PlaceholderImage from "@/assets/placeholder.svg";
import CustomButton from "@/components/common/Button";
import { useExperience } from "@/lib/providers/experience/Experience.provider";
import { Button, Switch, Text } from "@mantine/core";
import Image from "next/image";
import { useState } from "react";
import { z } from "zod";
import TextInputExperience from "../common/TextInput.template";
const SaveRoomSchema = z.object({
	name: z.string(),
	description: z.string(),
	urlshortcode: z.string(),
	public: z.boolean(),
	image: z.string(),
});

const textInputStyles = {
	padding: "8px 16px",
};

const SaveInstancePanel = () => {
	const [inputDisabled, setInputDisabled] = useState({
		name: true,
		description: true,
	});

	const {
		info: { slug },
	} = useExperience();

	return (
		<div className="h-[616px]">
			<Text size={32} weight={500} align="center">
				Save Instance
			</Text>
			<div className="mt-[40px] w-full">
				<form action="" className="w-full grid gap-[12px]">
					<TextInputExperience
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
								<TextInputExperience value={slug} disabled />
							</div>
						</div>
						<div className="grid gap-[4px]">
							<Text size={14} weight={500} className="uppercase">
								Visibility
							</Text>
							<div className="flex items-center w-full gap-[8px]">
								<Text>Public</Text>
								<Switch />
								<Text>Private</Text>
							</div>
						</div>
					</div>
				</form>
			</div>
			<div className="mt-[24px] w-[251px] flex justify-between">
				<Text size={14} weight={500} className="uppercase">
					Preview Image
				</Text>
				<Button color="blue.9">Capture Image</Button>
			</div>
			<div className="mt-[8px] flex gap-[40px] h-[151px] items-center">
				<div className="relative w-[251px] h-full">
					<Image
						fill
						src={PlaceholderImage}
						alt="Room Image"
						className="w-full h-full object-cover rounded-[8px]"
					/>
				</div>
				<Text size={16} weight={500}>
					OR
				</Text>
				<Button color="blue.9">Upload From Computer</Button>
			</div>
			<div className="mt-[40px] grid place-items-center">
				<CustomButton>Done</CustomButton>
			</div>
		</div>
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
