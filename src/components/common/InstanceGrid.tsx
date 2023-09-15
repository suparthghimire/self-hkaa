import Button from "@/components/common/Button";
import { GetRoomUsers } from "@/lib/api/api";
import { ROOM_USERS_REFETCH_INTERVAL } from "@/lib/data/constants";
import { FormatDateTime } from "@/lib/helpers";
import { useAuth } from "@/lib/providers/Auth/AuthProvider";
import { T_UserType } from "@app/types";
import {
	Grid,
	Loader,
	Button as MantineButton,
	Text,
	Tooltip,
	rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconUserCancel, IconUsers } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import CustomModal from "../experience/design/common/CustomModal";
import InstanceEditForm from "../forms/InstanceEditForm";
import ImageViewer from "./ImageViewer";

type T_InstanceGridEditable = {
	url: string;
	id: number;
	editable: true;
};
type T_InstanceGridNonEditable = {
	editable: false;
};
type T_InstanceGridCommon = {
	instanceType: string;
	image: string;
	experienceType: "world" | "shop";
	instanceUpdated: string;
	userType: T_UserType;
	title: string;
	description: string;
	slug: string;
	uuid: string;
};
type T_InstanceGridProps = (
	| T_InstanceGridEditable
	| T_InstanceGridNonEditable
) &
	T_InstanceGridCommon;
const InstanceGrid: React.FC<T_InstanceGridProps> = (props) => {
	const { auth } = useAuth();
	const [editOpened, { open: openEdit, close: closeEdit }] =
		useDisclosure(false);
	return (
		<Grid align="stretch" gutter="40px">
			<Grid.Col span={6}>
				<div className="flex flex-col h-full justify-between pr-5 border-l-0 border-r-0 border-t-1 border-black border-b-1 border-solid">
					<div className="flex w-full items-center justify-between">
						<p>{props.instanceType}</p>
						{props.userType === "admin" && props.editable && (
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
						<div className="flex gap-[20px] items-center">
							<h2 className="text-[40px] mb-[28px] ">{props.title}</h2>
							<RealTimeUserCount uuid={props.uuid} />
						</div>
						<p className="text-[20px]">{props.description}</p>
						<div className="flex gap-3 w-full">
							{props.userType === "user" && (
								<Link href={`/instance/${props.slug}`}>
									<Button radius={100} className="mt-[28px]">
										Enter Instance
									</Button>
								</Link>
							)}
							{/* visitor */}
							{props.editable && props.experienceType === "world" && (
								<Link
									href={
										props.userType === "user"
											? `/instance/${props.slug}`
											: `/admin/visitor/${props.experienceType}/${props.slug}`
									}
								>
									<Button radius={100} className="mt-[28px]">
										{props.userType === "user"
											? "Enter Instance"
											: "Visitor Mode"}
									</Button>
								</Link>
							)}

							{/* creator */}
							{props.userType === "admin" && auth.status === true && (
								<Link
									href={`/admin/creator/${props.experienceType}/${props.slug}`}
								>
									<MantineButton
										radius={100}
										className="mt-[28px]"
										styles={() => ({
											root: {
												padding: "12px 24px",
												height: "auto",
												minWidth: "146px",
												borderWidth: rem(3),
												background:
													props.experienceType === "world"
														? "#4B5563"
														: undefined,
											},
											label: {
												fontSize: rem(20),
											},
										})}
									>
										{props.experienceType === "world"
											? "Creator Mode"
											: "Enter"}
									</MantineButton>
								</Link>
							)}
						</div>
					</div>
					<p>Last Updated: {FormatDateTime(new Date(props.instanceUpdated))}</p>
				</div>
			</Grid.Col>
			<Grid.Col span={6}>
				<div className="w-[500px] h-[500px] relative">
					<ImageViewer
						src={props.image}
						fill
						alt="Instance Image"
						className="w-full h-auto"
					/>
				</div>
			</Grid.Col>
			<CustomModal size={rem(591)} opened={editOpened} onClose={closeEdit}>
				{props.experienceType === "world" && props.editable ? (
					<InstanceEditForm
						description={props.description}
						name={props.title}
						image={props.image as string}
						close={closeEdit}
						id={props.id}
						uuid={props.uuid}
						url={props.url}
					/>
				) : (
					<div>Shop</div>
				)}
			</CustomModal>
		</Grid>
	);
};
const RealTimeUserCount: React.FC<{
	uuid: string;
}> = (props) => {
	const roomUsers = useQuery({
		queryKey: ["room-users"],
		queryFn: () => GetRoomUsers(),
		refetchInterval: ROOM_USERS_REFETCH_INTERVAL,
	});

	const currentUserCount = roomUsers.data?.find((u) => {
		console.log(u.worldName);
		console.log(props.uuid);
		console.log(u.worldName === props.uuid);
		return u.worldName === props.uuid;
	});

	if (!roomUsers.data || roomUsers.isLoading) return <Loader />;
	else if (roomUsers.isError)
		return (
			<Tooltip label="Error while fetching users">
				<IconUserCancel />
			</Tooltip>
		);

	return (
		<div className="flex gap-[4px] items-center">
			<IconUsers size={rem(24)} color="#6B7280" />
			{currentUserCount !== undefined ? (
				<Text size={rem(24)} color="gray.7">
					{currentUserCount?.activeUsers}
				</Text>
			) : (
				<Text size={rem(18)} color="gray.7">
					No Room
				</Text>
			)}

			<RefetchIndicator isFetching={roomUsers.isFetching} />
		</div>
	);
};

const RefetchIndicator: React.FC<{ isFetching: boolean }> = (props) => {
	return (
		<span
			style={{
				display: "inline-block",
				marginLeft: ".5rem",
				width: 10,
				height: 10,
				// background: "green",
				background: props.isFetching ? "green" : "transparent",
				transition: !props.isFetching ? "all .3s ease" : "none",
				borderRadius: "100%",
				transform: "scale(2)",
			}}
		/>
	);
};

export default InstanceGrid;
