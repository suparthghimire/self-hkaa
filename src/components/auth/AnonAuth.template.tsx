"use client";
import { AnonLogin } from "@/lib/api/api";
import useShowStatusNotification from "@/lib/hooks/useShowStatusNotification";
import { useAuth } from "@/lib/providers/Auth/AuthProvider";
import { Button, Center, Loader, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";
import React, { PropsWithChildren, useEffect } from "react";

const AnonAuthLayout: React.FC<PropsWithChildren> = (props) => {
	const { auth, setAuth } = useAuth();

	const [anonLoginOpen, { open: openAnonLogin, close: closeAnonLogin }] =
		useDisclosure(true);

	const anonLogin = useMutation({
		mutationFn: () => AnonLogin(),
		onSuccess(successData) {
			if (!successData.data) return;
			const anonAuth = successData.data;
			setAuth({
				status: true,
				user: {
					...anonAuth,
					primary: {
						...anonAuth.user.primary,
						email: "",
						username: "",
					},
				},
			});
			closeAnonLogin();
		},
	});

	useEffect(() => {
		anonLogin.mutate();
	}, []);
	useShowStatusNotification({
		error: { status: anonLogin.isError, text: "Error logging in" },
		loading: { status: anonLogin.isLoading, text: "Logging in..." },
		success: {
			status: anonLogin.isSuccess,
			text: "Anononymous login successful",
		},
	});

	return (
		<>
			{anonLogin.isSuccess && props.children}
			{anonLogin.isLoading && (
				<FullScreenWrapper>
					<Loader />
				</FullScreenWrapper>
			)}

			{anonLogin.isError && (
				<FullScreenWrapper>
					<Center className="gap-3 items-center">
						<Text size={24}>Failed to login anonomyously</Text>
						<Button onClick={() => anonLogin.mutate()}>Retry</Button>
					</Center>
				</FullScreenWrapper>
			)}
		</>
	);
};

const FullScreenWrapper: React.FC<PropsWithChildren> = (props) => {
	return (
		<Center className="fixed top-0 left-0 w-screen h-screen">
			{props.children}
		</Center>
	);
};

export default AnonAuthLayout;
