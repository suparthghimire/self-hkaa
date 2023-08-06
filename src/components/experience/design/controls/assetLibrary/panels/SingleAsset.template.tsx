import { T_LibraryAsset } from "@api/types";
import { Badge, Box, Text } from "@mantine/core";
import React from "react";

type T_Props = {
	asset: T_LibraryAsset;
};

const SingleAsset: React.FC<T_Props> = (props) => {
	return (
		<div className="w-full h-full flex items-start justify-center gap-[32px]">
			<Box className="w-[256px] h-[291px] rounded-[8px]" bg="gray.2">
				<img
					src={props.asset.thumb}
					className="object-contain w-full h-full object-center rounded-[8px]"
				/>
			</Box>
			<div className="w-[327px] grid gap-[24px] text-justify">
				<Text size={22} weight={600} className="mb-[8px]">
					{props.asset.name}
				</Text>
				<Text size={16} weight={400} className="mb-[8px]">
					{props.asset.description}
				</Text>
				<div className="flex items-start gap-[4px]">
					<Text weight={600}>Tags:</Text>
					<div className="flex items-start gap-[4px]">
						{(JSON.parse(props.asset.tags) as string[]).map((item, idx) => (
							<Badge
								key={`single-tag-${item}-${idx}`}
								color="gray.9"
								variant="filled"
							>
								{item}
							</Badge>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SingleAsset;
