import MainLayout from "@/components/layout/main/MainLayout.template";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import React, { PropsWithChildren } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "HKAA",
	description: "Frontend for HKAA",
};

const RootLayout: React.FC<PropsWithChildren> = (props) => {
	return (
		<html lang="en">
			<body className={inter.className}>
				<MainLayout>{props.children}</MainLayout>
			</body>
		</html>
	);
};

export default RootLayout;
