"use client";
import Logo from "@/components/common/Logo.template";
import AssetLibraryControl from "@/components/experience/design/controls/assetLibrary/AssetLibrary.template";
import {
	HEADER_HEIGHT,
	MAIN_PADDING_X,
	MAIN_PADDING_Y,
	SHOP_PATH,
} from "@/lib/data/constants";
import { T_UserType } from "@app/types";
import { Header, UnstyledButton } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";
type T_Props = {
	userType: T_UserType;
};

const NavbarTemplate: React.FC<T_Props> = (props) => {
	const pathname = usePathname();
	const router = useRouter();
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
					<UnstyledButton
						onClick={() => router.push("/admin")}
						className={`text-[28px] py-5 uppercase ${
							pathname !== SHOP_PATH
								? "border-b-4 border-blue-500 border-solid font-[500]"
								: ""
						}`}
					>
						Instances
					</UnstyledButton>
					<UnstyledButton
						onClick={() => router.push("/admin/shop")}
						className={`text-[28px] py-5 uppercase ${
							pathname === SHOP_PATH
								? "border-b-4 border-blue-500 border-solid font-[500]"
								: ""
						}`}
					>
						Shops
					</UnstyledButton>
				</div>
			)}
			{props.userType === "admin" && <AssetLibraryControl />}
		</Header>
	);
};

export default NavbarTemplate;
