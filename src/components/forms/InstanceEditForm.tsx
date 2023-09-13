import CustomButton from "@/components/common/Button";
import {
	InstanceEditSchema,
	T_InstanceEditSchema,
} from "@/schema/intance.schema";
import { Button, FileButton, Text, TextInput, Textarea } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import DisplayImage from "../common/DisplayImage";
type T_InstanceEditFormProps = {
	name: string;
	description: string;
	image: string;
	close: () => void;
};

const dummyData = {
	name: "test",
	description: "test",
	image: "test",
};

const InstanceEditForm: React.FC<T_InstanceEditFormProps> = (props) => {
	const form = useForm<T_InstanceEditSchema>({
		initialValues: {
			description: props.description,
			name: props.name,
			image: props.image,
		},
		validate: zodResolver(InstanceEditSchema),
	});
	return (
		<form
			onSubmit={form.onSubmit((data) => console.log(data))}
			className="grid gap-[24px]"
		>
			<TextInput label="NAME" {...form.getInputProps("name")} />
			<Textarea label="DESCRIPTION" {...form.getInputProps("description")} />
			<div className="w-full">
				<Text size={14} color="gray.9">
					PREVIEW IMAGE (OPTIONAL)
				</Text>
				<div className="flex gap-[16px] w-full items-center">
					<div
						className="w-[251px] h-[151px] relative bg-neutral-200 rounded-[8px]"
						style={{
							boxShadow: "0 0 6px 0 #E0E0E0",
							border: "2px solid #E1E1E1",
						}}
					>
						<DisplayImage
							image={form.values.image}
							alt="Instance Image"
							fill
							className="w-full h-full rounded-[8px] object-cover"
						/>
					</div>
					<div className="grid place-items-center h-full w-[244px]">
						<FileButton
							onChange={(f) => {
								if (f) {
									form.setFieldValue("image", f);
								}
							}}
						>
							{(fileBtnProps) => (
								<Button {...fileBtnProps} radius={8}>
									UPLOAD FROM COMPUTER
								</Button>
							)}
						</FileButton>
					</div>
				</div>
			</div>
			<div className="mt-[40px] flex justify-center gap-[20px]">
				<CustomButton onClick={props.close} variant="outline">
					BACK
				</CustomButton>
				<CustomButton onClick={props.close}>SAVE</CustomButton>
			</div>
		</form>
	);
};

export default InstanceEditForm;
