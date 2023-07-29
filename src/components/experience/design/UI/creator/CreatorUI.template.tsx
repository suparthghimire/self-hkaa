import Save from "@/components/experience/design/controls/save/SaveControl.template";
import { getMarginStyle } from "../ExperienceUI";

const CreatorUI = () => {
	return (
		<>
			<div className="absolute" style={getMarginStyle("top", "right")}>
				<Save />
			</div>
		</>
	);
};

export default CreatorUI;
