import PlaceholderImage from "@/assets/placeholder.svg";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import { T_LibraryAsset } from "@api/types";
import { Button, Pagination, Text, TextInput, rem } from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";
import Image from "next/image";
import React, { useState } from "react";
const LibraryAsset: React.FC = () => {
	const [removeAsset, setRemoveAsset] = useState<{
		open: boolean;
		asset: T_LibraryAsset | null;
	}>({
		open: false,
		asset: null,
	});
	return (
		<div className="grid gap-[32px]">
			<TextInput
				icon={<IconSearch />}
				placeholder="Search for Asset"
				className="w-full"
			/>

			<div className="grid gap-[4px]">
				<Text size={rem(14)} weight={500} className="leading-[24px]">
					SELECT AN ASSET
				</Text>
				<div className="grid grid-cols-5 gap-[30px]">
					{[1, 2, 3, 4, 5].map((item, idx) => (
						<AssetItem
							onRemove={() => {
								setRemoveAsset(() => ({
									open: true,
									asset: {
										image: PlaceholderImage,
										title: "Lorem ipsum",
									},
								}));
							}}
							key={`asset-item-${idx}`}
							asset={{
								image: PlaceholderImage,
								title: "Lorem ipsum",
							}}
						/>
					))}
				</div>
			</div>
			<div className="grid place-items-center">
				<Pagination
					total={10}
					styles={{
						control: {
							":hover": {
								backgroundColor: "#000",
							},
							"&[data-active]": {
								backgroundColor: "#000",
							},
						},
					}}
				/>
			</div>
			<ConfirmationModal
				opened={removeAsset.open}
				onClose={() => {
					setRemoveAsset(() => ({
						open: false,
						asset: null,
					}));
				}}
				onYes={() => {
					setRemoveAsset(() => ({
						open: false,
						asset: null,
					}));
				}}
				onCancel={() => {
					setRemoveAsset(() => ({
						open: false,
						asset: null,
					}));
				}}
			>
				<div className="grid place-items-center mb-[46px]">
					<p className="text-center">
						Deleting this asset from the library will also delete <br />
						all 3D models of this asset in all instances.
					</p>
					<p>Do you want to proceed?</p>
				</div>
			</ConfirmationModal>
		</div>
	);
};
type T_AssetItemProps = {
	asset: T_LibraryAsset;
	onRemove: () => void;
};

const AssetItem: React.FC<T_AssetItemProps> = (props) => {
	return (
		<div className="grid gap-[8px] w-[127px] relative">
			<div className="w-full h-[108px] relative">
				<Image
					className="object-cover w-full h-full rounded-[6px]"
					fill
					src={props.asset.image}
					alt={props.asset.title}
				/>
			</div>
			<Text size={rem(16)} weight={400} className="leading-[24px] text-center">
				{props.asset.title}
			</Text>

			<Button
				className="absolute top-[4px] right-[4px]"
				variant="transparent"
				p={2}
				radius={rem(20)}
				styles={() => ({
					root: {
						border: "2px solid #000",
						width: "20px",
						height: "20px",
					},
				})}
				onClick={() => props.onRemove()}
			>
				<IconX />
			</Button>
		</div>
	);
};

export default LibraryAsset;
