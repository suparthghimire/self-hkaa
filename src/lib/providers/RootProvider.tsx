"use client";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import React, { PropsWithChildren } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FONT_FAMILY } from "../data/constants";
import AuthProvider from "./Auth/AuthProvider";
import ExperienceProvider from "./experience/Experience.provider";
const queryClient = new QueryClient();

const RootProvider: React.FC<PropsWithChildren> = (props) => {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<ExperienceProvider>
					<MantineProvider
						withGlobalStyles
						withNormalizeCSS
						theme={{
							colors: {
								blue: [
									"#93AAFF",
									"#3D51E4",
									"#6A89F8",
									"#6A89F8",
									"#6A89F8",
									"#6A89F8",
									"#6A89F8",
									"#6A89F8",
									"#6A89F8",
									"#6A89F8",
								],
								primaryBlue: [
									"#ffffff",
									"#c6d2ff",
									"#8da5ff",
									"#5579fe",
									"#0030e2",
									"#1c4cff",
									"#6A89F8",
									"#0024aa",
									"#001871",
									"#000c38",
								],
							},
							primaryShade: {
								light: 5,
								dark: 6,
							},
							primaryColor: "primaryBlue",
							fontFamily: FONT_FAMILY,
						}}
					>
						<Notifications />
						{props.children}
						<ProgressBar
							height="4px"
							color="#6A89F8"
							options={{ showSpinner: true }}
							shallowRouting
						/>
					</MantineProvider>
				</ExperienceProvider>
			</AuthProvider>
		</QueryClientProvider>
	);
};

export default RootProvider;
