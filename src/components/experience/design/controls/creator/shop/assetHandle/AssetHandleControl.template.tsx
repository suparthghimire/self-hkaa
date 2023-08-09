import CustomButton from "@/components/common/Button";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import ExperienceIconButton from "@/components/experience/design/common/IconButton";
import { useExperience } from "@/lib/providers/experience/Experience.provider";
import { Button, Drawer, Text, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
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

	const {
		updateAsset,
		asset: { selected },
	} = useExperience();

	const form = useForm({
		initialValues: {
			z: selected?.position?.at(0) ?? 50,
			x: selected?.position?.at(1) ?? 50,
			y: selected?.position?.at(2) ?? 50,
			rotate: selected?.rotation?.at(0) ?? 0,
			size: selected?.scale?.at(0) ?? 1,
		},
	});

	return (
		<>
			<Drawer
				withOverlay={false}
				opened={drawerOpened}
				onClose={closeDrawer}
				position="right"
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
							{/* <div className="grid gap-[12px]">
								<InputControl
									label="Vertical"
									value={form.values.z}
									onChange={(v) => {
										form.setFieldValue("z", v);
										updateAsset({
											type: "zmove",
											value: v,
										});
									}}
								/>
								<InputControl
									label="Horizontal A"
									value={form.values.x}
									step={0.01}
									onChange={(v) => {
										form.setFieldValue("x", v);
										updateAsset({
											type: "xmove",
											value: v,
										});
									}}
								/>
								<InputControl
									label="Horizontal B"
									value={form.values.y}
									step={0.01}
									onChange={(v) => {
										form.setFieldValue("y", v);
										updateAsset({
											type: "ymove",
											value: v,
										});
									}}
								/>
							</div> */}
							<div className="grid gap-[12px]">
								<InputControl
									label="Rotate"
									value={form.values.z}
									min={-180}
									max={180}
									onChange={(v) => {
										form.setFieldValue("rotate", v);
										updateAsset({
											type: "yrot",
											value: v,
										});
									}}
								/>
								<InputControl
									label="Size"
									min={0.01}
									max={10}
									onChange={(v) => {
										form.setFieldValue("scale", v);
										updateAsset({
											type: "xscale",
											value: v,
										});
									}}
								/>
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
