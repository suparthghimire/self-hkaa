import { Modal, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { IconVideo } from "@tabler/icons-react";
import { MARGIN } from "../../../UI/ExperienceUI";
import ExperienceIconButton from "../../../common/IconButton";
import CameraPanel from "../../../panels/CameraPanel";
const Camera = () => {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<>
			<Modal
				opened={opened}
				onClose={close}
				withCloseButton={false}
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
				<CameraPanel />
			</Modal>
			<ExperienceIconButton onClick={open} color="blue.1">
				<IconVideo />
			</ExperienceIconButton>
		</>
	);
};

export default Camera;
