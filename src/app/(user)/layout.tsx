import AnonAuth from "@/components/auth/AnonAuth.template";
import React, { PropsWithChildren } from "react";

const AdminLayout: React.FC<PropsWithChildren> = (props) => {
	return <AnonAuth>{props.children}</AnonAuth>;
};

export default AdminLayout;
