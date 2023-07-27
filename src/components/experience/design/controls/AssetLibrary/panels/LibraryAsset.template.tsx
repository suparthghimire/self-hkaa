import PlaceholderImage from "@/assets/placeholder.svg";
import { T_LibraryAsset } from "@api/types";
import { Button, Pagination, Text, TextInput, rem } from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";
const LibraryAsset: React.FC = () => {
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
					<AssetItem
						asset={{
							image: PlaceholderImage,
							title: "Lorem ipsum",
						}}
					/>
					<AssetItem
						asset={{
							image: PlaceholderImage,
							title: "Lorem ipsum",
						}}
					/>
					<AssetItem
						asset={{
							image: PlaceholderImage,
							title: "Lorem ipsum",
						}}
					/>
					<AssetItem
						asset={{
							image: PlaceholderImage,
							title: "Lorem ipsum",
						}}
					/>
					<AssetItem
						asset={{
							image: PlaceholderImage,
							title: "Lorem ipsum",
						}}
					/>
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
		</div>
	);
};
type T_AssetItemProps = {
	asset: T_LibraryAsset;
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
			>
				<IconX />
			</Button>
		</div>
	);
};

export default LibraryAsset;
