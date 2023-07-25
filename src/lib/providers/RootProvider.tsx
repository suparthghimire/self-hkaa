"use client";
import React, { PropsWithChildren } from "react";
import { MantineProvider } from "@mantine/core";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RootLayout from "@/app/layout";

const queryClient = new QueryClient();

const RootProvider: React.FC<PropsWithChildren> = (props) => {
	return (
		<QueryClientProvider client={queryClient}>
			<MantineProvider withGlobalStyles withNormalizeCSS>
				{props.children}
			</MantineProvider>
		</QueryClientProvider>
	);
};

export default RootProvider;
