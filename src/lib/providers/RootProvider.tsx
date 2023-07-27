"use client";
import { MantineProvider } from "@mantine/core";
import React, { PropsWithChildren } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
							"#6A89F8",
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
					fontFamily: 'Roboto Condensed, sans-serif',
				}}
			>
				{props.children}
			</MantineProvider>
		</QueryClientProvider>
	);
};

export default RootProvider;
