import Button from "@/components/common/Button";
import Title from "@/components/common/Title";
import { Modal, ModalProps, Tabs, rem } from "@mantine/core";
import React, { useState } from "react";
import StyledTabs from "../../common/StyledTabs.template";
import LibraryAsset from "./panels/LibraryAsset.template";
import SingleAsset from "./panels/SingleAsset.template";
import UploadAsset from "./panels/UploadAsset.template";

type T_Props = ModalProps & {
	showSingleAsset?: boolean;
};

const AssetLibrary: React.FC<T_Props> = (props) => {
	const [assetId, setAssetId] = useState<string | undefined>(undefined);
	return (
		<>
			<Modal
				size={rem(837)}
				centered
				radius={rem(16)}
				padding={rem(40)}
				{...props}
			>
				<div className="h-[600px]">
					<div className="grid gap-[40px] grid-rows-[40px_1fr] h-full">
						<Title>Asset Library</Title>
						<StyledTabs defaultValue="library">
							<Tabs.List className="mb-6" grow>
								<Tabs.Tab value="library">Choose from Library</Tabs.Tab>
								<Tabs.Tab value="upload">Upload Asset</Tabs.Tab>
							</Tabs.List>
							<div className="grid gap-[32px] h-full w-full">
								<Tabs.Panel value="library">
									<div className="h-full flex flex-col justify-between">
										{!assetId ? (
											<LibraryAsset
												setAssetId={
													props.showSingleAsset ? setAssetId : () => {}
												}
											/>
										) : (
											<SingleAsset />
										)}
										<div className="flex items-center justify-center gap-[48px]">
											{assetId ? (
												<>
													<Button
														variant="outline"
														onClick={() => setAssetId(undefined)}
													>
														Back
													</Button>
													<Button onClick={props.onClose}>Select</Button>
												</>
											) : (
												<Button onClick={props.onClose}>Done</Button>
											)}
										</div>
									</div>
								</Tabs.Panel>
								<Tabs.Panel value="upload">
									<div className="h-full">
										<UploadAsset onDone={props.onClose} />
									</div>
								</Tabs.Panel>
							</div>
						</StyledTabs>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default AssetLibrary;
