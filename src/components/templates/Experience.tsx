import { T_Modes } from "@/lib/data/constants";
import { useExperience } from "@/lib/providers/experience/Experience.provider";
import { Button, Modal } from "@mantine/core";
import React from "react";
type T_Props = {
	mode: T_Modes;
};
const Experience: React.FC<T_Props> = (props) => {
	const { isOpen, closeExperience, info } = useExperience();
	return (
		<Modal
			opened={isOpen}
			onClose={closeExperience}
			fullScreen
			withCloseButton={false}
		>
			Load Experience with room id {info.roomId} in {props.mode}
			<Button onClick={closeExperience}>Close Experience</Button>
		</Modal>
	);
};

export default Experience;
