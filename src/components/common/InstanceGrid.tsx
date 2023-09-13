import Button from "@/components/common/Button";
import { FormatDateTime } from "@/lib/helpers";
import { useAuth } from "@/lib/providers/Auth/AuthProvider";
import { T_UserType } from "@app/types";
import { Grid, Button as MantineButton, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CustomModal from "../experience/design/common/CustomModal";
import InstanceEditForm from "../forms/InstanceEditForm";

type T_InstanceGrid = {
	instanceType: string;
	title: string;
	description: string;
	instanceUpdated: string;
	image: string;
	type: T_UserType;
	slug: string;
	experienceType: "world" | "shop";
};

const InstanceGrid: React.FC<T_InstanceGrid> = ({
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
	const [editOpened, { open: openEdit, close: closeEdit }] =
		useDisclosure(false);
	return (
		<Grid align="stretch" gutter="40px">
			<Grid.Col span={6}>
				<div className="flex flex-col h-full justify-between pr-5 border-l-0 border-r-0 border-t-1 border-black border-b-1 border-solid">
					<div className="flex w-full items-center justify-between">
						<p>{instanceType}</p>
						{type === "admin" && (
							<MantineButton
								color="gray.7"
								radius={10}
								size="xs"
								leftIcon={<IconEdit size={18} />}
								onClick={openEdit}
							>
								Edit Info
							</MantineButton>
						)}
					</div>
					<div>
						<h2 className="text-[40px] mb-[28px]">{title}</h2>
						<p className="text-[20px]">{description}</p>

						<div className="flex gap-3 w-full">
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
									<MantineButton
										radius={100}
										className="mt-[28px]"
										styles={() => ({
											root: {
												padding: "12px 24px",
												height: "auto",
												minWidth: "146px",
												borderWidth: rem(3),
												background: "#4B5563",
											},
											label: {
												fontSize: rem(20),
											},
										})}
									>
										Enter as Creator
									</MantineButton>
								</Link>
							)}
						</div>
					</div>
					<p>{FormatDateTime(new Date(instanceUpdated))}</p>
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
			<CustomModal size={rem(591)} opened={editOpened} onClose={closeEdit}>
				{experienceType === "world" ? (
					<InstanceEditForm
						description={description}
						name={title}
						image={image as string}
						close={closeEdit}
					/>
				) : (
					<div>Shop</div>
				)}
			</CustomModal>
		</Grid>
	);
};

export default InstanceGrid;
