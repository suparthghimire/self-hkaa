"use client";
import CustomButton from "@/components/common/Button";
import Logo from "@/components/common/Logo.template";
import AssetLibrary from "@/components/experience/design/controls/assetLibrary/AssetLibrary.template";
import {
	HEADER_HEIGHT,
	MAIN_PADDING_X,
	MAIN_PADDING_Y,
	SHOP_PATH,
} from "@/lib/data/constants";
import { useAuth } from "@/lib/providers/Auth/AuthProvider";
import { T_UserType } from "@app/types";
import { Button, ButtonProps, Header } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFolder } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type T_TabButtonProps = ButtonProps &
	React.DOMAttributes<HTMLButtonElement> & {
		status: boolean;
		link: string;
	};

const TabButton: React.FC<T_TabButtonProps> = (props) => {
	return (
		<Link href={props.link}>
			<Button
				variant="transparent"
				radius={0}
				p={0}
				className="text-[28px] py-5 uppercase"
				styles={() => ({
					root: {
						position: "relative",
						height: "auto",
						fontWeight: 400,
						...(props.status && {
							"::after": {
								content: "''",
								position: "absolute",
								bottom: "-8px",
								left: 0,
								width: "100%",
								height: "4px",
								backgroundColor: "#2563EB",
							},
						}),
					},
				})}
			>
				{props.children}
			</Button>
		</Link>
	);
};

type T_Props = {
	userType: T_UserType;
};

const NavbarTemplate: React.FC<T_Props> = (props) => {
	const pathname = usePathname();

	const [openedAssetLibrary, { open, close }] = useDisclosure(false);

	return (
		<Header
			height={HEADER_HEIGHT}
			px={MAIN_PADDING_X}
			py={MAIN_PADDING_Y}
			className="bg-gray-0 flex items-center justify-between"
		>
			<Logo />
			{props.userType === "admin" && (
				<div className="flex gap-[80px] mb-[-10px]">
					<TabButton link="/admin" status={pathname !== SHOP_PATH}>
						Instances
					</TabButton>
					<TabButton link="/admin/shop" status={pathname === SHOP_PATH}>
						Shops
					</TabButton>
				</div>
			)}
			{props.userType === "admin" && (
				<div className="flex gap-2">
					<CustomButton color="gray.8" leftIcon={<IconFolder />} onClick={open}>
						Asset Library
					</CustomButton>
					<LogoutButton />
					<AssetLibrary opened={openedAssetLibrary} onClose={close} />
				</div>
			)}
		</Header>
	);
};

const LogoutButton = () => {
	const {
		auth: { user },
	} = useAuth();

	return <CustomButton>Logout</CustomButton>;
};

export default NavbarTemplate;
