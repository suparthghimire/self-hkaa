import Speaker from "@/components/experience/design/controls/visitor/SpeakerControl.template";
import { useState } from "react";
import Camera from "../../controls/creator/camera/CameraControl";
import Help from "../../controls/help/HelpControl";
import Chat from "../../controls/visitor/ChatControl.template";
import Microphone from "../../controls/visitor/MicControl.template";
import User from "../../controls/visitor/UserControl";
import { getMarginStyle } from "../ExperienceUI";
const VisitorUI = () => {
	const [showNameChangeModal, setShowNameChangeModal] = useState(true);
	return (
		<>
			<div className="absolute" style={getMarginStyle("bottom", "left")}>
				<div className="flex gap-3">
					<Speaker />
					<Microphone />
				</div>
			</div>
			<div className="absolute" style={getMarginStyle("bottom", "right")}>
				<div className="flex gap-3">
					<Camera />
					<Help />
					<User />
					<Chat />
				</div>
			</div>
		</>
	);
};

export default VisitorUI;
