import "@/app/globals.css";
import MainLayout from "@/components/layout/main/MainLayout.template";
import React, { PropsWithChildren } from "react";

const RootLayout: React.FC<PropsWithChildren> = (props) => {
	return <MainLayout type="user">{props.children}</MainLayout>;
};

export default RootLayout;
