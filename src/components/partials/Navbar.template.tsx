import Logo from "@/components/common/Logo.template";
import {
	HEADER_HEIGHT,
	MAIN_PADDING_X,
	MAIN_PADDING_Y,
} from "@/lib/data/constants";
import { Header } from "@mantine/core";

const NavbarTemplate = () => {
	return (
		<Header
			height={HEADER_HEIGHT}
			px={MAIN_PADDING_X}
			py={MAIN_PADDING_Y}
			className="bg-gray-0 flex items-center justify-between"
		>
			<Logo />
		</Header>
	);
};

export default NavbarTemplate;
