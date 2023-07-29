import Leave from "@/components/experience/design/controls/leave/LeaveControl.template";
import { getMarginStyle } from "../ExperienceUI";

const CommonUI = () => {
	return (
		<>
			<div className="absolute" style={getMarginStyle("top", "left")}>
				<Leave />
			</div>
		</>
	);
};

export default CommonUI;
