"use client";
import { AnonLogin } from "@/lib/api/api";
import useShowStatusNotification from "@/lib/hooks/useShowStatusNotification";
import { useAuth } from "@/lib/providers/Auth/AuthProvider";
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
		success: { status: anonLogin.isSuccess, text: "Logged in successfully" },
	});

	return (
		<>
			{anonLogin.isSuccess && props.children}
			{anonLogin.isLoading && <>Logging you in Anononymously </>}
			{anonLogin.isError && <>Error logging you in Anononymously </>}
		</>
	);
};

export default AnonAuthLayout;
