import ConfirmationModal from "@/components/common/ConfirmationModal";
import { DeleteLibraryAsset } from "@/lib/api/api";
import useCustomPagination from "@/lib/hooks/useCustomPagination";
import useShowStatusNotification from "@/lib/hooks/useShowStatusNotification";
import { useAuth } from "@/lib/providers/Auth/AuthProvider";
import { T_LibraryAsset } from "@api/types";
import { Button, Pagination, Text, TextInput, rem } from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";

type T_Props = {
	setAsset: (asset: T_LibraryAsset) => void;
	assets: T_LibraryAsset[];
	refetch: () => void;
};

const LibraryAsset: React.FC<T_Props> = (props) => {
	const [removeAsset, setRemoveAsset] = useState<{
		open: boolean;
		assetId: number;
	}>({
		open: false,
		assetId: -1,
	});

	const { auth } = useAuth();
	const deleteAsset = useMutation({
		mutationFn: (id: number) => DeleteLibraryAsset(auth.user?.token ?? "", id),
		onSuccess: () => {
			pagination.pagination.setPage(1);
			setRemoveAsset({
				open: false,
				assetId: -1,
			});
			props.refetch();
		},
	});

	const pagination = useCustomPagination({
		data: props.assets,
		limit: 5,
	});

	useShowStatusNotification({
		error: {
			status: deleteAsset.isError,
			text: "Error while deleting asset",
		},
		loading: {
			status: deleteAsset.isLoading,
			text: "Processing",
		},
		success: {
			status: deleteAsset.isSuccess,
			text: "Asset deleted successfully",
		},
	});

	return (
		<div className="h-full">
			{pagination.data.length <= 0 && (
				<div className="grid h-full place-items-center">
					<Text align="center">No Assets Found</Text>
				</div>
			)}

			{pagination.data.length > 0 && (
				<div className="h-full flex flex-col gap-[32px]">
					<TextInput
						icon={<IconSearch />}
						placeholder="Search for Asset"
						className="w-full"
					/>
					<div className="grid gap-[4px]">
						{pagination.data.length > 0 && (
							<Text size={rem(14)} weight={500} className="leading-[24px]">
								SELECT AN ASSET
							</Text>
						)}
						<div className="grid grid-cols-5 gap-[30px]">
							{pagination.data.length > 0 &&
								pagination.data.map((asset, idx) => (
									<AssetItem
										onClick={() => props.setAsset(asset)}
										onRemove={() => {
											setRemoveAsset(() => ({
												open: true,
												assetId: asset.id,
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
								assetId: -1,
							}));
						}}
						onYes={() => {
							deleteAsset.mutate(removeAsset.assetId);
						}}
						onCancel={() => {
							setRemoveAsset(() => ({
								open: false,
								assetId: -1,
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
			)}
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
			>
				<div
					className="w-full h-[108px] relative rounded-[8px]"
					style={{
						border: "1px solid #ededed",
					}}
					onClick={props.onClick}
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
					variant="filled"
					color="red.5"
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
