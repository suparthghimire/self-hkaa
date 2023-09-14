"use client";
import { AnonLogin } from "@/lib/api/api";
import { useAuth } from "@/lib/providers/Auth/AuthProvider";
import { Center, Loader } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React, { PropsWithChildren, useEffect } from "react";

const AnonAuthLayout: React.FC<PropsWithChildren> = (props) => {
	const { auth, setAuth } = useAuth();

	const anonLogin = useQuery({
		queryKey: ["anonLogin"],
		queryFn: () => AnonLogin(),
	});

	useEffect(() => {
		if (!anonLogin.data) return;
		const anonAuth = anonLogin.data.data;
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
	}, [anonLogin.data]);

	if (!auth.status)
		return (
			<Center>
				<Loader />
			</Center>
		);

	if (anonLogin.isError) return <>Anon Login Failed</>;

	return <>{props.children}</>;
};

export default AnonAuthLayout;
