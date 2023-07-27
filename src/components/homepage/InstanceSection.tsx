"use client";

import instanceImg from "@/assets/instance-img.jpeg";
import InstanceGrid from "@/components/common/InstanceGrid";
import { MODES } from "@/lib/data/constants";
import { ADMIN_INSTANCES, USER_INSTANCES } from "@/lib/data/mock_data";
import { useExperience } from "@/lib/providers/experience/Experience.provider";
import { T_Instance, T_UserType } from "@app/types";
import { Container, MantineTheme, Tabs, TabsProps } from "@mantine/core";
import React, { useCallback, useState } from "react";
import Experience from "../templates/Experience";

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

					"&:disabled": {
						opacity: 0.5,
						cursor: "not-allowed",
					},

					"&[data-active]": {
						backgroundColor: theme.colors.blue[7],
						borderColor: theme.colors.blue[7],
						color: "#fff",
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
};
const InstanceSection: React.FC<T_Props> = (props) => {
	const {
		openExperience,
		info: { setRoomId },
	} = useExperience();
	const [instances] = useState(
		props.userType === "admin" ? ADMIN_INSTANCES : USER_INSTANCES
	);

	const handleClick = useCallback((instance: T_Instance) => {
		setRoomId(instance.roomId);
		openExperience();
	}, []);
	console.log(instances, props.userType);

	return (
		<Container size="xl" px="xs">
			<StyledTabs defaultValue={instances[0].key}>
				<Tabs.List position="center">
					{instances.map((instance) => (
						<Tabs.Tab value={instance.key} key={instance.key}>
							{instance.tabName}
						</Tabs.Tab>
					))}
				</Tabs.List>
				{instances.map((instance) => (
					<Tabs.Panel value={instance.key} key={instance.key}>
						<InstanceGrid
							instanceType={instance.subTitle}
							title={instance.title}
							description={instance.description}
							buttonText={instance.buttonName}
							instanceUpdated={instance.date}
							image={instanceImg}
							onClick={() => {
								handleClick(instance);
							}}
						/>
					</Tabs.Panel>
				))}
			</StyledTabs>
			<Experience
				mode={props.userType === "admin" ? MODES.CREATOR : MODES.VISITOR}
			/>
		</Container>
	);
};

export default InstanceSection;
