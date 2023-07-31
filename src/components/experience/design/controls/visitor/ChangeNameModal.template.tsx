import { useExperience } from "@/lib/providers/experience/Experience.provider";
import { Button, Modal, ModalProps, Text, TextInput, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useCallback, useEffect } from "react";

type T_Props = ModalProps & {
	type: "create" | "update";
};

const ChangeNameModal: React.FC<T_Props> = (props) => {
	const {
		userInfo: { name },
		changeUserName,
	} = useExperience();
	const nameForm = useForm({
		initialValues: {
			name: name,
		},
	});
	const onSubmit = useCallback((data: { name: string }) => {
		changeUserName(data.name);
		props.onClose();
	}, []);
	useEffect(() => {
		nameForm.setValues({ name });
	}, [name]);

	return (
		<Modal
			{...props}
			size="626px"
			centered
			radius={18}
			padding={rem(60)}
			withCloseButton={false}
		>
			<div className="grid place-items-center">
				<form
					className="grid place-items-center gap-[40px] w-[340px]"
					onSubmit={nameForm.onSubmit(onSubmit)}
				>
					<Text size={28} weight={700} className="capitalize">
						{props.type} display name
					</Text>
					<TextInput
						className="w-full"
						{...nameForm.getInputProps("name")}
						placeholder="Enter your nickname"
					/>
					<Button type="submit">Done</Button>
				</form>
			</div>
		</Modal>
	);
};

export default ChangeNameModal;
