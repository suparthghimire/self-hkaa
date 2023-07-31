"use client";
import "@/app/globals.css";
import Button from "@/components/common/Button";
import MainLayout from "@/components/layout/main/MainLayout.template";
import { Modal, PasswordInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import React, { PropsWithChildren, useState } from "react";
import { z } from "zod";

const AdminPageLayout: React.FC<PropsWithChildren> = (props) => {
	const [passwordModalOpen, setPasswordModalOpen] = useState(true);
	const [passwordValidated, setPasswordValidated] = useState(false);
	const passwordForm = useForm({
		initialValues: {
			password: "",
		},
		validate: zodResolver(
			z.object({
				password: z.string().nonempty("Password is required"),
			})
		),
	});
	return (
		<>
			{passwordValidated && (
				<MainLayout userType="admin">{props.children}</MainLayout>
			)}
			<Modal
				centered
				opened={passwordModalOpen}
				onClose={() => {
					// setPasswordModalOpen(false);
				}}
				title="Admin Password"
			>
				<form
					className="grid gap-3"
					onSubmit={passwordForm.onSubmit(() => {
						// check for backend
						setPasswordModalOpen(false);
						setPasswordValidated(true);
					})}
				>
					<PasswordInput
						label="Please enter Admin password"
						{...passwordForm.getInputProps("password")}
					/>
					<Button type="submit">Enter as Admin</Button>
				</form>
			</Modal>
		</>
	);
};

export default AdminPageLayout;
