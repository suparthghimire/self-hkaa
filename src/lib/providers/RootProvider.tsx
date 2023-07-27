"use client";
import { MantineProvider } from "@mantine/core";
import React, { PropsWithChildren } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FONT_FAMILY } from "../data/constants";

const queryClient = new QueryClient();

const RootProvider: React.FC<PropsWithChildren> = (props) => {
	return (
		<QueryClientProvider client={queryClient}>
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
		</QueryClientProvider>
	);
};

export default RootProvider;
