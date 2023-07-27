import { Text as MantineTitle } from "@mantine/core";
import { PropsWithChildren } from "react";

const Title: React.FC<PropsWithChildren> = (props) => {
	return (
		<MantineTitle
			size="28px"
			weight={400}
			className="leading-[32px] tracking-[-0.28px] capitalize text-center"
		>
			{props.children}
		</MantineTitle>
	);
};

export default Title;
