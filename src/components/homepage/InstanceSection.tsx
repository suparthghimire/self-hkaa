"use client";

import instanceImg from "@/assets/instance-img.jpeg";
import InstanceGrid from "@/components/common/InstanceGrid";
import { ADMIN_INSTANCES, USER_INSTANCES } from "@/lib/data/mock_data";
import { useAuth } from "@/lib/providers/Auth/AuthProvider";
import { T_UserType } from "@app/types";
import { Container, MantineTheme, Tabs, TabsProps } from "@mantine/core";
import React, { useState } from "react";

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
	const { auth } = useAuth();
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
							experienceType={props.experienceType}
							instanceType={instance.subTitle}
							title={instance.title}
							description={instance.description}
							instanceUpdated={instance.date}
							image={instanceImg}
							type={props.userType}
							slug={instance.slug}
						/>
					</Tabs.Panel>
				))}
			</StyledTabs>
		</Container>
	);
};

export default InstanceSection;
