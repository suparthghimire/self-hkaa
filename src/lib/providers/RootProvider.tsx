"use client";

import { MantineProvider } from "@mantine/core";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import React, { PropsWithChildren } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FONT_FAMILY } from "../data/constants";
import ExperienceProvider from "./experience/Experience.provider";
const queryClient = new QueryClient();

const RootProvider: React.FC<PropsWithChildren> = (props) => {
	return (
		<QueryClientProvider client={queryClient}>
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
						},
						primaryColor: "blue",
						fontFamily: FONT_FAMILY,
					}}
				>
					{props.children}
					<ProgressBar
						height="4px"
						color="#6A89F8"
						options={{ showSpinner: true }}
						shallowRouting
					/>
				</MantineProvider>
			</ExperienceProvider>
		</QueryClientProvider>
	);
};

export default RootProvider;
