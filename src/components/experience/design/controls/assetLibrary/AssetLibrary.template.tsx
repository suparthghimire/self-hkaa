import Button from "@/components/common/Button";
import Title from "@/components/common/Title";
import { FONT_FAMILY } from "@/lib/data/constants";
import { MantineTheme, Modal, Tabs, TabsProps, rem } from "@mantine/core";
import { IconFolder } from "@tabler/icons-react";
import { useState } from "react";
import LibraryAsset from "./panels/LibraryAsset.template";
import UploadAsset from "./panels/UploadAsset.template";

function StyledTabs(props: TabsProps) {
	return (
		<Tabs
			unstyled
			styles={(theme: MantineTheme) => ({
				root: {
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				},
				tab: {
					border: 0,
					backgroundColor: "transparent",
					fontSize: "20px",
					fontWeight: 500,
					cursor: "pointer",
					padding: 0,
					paddingBottom: "8px",
					fontFamily: FONT_FAMILY,

					"&[data-active]": {
						borderBottom: `3px solid ${theme.colors.blue[0]}`,
						fontWeight: 600,
					},
				},
				tabsList: {
					display: "inline-flex",
					gap: "80px",
				},
			})}
			{...props}
		/>
	);
}

const AssetLibraryControl = () => {
	const [openAssetLibrary, setOpenAssetLibrary] = useState(false);
	return (
		<>
			<Button
				color="gray.8"
				leftIcon={<IconFolder />}
				onClick={() => setOpenAssetLibrary(true)}
			>
				Asset Library
			</Button>
			<Modal
				size={rem(837)}
				centered
				opened={openAssetLibrary}
				onClose={() => setOpenAssetLibrary(false)}
				radius={rem(16)}
				padding={rem(40)}
			>
				<div className="flex h-[600px] flex-col justify-between">
					<div className="grid gap-[40px]">
						<Title>Asset Library</Title>
						<StyledTabs defaultValue="library">
							<Tabs.List className="mb-6" grow>
								<Tabs.Tab value="library">Choose from Library</Tabs.Tab>
								<Tabs.Tab value="upload">Upload Asset</Tabs.Tab>
							</Tabs.List>
							<div className="grid gap-[32px] w-full">
								<Tabs.Panel value="library" className="w-full">
									<LibraryAsset />
								</Tabs.Panel>
								<Tabs.Panel value="upload">
									<UploadAsset />
								</Tabs.Panel>
							</div>
						</StyledTabs>
					</div>
					<div className="grid place-items-center">
						<Button onClick={() => setOpenAssetLibrary(false)}>Done</Button>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default AssetLibraryControl;
