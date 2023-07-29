import { Modal, Switch, rem } from "@mantine/core";
import { IconVolume } from "@tabler/icons-react";
import { useState } from "react";
import { MARGIN } from "../../UI/ExperienceUI";
import ExperienceIconButton from "../../common/IconButton";
const Speaker = () => {
	const [showSpeakerOptions, setShowSpeakerOptions] = useState(false);
	return (
		<>
			<Modal
				opened={showSpeakerOptions}
				onClose={() => setShowSpeakerOptions(false)}
				title="Audio Settings"
				size="500px"
				overlayProps={{
					opacity: 0,
					blur: 0,
				}}
				radius={20}
				pb={0}
				styles={{
					content: {
						bottom: rem(100),
						position: "absolute",
						left: MARGIN,
					},
				}}
			>
				<div className="flex items-center justify-start items-center gap-[12px]">
					<CustomSwitch />
					<p>Microphone</p>
				</div>
				<div className="flex items-center justify-start items-center gap-[12px]">
					<CustomSwitch />
					<p>Instance Sounds</p>
				</div>
				<div className="flex items-center justify-start items-center gap-[12px]">
					<CustomSwitch />
					<p>Voice Chat</p>
				</div>
			</Modal>
			<ExperienceIconButton onClick={() => setShowSpeakerOptions(true)}>
				<IconVolume />
			</ExperienceIconButton>
		</>
	);
};

const CustomSwitch = () => {
	return (
		<Switch
			onLabel="ON"
			offLabel="OFF"
			styles={() => ({
				trackLabel: {
					fontSize: "14px",
				},
				// label: {

				// },
			})}
		/>
	);
};

export default Speaker;
