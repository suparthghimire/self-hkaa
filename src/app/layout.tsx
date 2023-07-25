import "@/app/globals.css";
import RootProvider from "@/lib/providers/RootProvider";
import { Roboto_Condensed } from "next/font/google";
import React, { PropsWithChildren } from "react";

const roboto = Roboto_Condensed({
	subsets: ["latin"],
	weight: "400",
});

export const metadata = {
	title: "HKAA",
	description: "Frontend for HKAA",
	icons: [
		{
			rel: "icon",
			url: "/favicon/favicon.ico",
		},
	],
};

const RootLayout: React.FC<PropsWithChildren> = (props) => {
	return (
		<html lang="en">
			<body className={roboto.className}>
				<RootProvider>{props.children}</RootProvider>
			</body>
		</html>
	);
};

export default RootLayout;
