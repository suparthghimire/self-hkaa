import "@/app/globals.css";
import MainLayout from "@/components/layout/main/MainLayout.template";
import { Roboto_Condensed } from "next/font/google";
import React, { PropsWithChildren } from "react";

const roboto = Roboto_Condensed({
	subsets: ["latin"],
	weight: "400",
});

export const metadata = {
	title: "HKAA",
	description: "Frontend for HKAA",
};

const RootLayout: React.FC<PropsWithChildren> = (props) => {
	return (
		<html lang="en">
			<body className={roboto.className}>
				<MainLayout>{props.children}</MainLayout>
			</body>
		</html>
	);
};

export default RootLayout;
