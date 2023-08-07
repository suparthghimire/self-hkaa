"use client";
import "@/app/globals.css";
import MainLayout from "@/components/layout/main/MainLayout.template";
import React, { PropsWithChildren } from "react";

const AdminInstancesPageLayout: React.FC<PropsWithChildren> = (props) => {
	return <MainLayout userType="admin">{props.children}</MainLayout>;
};

export default AdminInstancesPageLayout;
