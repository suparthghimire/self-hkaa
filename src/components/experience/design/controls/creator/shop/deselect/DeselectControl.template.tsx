import ExperienceIconButton from "@/components/experience/design/common/IconButton";
import { useExperience } from "@/lib/providers/experience/Experience.provider";
import { IconCheck } from "@tabler/icons-react";

const Deselect = () => {
	const {
		sendDeselected,
		asset: { selected },
	} = useExperience();
	return (
		<>
			<ExperienceIconButton
				color="blue.1"
				onClick={() => {
					if (!selected) return;
					sendDeselected(selected);
				}}
			>
				<IconCheck />
			</ExperienceIconButton>
		</>
	);
};

export default Deselect;
