import { useExperience } from "@/lib/providers/experience/Experience.provider";
import { IconMicrophone, IconMicrophoneOff } from "@tabler/icons-react";
import ExperienceIconButton from "../../common/IconButton";
const Microphone = () => {
	const {
		audio: { micEnabled },
		toggleMic,
	} = useExperience();
	return (
		<>
			<ExperienceIconButton
				color={`${micEnabled ? "blue.1" : "gray.7"}`}
				onClick={toggleMic}
			>
				{micEnabled ? <IconMicrophone /> : <IconMicrophoneOff />}
			</ExperienceIconButton>
		</>
	);
};

export default Microphone;
