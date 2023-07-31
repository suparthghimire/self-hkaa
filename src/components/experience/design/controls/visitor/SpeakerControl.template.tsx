import { useExperience } from "@/lib/providers/experience/Experience.provider";
import { Switch } from "@mantine/core";
import { IconVolume, IconVolumeOff } from "@tabler/icons-react";
import ExperienceIconButton from "../../common/IconButton";
const Speaker = () => {
	const {
		audio: { voiceEnabled },
		toggleVoice,
	} = useExperience();
	return (
		<>
			<ExperienceIconButton
				onClick={toggleVoice}
				color={`${voiceEnabled ? "blue.1" : "gray.7"}`}
			>
				{voiceEnabled ? <IconVolume /> : <IconVolumeOff />}
			</ExperienceIconButton>
		</>
	);
};

/**
 * 
 * @OldVariant 
 * 			<Modal
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
				<div className="w-[190px]">
					<div className="flex items-center justify-start items-center gap-[12px]">
						<div className="w-[50px]">
							<CustomSwitch />
						</div>
						<p>Microphone</p>
					</div>
					<div className="flex items-center justify-start items-center gap-[12px]">
						<div className="w-[50px]">
							<CustomSwitch />
						</div>
						<p>Instance Sounds</p>
					</div>
					<div className="flex items-center justify-start items-center gap-[12px]">
						<div className="w-[50px]">
							<CustomSwitch />
						</div>
						<p>Voice Chat</p>
					</div>
				</div>
			</Modal>
 */

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
