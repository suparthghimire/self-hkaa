import ConfirmationModal from "@/components/common/ConfirmationModal";
import ExperienceIconButton from "@/components/experience/design/common/IconButton";
import { Text, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";

const Delete = () => {
	const [opened, { open, close }] = useDisclosure(false);
	return (
		<>
			<ConfirmationModal
				opened={opened}
				onClose={close}
				onYes={close}
				onCancel={close}
			>
				<Text size={22} weight={500} mb={rem(48)}>
					Are you sure you want to delete this asset?
				</Text>
			</ConfirmationModal>
			<ExperienceIconButton color="blue.1" onClick={open}>
				<IconTrash />
			</ExperienceIconButton>
		</>
	);
};

export default Delete;
