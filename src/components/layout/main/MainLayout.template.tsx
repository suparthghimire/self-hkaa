import RootProvider from "@/lib/providers/RootProvider";
import { PropsWithChildren } from "react";

const MainLayout: React.FC<PropsWithChildren> = (props) => {
	return <RootProvider>{props.children}</RootProvider>;
};

export default MainLayout;
