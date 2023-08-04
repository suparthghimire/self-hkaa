import CustomButton from "@/components/common/Button";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import ExperienceIconButton from "@/components/experience/design/common/IconButton";
import { Button, Drawer, Text, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconAdjustmentsHorizontal } from "@tabler/icons-react";
import InputControl from "./InputControl.template";

const AssetHandle = () => {
	const [drawerOpened, { open: openDrawer, close: closeDrawer }] =
		useDisclosure(false);
	const [
		revertModalOpened,
		{ open: openRevertConfirm, close: closeRevertConfirm },
	] = useDisclosure(false);

	return (
		<>
			<Drawer
				opened={drawerOpened}
				onClose={closeDrawer}
				position="right"
				overlayProps={{
					blur: 0,
					opacity: 0,
				}}
				padding={rem(40)}
				closeButtonProps={{
					iconSize: rem(24),
					color: "gray.9",
				}}
				styles={() => ({
					header: {
						height: "fit-content",
					},
					content: {
						display: "grid",
						gridTemplateRows: "100px 1fr",
					},

					body: {
						height: "100%",
					},
				})}
			>
				<div className="h-full flex-col flex justify-between">
					<div className="w-full">
						<Text size={22} weight={400}>
							Asset Positioning
						</Text>
						<div className="grid mt-[48px] gap-[48px]">
							<div className="grid gap-[12px]">
								<InputControl label="Vertical" />
								<InputControl label="Horizontal A" />
								<InputControl label="Horizontal A" />
							</div>
							<div className="grid gap-[12px]">
								<InputControl label="Rotate" />
								<InputControl label="Size" />
							</div>
							<div className="grid cursor-pointer">
								<Button
									variant="transparent"
									p={0}
									className="underline w-fit"
									onClick={openRevertConfirm}
									styles={() => ({
										root: {
											fontWeight: 400,
											fontSize: rem(16),
										},
									})}
								>
									Reset to default state
								</Button>
							</div>
						</div>
					</div>
					<div className="w-full grid place-items-center">
						<CustomButton onClick={closeDrawer}>Done</CustomButton>
					</div>
				</div>
			</Drawer>

			<ConfirmationModal
				opened={revertModalOpened}
				onClose={closeRevertConfirm}
				onYes={closeRevertConfirm}
				onCancel={closeRevertConfirm}
			>
				<Text size={22} weight={500} mb={rem(48)}>
					Revert this asset to its default size and position?
				</Text>
			</ConfirmationModal>

			<ExperienceIconButton color="blue.1" onClick={openDrawer}>
				<IconAdjustmentsHorizontal />
			</ExperienceIconButton>
		</>
	);
};

export default AssetHandle;
