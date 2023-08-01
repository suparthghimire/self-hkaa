import Button from "@/components/common/Button";
import Title from "@/components/common/Title";
import { Modal, Tabs, rem } from "@mantine/core";
import { IconFolder } from "@tabler/icons-react";
import { useState } from "react";
import StyledTabs from "../../common/StyledTabs.template";
import LibraryAsset from "./panels/LibraryAsset.template";
import UploadAsset from "./panels/UploadAsset.template";

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
