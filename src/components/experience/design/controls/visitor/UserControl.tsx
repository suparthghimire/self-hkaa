import { IconUser } from "@tabler/icons-react";
import { useState } from "react";
import ExperienceIconButton from "../../common/IconButton";
import ChangeNameModal from "./ChangeNameModal.template";

const User = () => {
	const [showNameChangeModal, setShowNameChangeModal] = useState(false);

	return (
		<>
			<ChangeNameModal
				opened={showNameChangeModal}
				onClose={() => setShowNameChangeModal(false)}
				type="update"
			/>
			<ExperienceIconButton onClick={() => setShowNameChangeModal(true)}>
				<IconUser />
			</ExperienceIconButton>
		</>
	);
};

export default User;
