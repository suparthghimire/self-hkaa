import { useDisclosure } from "@mantine/hooks";
import { IconUser } from "@tabler/icons-react";
import ExperienceIconButton from "../../common/IconButton";
import AvatarPanel from "././AvatarPanel";

const User = () => {
	const [avatarOpen, { open: openAvatar, close: closeAvatar }] =
		useDisclosure(true);
	return (
		<>
			<AvatarPanel opened={avatarOpen} onClose={closeAvatar} />
			<ExperienceIconButton onClick={openAvatar}>
				<IconUser />
			</ExperienceIconButton>
		</>
	);
};

export default User;
