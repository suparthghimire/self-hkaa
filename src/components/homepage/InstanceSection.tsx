"use client";

import InstanceGrid from "@/components/common/InstanceGrid";
import { GetAllRooms } from "@/lib/api/api";
import {
	ADMIN_INSTANCES,
	MAIN_INSTANCE,
	USER_INSTANCES,
} from "@/lib/data/mock_data";
import { ParseJson } from "@/lib/helpers";
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
import React, { useState } from "react";
import ServerError from "../common/ServerError";

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

	if (allRooms.isError) {
		return <ServerError error="Something went wrong" />;
	}

	if (!allRooms.data || allRooms.isLoading) {
		return <Loader />;
	}
	return (
		<StyledTabs
			defaultValue={
				props.userType === "admin"
					? "main-instance"
					: allRooms.data.data.rooms[0].id.toString()
			}
		>
			<Tabs.List position="center">
				{props.userType === "admin" && (
					<Tabs.Tab value="main-instance">Main Instance</Tabs.Tab>
				)}
				{allRooms.data.data.rooms.map((room) => (
					<Tabs.Tab value={room.id.toString()} key={room.id}>
						{room.name}
					</Tabs.Tab>
				))}
			</Tabs.List>
			{props.userType === "admin" && (
				<Tabs.Panel value="main-instance">
					<InstanceGrid
						editable={false}
						description={MAIN_INSTANCE.description}
						image={MAIN_INSTANCE.image}
						experienceType="world"
						instanceType={MAIN_INSTANCE.tabName}
						instanceUpdated={new Date().toISOString()}
						slug={MAIN_INSTANCE.slug}
						title={MAIN_INSTANCE.tabName}
						type={props.userType}
					/>
				</Tabs.Panel>
			)}
			{allRooms.data.data.rooms.map((room) => (
				<Tabs.Panel value={room.id.toString()} key={room.id}>
					<InstanceGrid
						editable
						uuid={room.uuid}
						id={room.id}
						experienceType="world"
						instanceType={room.name}
						title={room.name}
						description={room.description}
						instanceUpdated={room.updatedAt}
						image={room.image}
						type={props.userType}
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
	const allRooms = useQuery({
		queryKey: ["all-rooms"],
		queryFn: () => GetAllRooms(),
	});

	if (allRooms.isError) {
		return <ServerError error="Something went wrong" />;
	}

	if (!allRooms.data || allRooms.isLoading) {
		return <Loader />;
	}
	return (
		<StyledTabs defaultValue={allRooms.data.data.rooms[0].id.toString()}>
			<Tabs.List position="center">
				{allRooms.data.data.rooms.map((room) => (
					<Tabs.Tab value={room.id.toString()} key={room.id}>
						{room.name}
					</Tabs.Tab>
				))}
			</Tabs.List>
			{allRooms.data.data.rooms.map((room) => (
				<Tabs.Panel value={room.id.toString()} key={room.id}>
					<InstanceGrid
						editable
						id={room.id}
						uuid={room.uuid}
						experienceType="shop"
						instanceType={room.name}
						title={room.name}
						description={room.description}
						instanceUpdated={room.updatedAt}
						image={room.image}
						type={props.userType}
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
export default InstanceSection;
