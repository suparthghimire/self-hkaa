"use client";

import instanceImg from "@/assets/instance-img.jpeg";
import InstanceGrid from "@/components/common/InstanceGrid";
import { USER_INSTANCES } from "@/lib/data/mock_data";
import { Container, MantineTheme, Tabs, TabsProps } from "@mantine/core";
import React from "react";

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

const InstanceSection: React.FC = () => {
	return (
		<Container size="xl" px="xs">
			<StyledTabs defaultValue={USER_INSTANCES[0].key}>
				<Tabs.List position="center">
					{USER_INSTANCES.map((instance) => (
						<Tabs.Tab value={instance.key} key={instance.key}>
							{instance.tabName}
						</Tabs.Tab>
					))}
				</Tabs.List>
				{USER_INSTANCES.map((instance) => (
					<Tabs.Panel value={instance.key} key={instance.key}>
						<InstanceGrid
							instanceType={instance.subTitle}
							title={instance.title}
							description={instance.description}
							buttonText={instance.buttonName}
							instanceUpdated={instance.date}
							image={instanceImg}
						/>
					</Tabs.Panel>
				))}
			</StyledTabs>
		</Container>
	);
};

export default InstanceSection;
