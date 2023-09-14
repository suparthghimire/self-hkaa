// Courtesy of @Sakar Subedi
import { GetAssetPrefixURL } from "@/lib/api/api";
import { T_PrefixUrl } from "@api/types";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, PropsWithChildren, useContext } from "react";

const PrefixUrlContext = createContext<T_PrefixUrl | undefined>(undefined);

export const usePrefixUrl = () => useContext(PrefixUrlContext);

const PrefixUrlProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const { data } = useQuery({
		queryKey: ["assetPrefixUrl"],
		queryFn: () => GetAssetPrefixURL(),
	});

	return (
		<PrefixUrlContext.Provider value={data?.data}>
			{children}
		</PrefixUrlContext.Provider>
	);
};

export { PrefixUrlContext, PrefixUrlProvider };
