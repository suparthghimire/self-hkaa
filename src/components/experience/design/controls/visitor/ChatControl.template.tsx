import { Modal, rem } from "@mantine/core";
import { IconMessageCircle } from "@tabler/icons-react";
import { useState } from "react";
import { MARGIN } from "../../UI/ExperienceUI";
import ExperienceIconButton from "../../common/IconButton";
import ChatPanel from "../../panels/ChatPanel.template";
const Chat = () => {
	const [showChat, setShowChat] = useState(false);
	return (
		<>
			<Modal
				opened={showChat}
				onClose={() => setShowChat(false)}
				withCloseButton={false}
				size={rem(350)}
				overlayProps={{
					opacity: 0,
					blur: 0,
				}}
				radius={20}
				padding={rem(24)}
				styles={{
					content: {
						bottom: rem(100),
						position: "absolute",
						right: MARGIN,
					},
				}}
			>
				<ChatPanel />
			</Modal>
			<ExperienceIconButton onClick={() => setShowChat(true)}>
				<IconMessageCircle />
			</ExperienceIconButton>
		</>
	);
};

export default Chat;
