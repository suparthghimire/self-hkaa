"use client";
import "@/app/globals.css";
import Button from "@/components/common/Button";
import MainLayout from "@/components/layout/main/MainLayout.template";
import { AdminLogin } from "@/lib/api/api";
import useShowStatusNotification from "@/lib/hooks/useShowStatusNotification";
import { useAuth } from "@/lib/providers/Auth/AuthProvider";
import { Modal, PasswordInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import React, { PropsWithChildren, useState } from "react";
import { z } from "zod";

const AdminPageLayout: React.FC<PropsWithChildren> = (props) => {
	const [passwordModalOpen, setPasswordModalOpen] = useState(true);
	const [passwordValidated, setPasswordValidated] = useState(false);
	const { setAuth } = useAuth();
	const passwordForm = useForm({
		initialValues: {
			identity: "admin@lucidworlds.com",
			password: "",
		},
		validate: zodResolver(
			z.object({
				password: z.string().nonempty("Password is required"),
			})
		),
	});
	const adminLogin = useMutation({
		mutationFn: () => AdminLogin(passwordForm.values),
		onSuccess(data) {
			const authData = data.data;
			setAuth({
				status: true,
				user: {
					primary: authData.user.primary,
					token: authData.token,
					tokenspan: authData.tokenspan,
					role: authData.role,
				},
			});

			console.log(authData);
			setPasswordModalOpen(false);
			setPasswordValidated(true);
		},
		onError() {
			passwordForm.setFieldError("password", "Invalid password");
		},
	});
	useShowStatusNotification({
		error: { status: adminLogin.isError, text: "Error logging in" },
		loading: { status: adminLogin.isLoading, text: "Logging in..." },
		success: { status: adminLogin.isSuccess, text: "Logged in successfully" },
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
						adminLogin.mutate();
					})}
				>
					<PasswordInput
						label="Please enter Admin password"
						{...passwordForm.getInputProps("password")}
					/>
					<Button loading={adminLogin.isLoading} type="submit">
						Enter as Admin
					</Button>
				</form>
			</Modal>
		</>
	);
};

export default AdminPageLayout;
