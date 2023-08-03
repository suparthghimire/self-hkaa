import { Badge, Text } from "@mantine/core";
import React from "react";

type T_Props = {};

const SingleAsset: React.FC<T_Props> = (props) => {
	return (
		<div className="w-full h-full flex items-start justify-center gap-[32px]">
			<div className="w-[256px] h-[291px]">
				<img
					src="/assets/placeholder.svg"
					className="object-cover w-full h-full object-center rounded-[8px]"
				/>
			</div>
			<div className="w-[327px] grid gap-[24px] text-justify">
				<Text size={22} weight={600} className="mb-[8px]">
					Asset Name
				</Text>
				<Text size={16} weight={400} className="mb-[8px]">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu
					dolor orci. Vestibulum ornare in leo in varius. Duis aliquam nisl at
					augue rutrum luctus. Quisque aliquam laoreet ligula, ac vulputate leo
					finibus sagittis. Praesent eu mattis nulla.
				</Text>
				<div className="flex items-start gap-[4px]">
					<Text weight={600}>Tags:</Text>
					<div className="flex items-start gap-[4px]">
						{[1, 2, 3, 4].map((item, idx) => (
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
