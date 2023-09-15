"use client";

import InstanceGrid from "@/components/common/InstanceGrid";
import { GetAllRooms } from "@/lib/api/api";
import {
	HKAA_MAIN_INSTANCE_SLUG,
	PLACEHOLDER_IMG_SRC,
} from "@/lib/data/constants";
import {
	ADMIN_INSTANCES,
	ADMIN_SHOPS,
	USER_INSTANCES,
} from "@/lib/data/mock_data";
import { ParseJson } from "@/lib/helpers";
import { T_Room } from "@api/types";
import { T_UserType } from "@app/types";
import {
	Container,
	Loader,
	MantineTheme,
	Tabs,
	TabsProps,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import ServerError from "../common/ServerError";

function MasterFirst(rooms: T_Room[], userType: T_UserType): T_Room[] {
	if (userType === "user")
		return rooms.filter(
			(room) => room.urlshortcode !== HKAA_MAIN_INSTANCE_SLUG
		);

	const masterRoom = rooms.find(
		(room) => room.urlshortcode === HKAA_MAIN_INSTANCE_SLUG
	);

	const otherRooms = rooms.filter(
		(room) => room.urlshortcode !== HKAA_MAIN_INSTANCE_SLUG
	);
	let newRooms = otherRooms;
	if (masterRoom) newRooms = [masterRoom, ...otherRooms];

	console.log(newRooms);

	return newRooms;
}

function StyledTabs(props: TabsProps) {
	return (
		<Tabs
			unstyled
			styles={(theme: MantineTheme) => ({
				root: {
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				},
				tab: {
					...theme.fn.focusStyles(),
					backgroundColor: "#fff",
					border: "none",
					color: "#131313",
					padding: "12px 24px",
					cursor: "pointer",
					fontSize: "20px",
					fontWeight: 500,
					textTransform: "uppercase",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					borderRadius: "12px",
					":hover": {
						backgroundColor: theme.colors.primaryBlue[6],
						color: "#fff",
					},
					"&:disabled": {
						opacity: 0.5,
						cursor: "not-allowed",
					},
					"&[data-active]": {
						backgroundColor: theme.colors.primaryBlue[5],
						borderColor: theme.colors.primaryBlue[5],
						color: "#fff",
						":hover": {
							backgroundColor: theme.colors.primaryBlue[6],
							color: "#fff",
						},
					},
				},
				tabsList: {
					display: "inline-flex",
					margin: "50px 0",
					padding: "10px",
					backgroundColor: "#fff",
					borderRadius: "8px",
					boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.25) inset",
					gap: "10px",
				},
			})}
			{...props}
		/>
	);
}

type T_Props = {
	userType: T_UserType;
	experienceType: "world" | "shop";
};
const InstanceSection: React.FC<T_Props> = (props) => {
	const [instances] = useState(
		props.userType === "admin" ? ADMIN_INSTANCES : USER_INSTANCES
	);
	const [editModalOpened, { open: openEdit, close: closeEdit }] =
		useDisclosure();

	return (
		<Container size="xl" px="xs">
			{props.experienceType === "shop" ? (
				<Shops userType={props.userType} />
			) : (
				<Instances userType={props.userType} />
			)}
		</Container>
	);
};

const Instances: React.FC<{
	userType: T_UserType;
}> = (props) => {
	const allRooms = useQuery({
		queryKey: ["all-rooms"],
		queryFn: () => GetAllRooms(),
	});

	const masterFirstSorted = useMemo(
		() => MasterFirst(allRooms.data?.data.rooms || [], props.userType),
		[allRooms.data?.data.rooms, props.userType]
	);

	if (allRooms.isError) {
		return <ServerError error="Something went wrong" />;
	}

	if (!allRooms.data || allRooms.isLoading) {
		return <Loader />;
	}
	return (
		<StyledTabs defaultValue={masterFirstSorted[0].id.toString()}>
			<Tabs.List position="center">
				{masterFirstSorted.map((room) => (
					<Tabs.Tab value={room.id.toString()} key={room.id}>
						{room.name}
					</Tabs.Tab>
				))}
			</Tabs.List>
			{masterFirstSorted.map((room) => (
				<Tabs.Panel value={room.id.toString()} key={room.id}>
					<InstanceGrid
						editable={
							props.userType === "admin" &&
							room.urlshortcode !== HKAA_MAIN_INSTANCE_SLUG
						}
						uuid={room.uuid}
						id={room.id}
						experienceType="world"
						instanceType={room.name}
						title={room.name}
						description={room.description}
						instanceUpdated={room.updatedAt}
						image={room.image}
						userType={props.userType}
						slug={room.urlshortcode}
						url={
							ParseJson<{
								url: string;
							}>(room.configuration).url
						}
					/>
				</Tabs.Panel>
			))}
		</StyledTabs>
	);
};

const Shops: React.FC<{
	userType: T_UserType;
}> = (props) => {
	return (
		<StyledTabs defaultValue={ADMIN_SHOPS[0].id.toString()}>
			<Tabs.List position="center">
				{ADMIN_SHOPS.map((shop) => (
					<Tabs.Tab value={shop.id.toString()} key={shop.id}>
						{shop.title}
					</Tabs.Tab>
				))}
			</Tabs.List>
			{ADMIN_SHOPS.map((shop) => (
				<Tabs.Panel value={shop.id.toString()} key={shop.id}>
					<InstanceGrid
						editable={false}
						// id={shop.id}
						// uuid=""
						experienceType="shop"
						instanceType={shop.title}
						title={shop.title}
						description={shop.description}
						instanceUpdated={shop.date}
						image={PLACEHOLDER_IMG_SRC}
						userType={props.userType}
						slug={shop.slug}
						// url="https://lucidworlds.com"
					/>
				</Tabs.Panel>
			))}
		</StyledTabs>
	);
};
export default InstanceSection;
