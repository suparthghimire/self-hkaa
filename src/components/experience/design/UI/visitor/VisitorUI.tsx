import Speaker from "@/components/experience/design/controls/visitor/SpeakerControl.template";
import Chat from "../../controls/visitor/ChatControl.template";
import User from "../../controls/visitor/UserControl";
import { getMarginStyle } from "../ExperienceUI";

const VisitorUI = () => {
	return (
		<>
			<div className="absolute" style={getMarginStyle("bottom", "left")}>
				<Speaker />
			</div>
			<div className="absolute" style={getMarginStyle("bottom", "right")}>
				<div className="flex gap-3">
					<User />
					<Chat />
				</div>
			</div>
		</>
	);
};

export default VisitorUI;
