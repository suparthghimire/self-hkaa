import Button from "@/components/common/Button";
import { useAuth } from "@/lib/providers/Auth/AuthProvider";
import { T_UserType } from "@app/types";
import { Grid } from "@mantine/core";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";

interface IInstanceGrid {
	instanceType: string;
	title: string;
	description: string;
	instanceUpdated: string;
	image: string | StaticImageData;
	type: T_UserType;
	slug: string;
	experienceType: "world" | "shop";
}

const InstanceGrid: React.FC<IInstanceGrid> = ({
	instanceType,
	title,
	description,
	instanceUpdated,
	image,
	slug,
	type,
	experienceType,
}) => {
	const { auth } = useAuth();
	return (
		<Grid align="stretch" gutter="40px">
			<Grid.Col span={6}>
				<div className="flex flex-col h-full justify-between pr-5 border-l-0 border-r-0 border-t-1 border-black border-b-1 border-solid">
					<p>{instanceType}</p>
					<div>
						<h2 className="text-[40px] mb-[28px]">{title}</h2>
						<p className="text-[20px]">{description}</p>

						<div className="flex gap-3 w-full">
							{/* visitor */}

							<Link
								href={
									type === "user"
										? `/instance/${slug}`
										: `/admin/visitor/${experienceType}/${slug}`
								}
							>
								<Button radius={100} className="mt-[28px]">
									{type === "user" ? "Enter Instance" : "Enter as Visitor"}
								</Button>
							</Link>
							{/* creator */}
							{type === "admin" && auth.status === true && (
								<Link href={`/admin/creator/${experienceType}/${slug}`}>
									<Button radius={100} className="mt-[28px]">
										Enter as Creator
									</Button>
								</Link>
							)}
						</div>
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
