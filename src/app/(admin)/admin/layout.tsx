import "@/app/globals.css";
import MainLayout from "@/components/layout/main/MainLayout.template";
import React, { PropsWithChildren } from "react";

const AdminPageLayout: React.FC<PropsWithChildren> = (props) => {
	return <MainLayout type="admin">{props.children}</MainLayout>;
};

export default AdminPageLayout;
