import Button from "@/components/common/Button";
import { Grid } from "@mantine/core";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";

interface IInstanceGrid {
	instanceType: string;
	title: string;
	description: string;
	buttonText: string;
	instanceUpdated: string;
	image: string | StaticImageData;
	link: string;
}

const InstanceGrid: React.FC<IInstanceGrid> = ({
	instanceType,
	title,
	description,
	buttonText,
	instanceUpdated,
	image,
	link,
}) => {
	return (
		<Grid align="stretch" gutter="40px">
			<Grid.Col span={6}>
				<div className="flex flex-col h-full justify-between pr-5 border-l-0 border-r-0 border-t-1 border-black border-b-1 border-solid">
					<p>{instanceType}</p>
					<div>
						<h2 className="text-[40px] mb-[28px]">{title}</h2>
						<p className="text-[20px]">{description}</p>
						<Link href={link}>
							<Button radius={100} className="mt-[28px]">
								{buttonText}
							</Button>
						</Link>
					</div>
					<p>{instanceUpdated}</p>
				</div>
			</Grid.Col>
			<Grid.Col span={6}>
				<Image
					src={image}
					width={500}
					height={500}
					alt="Instance Image"
					className="w-full h-auto"
				/>
			</Grid.Col>
		</Grid>
	);
};

export default InstanceGrid;
