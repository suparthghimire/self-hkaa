import Logo from "@/components/common/Logo.template";
import AssetLibraryControl from "@/components/experience/design/controls/assetLibrary/AssetLibrary.template";
import {
	HEADER_HEIGHT,
	MAIN_PADDING_X,
	MAIN_PADDING_Y,
} from "@/lib/data/constants";
import { T_UserType } from "@app/types";
import { Header } from "@mantine/core";
type T_Props = {
	userType: T_UserType;
};

const NavbarTemplate: React.FC<T_Props> = (props) => {
	return (
		<Header
			height={HEADER_HEIGHT}
			px={MAIN_PADDING_X}
			py={MAIN_PADDING_Y}
			className="bg-gray-0 flex items-center justify-between"
		>
			<Logo />
			{props.userType === "admin" && <AssetLibraryControl />}
		</Header>
	);
};

export default NavbarTemplate;
