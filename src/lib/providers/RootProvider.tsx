"use client";
import { MantineProvider } from "@mantine/core";
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
								"#6A89F8",
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
				</MantineProvider>
			</ExperienceProvider>
		</QueryClientProvider>
	);
};

export default RootProvider;
