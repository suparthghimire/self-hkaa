import Save from "@/components/experience/design/controls/creator/save/SaveControl.template";
import Settings from "@/components/experience/design/controls/creator/settings/Settings.template";
import { getMarginStyle } from "../ExperienceUI";

const CreatorUI = () => {
	return (
		<>
			<div className="absolute" style={getMarginStyle("top", "right")}>
				<Save />
			</div>
			<div className="absolute" style={getMarginStyle("bottom", "right")}>
				<Settings />
			</div>
		</>
	);
};

export default CreatorUI;
