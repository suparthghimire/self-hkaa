import Speaker from "@/components/experience/design/controls/visitor/SpeakerControl.template";
import { useState } from "react";
import ChangeNameModal from "../../controls/visitor/ChangeNameModal.template";
import Chat from "../../controls/visitor/ChatControl.template";
import User from "../../controls/visitor/UserControl";
import { getMarginStyle } from "../ExperienceUI";
const VisitorUI = () => {
	const [showNameChangeModal, setShowNameChangeModal] = useState(true);
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

			<ChangeNameModal
				onClose={() => setShowNameChangeModal(false)}
				opened={showNameChangeModal}
				type="create"
			/>
		</>
	);
};

export default VisitorUI;
