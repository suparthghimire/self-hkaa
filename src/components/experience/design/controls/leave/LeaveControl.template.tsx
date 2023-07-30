import { useExperience } from "@/lib/providers/experience/Experience.provider";
import { IconLogout2 } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import ButtonExperience from "../../common/Button";
const Save: React.FC = () => {
	const {
		roomInfo: { leaveUrl },
	} = useExperience();
	return (
		<>
			<Link href={leaveUrl}>
				<ButtonExperience leftIcon={<IconLogout2 />}>
					Back to Instances
				</ButtonExperience>
			</Link>
		</>
	);
};

export default Save;
