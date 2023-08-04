import ConfirmationModal from "@/components/common/ConfirmationModal";
import useCustomPagination from "@/lib/hooks/useCustomPagination";
import { T_LibraryAsset } from "@api/types";
import { Button, Pagination, Text, TextInput, rem } from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";
import React, { useState } from "react";

type T_Props = {
	setAssetId: (id: number) => void;
	assets: T_LibraryAsset[];
};

const LibraryAsset: React.FC<T_Props> = (props) => {
	const [removeAsset, setRemoveAsset] = useState<{
		open: boolean;
		asset: T_LibraryAsset | null;
	}>({
		open: false,
		asset: null,
	});

	const pagination = useCustomPagination({
		data: props.assets,
		limit: 5,
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
					{pagination.data.map((asset, idx) => (
						<AssetItem
							onClick={() => props.setAssetId(asset.id)}
							onRemove={() => {
								setRemoveAsset(() => ({
									open: true,
									asset: asset,
								}));
							}}
							key={`asset-item-${idx}`}
							asset={asset}
						/>
					))}
				</div>
			</div>
			<div className="grid place-items-center">
				<Pagination
					total={pagination.totalPages}
					{...pagination.pagination}
					onChange={(page) => {
						pagination.pagination.setPage(page);
					}}
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
	onClick: () => void;
};

const AssetItem: React.FC<T_AssetItemProps> = (props) => {
	const [isHover, setIsHover] = useState(false);

	return (
		<>
			<div
				className="grid gap-[8px] w-[127px] relative cursor-pointer"
				onMouseEnter={() => setIsHover(true)}
				onMouseLeave={() => setIsHover(false)}
				onClick={props.onClick}
			>
				<div
					className="w-full h-[108px] relative rounded-[8px]"
					style={{
						border: "1px solid #ededed",
					}}
				>
					<img
						className="object-cover object-center w-full h-full rounded-[6px]"
						src={props.asset.thumb}
						alt={props.asset.name}
					/>
				</div>
				<Text
					size={rem(16)}
					weight={400}
					className="leading-[24px] text-center"
				>
					{props.asset.name}
				</Text>

				<Button
					className={`absolute top-[4px] right-[4px] ${
						isHover ? "block" : "hidden"
					}`}
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
		</>
	);
};

export default LibraryAsset;
