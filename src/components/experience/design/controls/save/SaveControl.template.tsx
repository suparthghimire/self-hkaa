import { useExperience } from "@/lib/providers/experience/Experience.provider";
import { IconLogout2 } from "@tabler/icons-react";
import React from "react";
import ButtonExperience from "../../common/Button";
const Save: React.FC = () => {
	const {
		info: { leaveUrl },
	} = useExperience();
	return (
		<>
			<ButtonExperience leftIcon={<IconLogout2 />}>Save</ButtonExperience>
		</>
	);
};

export default Save;
