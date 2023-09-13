import { Center } from "@mantine/core";
import { PropsWithChildren } from "react";

const ExperienceError: React.FC<PropsWithChildren> = (props) => {
	return (
		<Center className="absolute top-0 left-0 grid place-items-center w-screen h-screen">
			{props.children}
		</Center>
	);
};

export default ExperienceError;
