"use client";
import "@/app/globals.css";
import AdminAuth from "@/components/auth/AdminAuth.template";
import MainLayout from "@/components/layout/main/MainLayout.template";
import { GetMyData } from "@/lib/api/api";
import useCheckAuth from "@/lib/hooks/useCheckAuth";
import { useAuth } from "@/lib/providers/Auth/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import React, { PropsWithChildren, useEffect } from "react";

const AdminPageLayout: React.FC<PropsWithChildren> = (props) => {
	const { isAuth, accessToken } = useCheckAuth();

	const { auth, setAuth } = useAuth();

	const myInfo = useMutation({
		mutationFn: (token: string) => GetMyData(token),
	});

	useEffect(() => {
		console.log("ACCESS TOKEN", accessToken);
		if (accessToken) myInfo.mutate(accessToken);
	}, [accessToken]);

	useEffect(() => {
		if (!myInfo.data) return;
		else if (!auth.status) return;
		console.log(myInfo);
		setAuth({
			...auth,
			user: {
				...auth.user,
				primary: {
					...auth.user.primary,
					...myInfo.data,
				},
			},
		});
	}, []);

	if (isAuth) return <MainLayout userType="admin">{props.children}</MainLayout>;

	if (myInfo.isLoading) return <>Loading My Info</>;

	if (!isAuth || myInfo.isError) return <AdminAuth>{props.children}</AdminAuth>;

	return <></>;
};

export default AdminPageLayout;
