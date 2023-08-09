import Button from "@/components/common/Button";
import Title from "@/components/common/Title";
import { GetAllLibraryAssets } from "@/lib/api/api";
import { useAuth } from "@/lib/providers/Auth/AuthProvider";
import { useExperience } from "@/lib/providers/experience/Experience.provider";
import { T_LibraryAsset } from "@api/types";
import { Modal, ModalProps, Tabs, rem } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import StyledTabs from "../../common/StyledTabs.template";
import LibraryAsset from "./panels/LibraryAsset.template";
import SingleAsset from "./panels/SingleAsset.template";
import UploadAsset from "./panels/UploadAsset.template";

type T_Props = ModalProps & {
	assetSelectable?: boolean;
};

const AssetLibrary: React.FC<T_Props> = (props) => {
	const [asset, setAsset] = useState<T_LibraryAsset<number> | undefined>(
		undefined
	);

	const { dropAsset } = useExperience();

	const { auth } = useAuth();
	const libraryAssets = useQuery({
		queryKey: ["libraryAssets"],
		queryFn: () => GetAllLibraryAssets(auth.user?.token ?? ""),
	});

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
								<Tabs.Tab value="library	">Choose from Library</Tabs.Tab>
								<Tabs.Tab value="upload">Upload Asset</Tabs.Tab>
							</Tabs.List>
							<div className="grid gap-[32px] h-full w-full">
								<Tabs.Panel value="library">
									<div className="h-full flex flex-col justify-between">
										{!asset ? (
											<>
												{libraryAssets.data && (
													<LibraryAsset
														setAsset={setAsset}
														refetch={libraryAssets.refetch}
														assets={libraryAssets.data.data.assets}
													/>
												)}
												{libraryAssets.isLoading && (
													<div className="grid w-full h-full place-items-center">
														Loading Assets
													</div>
												)}
												{libraryAssets.isError && (
													<div className="grid w-full h-full place-items-center">
														Error while loading assets
													</div>
												)}
											</>
										) : (
											<SingleAsset asset={asset} />
										)}
										<div className="flex items-center justify-center gap-[48px]">
											{asset ? (
												<>
													<Button
														variant="outline"
														onClick={() => setAsset(undefined)}
													>
														Back
													</Button>
													{props.assetSelectable && (
														<Button
															onClick={() => {
																dropAsset({
																	...asset,
																	id: asset.id.toString(),
																	dbid: -1,
																});
																props.onClose();
															}}
														>
															Select
														</Button>
													)}
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
