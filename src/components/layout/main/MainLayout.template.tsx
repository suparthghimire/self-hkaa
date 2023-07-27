"use client";
import NavbarTemplate from "@/components/partials/Navbar.template";
import { MAIN_PADDING_X } from "@/lib/data/constants";
import { T_UserType } from "@app/types";
import { AppShell, Box } from "@mantine/core";
import { PropsWithChildren } from "react";

type T_Props = PropsWithChildren & {
	userType: T_UserType;
};

const MainLayout: React.FC<T_Props> = (props) => {
	return (
		<AppShell padding={0} header={<NavbarTemplate userType={props.userType} />}>
			<Box
				px={MAIN_PADDING_X}
				className="w-full h-full bg-neutral-100 grid place-items-center"
			>
				{props.children}
			</Box>
		</AppShell>
	);
};

export default MainLayout;
