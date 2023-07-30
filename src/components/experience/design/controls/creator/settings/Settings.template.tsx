import ConfirmationModal from "@/components/common/ConfirmationModal";
import { Button, Modal, rem, Text } from "@mantine/core";
import { IconSettings } from "@tabler/icons-react";
import { useCallback, useState } from "react";

import ExperienceIconButton from "../../../common/IconButton";
import { MARGIN } from "../../../UI/ExperienceUI";
const Settings = () => {
	const [showHotspotWarning, setShowHotspotWarning] = useState(false);
	const [openSettings, setOpenSettings] = useState(false);

	const onClose = useCallback(() => {
		setShowHotspotWarning(false);
		setOpenSettings(false);
	}, []);
	return (
		<>
			<ConfirmationModal
				opened={showHotspotWarning}
				onClose={onClose}
				withCloseButton={false}
				overlayProps={{
					opacity: 0,
					blur: 0,
				}}
				radius={20}
				pb={0}
				centered
				onYes={onClose}
				onCancel={onClose}
			>
				<div className="grid mb-[48px] place-items-center">
					<Text>Media uploaded to all hot spots will be removed.</Text>
					<Text>Are you sure you want to proceed?</Text>
				</div>
			</ConfirmationModal>
			<Modal
				opened={openSettings}
				onClose={onClose}
				withCloseButton={false}
				overlayProps={{
					opacity: 0,
					blur: 0,
				}}
				styles={() => ({
					content: {
						position: "absolute",
						bottom: rem(100),
						right: MARGIN,
					},
				})}
				radius={16}
				padding={rem(16)}
			>
				<Button
					variant="transparent"
					px={rem(20)}
					styles={() => ({
						root: {
							height: "auto",
						},
					})}
					onClick={() => setShowHotspotWarning(true)}
				>
					REMOVE ALL HOTSPOT MEDIA
				</Button>
			</Modal>

			<ExperienceIconButton onClick={() => setOpenSettings(true)}>
				<IconSettings />
			</ExperienceIconButton>
		</>
	);
};

export default Settings;
