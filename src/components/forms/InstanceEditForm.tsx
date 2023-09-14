import CustomButton from "@/components/common/Button";
import { UpdateRoom } from "@/lib/api/api";
import { VALID_IMAGE_MIMES_STR } from "@/lib/data/constants";
import { useAuth } from "@/lib/providers/Auth/AuthProvider";
import {
	InstanceEditSchema,
	T_InstanceEditSchema,
} from "@/schema/instance.schema";
import {
	Button,
	FileButton,
	Text,
	TextInput,
	Textarea,
	useMantineTheme,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DisplayImage from "../common/DisplayImage";
import ServerError from "../common/ServerError";
type T_InstanceEditFormProps = {
	name: string;
	description: string;
	image: string;
	id: number;
	uuid: string;
	url: string;
	close: () => void;
};

const InstanceEditForm: React.FC<T_InstanceEditFormProps> = (props) => {
	const form = useForm<T_InstanceEditSchema>({
		initialValues: {
			description: props.description,
			name: props.name,
			image: props.image,
			url: props.url,
			uuid: props.uuid,
		},
		validate: zodResolver(InstanceEditSchema),
	});

	const theme = useMantineTheme();
	const qc = useQueryClient();
	const { auth } = useAuth();
	const updateRoom = useMutation({
		mutationFn: () => UpdateRoom(auth.user?.token ?? "", form.values, props.id),
		onError() {
			showNotification({
				title: "Error",
				message: "Something went wrong",
				color: "red",
			});
		},
		onSuccess() {
			showNotification({
				title: "Success",
				message: "Instance updated successfully",
				color: "green",
			});
			qc.invalidateQueries({
				queryKey: ["all-rooms"],
			});

			props.close();
		},
	});

	const handleSubmit = () => {
		updateRoom.mutate();
	};

	return (
		<form
			onSubmit={form.onSubmit((d) => updateRoom.mutate())}
			className="grid gap-[24px]"
		>
			{updateRoom.isError && <ServerError error={updateRoom.error} />}
			<TextInput
				label="NAME"
				placeholder="Instance Name"
				{...form.getInputProps("name")}
			/>
			<Textarea
				label="DESCRIPTION"
				placeholder="Instance Description"
				{...form.getInputProps("description")}
			/>
			<TextInput
				label="URL"
				placeholder="Instance URL"
				{...form.getInputProps("url")}
			/>

			<div className="w-[251px]">
				<div className="flex items-center justify-between">
					<Text size={14} color="gray.9">
						PREVIEW IMAGE (OPTIONAL)
					</Text>

					<FileButton
						accept={VALID_IMAGE_MIMES_STR}
						onChange={(f) => {
							if (f) {
								form.setFieldValue("image", f);
							}
						}}
					>
						{(fileBtnProps) => (
							<Button
								variant="transparent"
								{...fileBtnProps}
								styles={() => ({
									label: {
										fontSize: "12px",
										fontWeight: 400,
										textDecoration: "underline",
										textTransform: "uppercase",
										color: theme.primaryColor,
									},
									root: {
										padding: 0,
									},
								})}
							>
								UPLOAD
							</Button>
						)}
					</FileButton>
				</div>
				<div
					className="w-[251px] h-[151px] relative bg-neutral-200 rounded-[8px]"
					style={{
						boxShadow: "0 0 6px 0 #E0E0E0",
						border: form.errors.image ? "1px solid red" : "2px solid #E1E1E1",
					}}
				>
					<DisplayImage
						image={form.values.image}
						alt="Instance Image"
						fill
						className="w-full h-full rounded-[8px] object-cover"
					/>
				</div>
				{form.errors.image && (
					<Text mt={3} size="12px" color="red.6">
						{form.errors.image}
					</Text>
				)}
			</div>
			<div className="mt-[40px] flex justify-center gap-[20px]">
				<CustomButton onClick={props.close} variant="outline">
					BACK
				</CustomButton>
				<CustomButton type="submit" loading={updateRoom.isLoading}>
					SAVE
				</CustomButton>
			</div>
		</form>
	);
};

export default InstanceEditForm;
