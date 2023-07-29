import Button from "@/components/common/Button";
import { Modal, Text, TextInput, rem } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import { useState } from "react";
import ExperienceIconButton from "../../common/IconButton";

const User = () => {
	const [showNameChangeModal, setShowNameChangeModal] = useState(false);

	return (
		<>
			<Modal
				opened={showNameChangeModal}
				onClose={() => setShowNameChangeModal(false)}
				size="626px"
				centered
				radius={18}
				padding={rem(60)}
				withCloseButton={false}
			>
				<div className="grid place-items-center">
					<div className="grid place-items-center gap-[40px] w-[340px]">
						<Text size={28} weight={700}>
							Update display name
						</Text>
						<TextInput className="w-full" placeholder="Enter your nickname" />
						<Button onClick={() => setShowNameChangeModal(false)}>Done</Button>
					</div>
				</div>
			</Modal>
			<ExperienceIconButton onClick={() => setShowNameChangeModal(true)}>
				<IconUser />
			</ExperienceIconButton>
		</>
	);
};

export default User;
