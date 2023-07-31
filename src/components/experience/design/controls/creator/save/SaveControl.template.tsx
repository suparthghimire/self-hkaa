import { useExperience } from "@/lib/providers/experience/Experience.provider";
import { Modal, rem } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import React, { useState } from "react";
import ButtonExperience from "../../../common/Button";
import SaveInstancePanel from "../../../panels/SaveInstancePanel.template";
const Save: React.FC = () => {
	const {
		roomInfo: { leaveUrl },
		setSaveStatus,
	} = useExperience();

	const [showSavePanel, setShowSavePanel] = useState(false);
	return (
		<>
			<Modal
				onClose={() => {
					setShowSavePanel(false);
					setSaveStatus("idle");
				}}
				size="758px"
				opened={showSavePanel}
				padding={rem(40)}
				withCloseButton={false}
				centered
				radius={16}
			>
				<SaveInstancePanel
					closeSavePanel={() => {
						setShowSavePanel(false);
						setSaveStatus("idle");
					}}
				/>
			</Modal>
			<ButtonExperience
				onClick={() => setShowSavePanel(true)}
				leftIcon={<IconUpload />}
			>
				Save
			</ButtonExperience>
		</>
	);
};

export default Save;
