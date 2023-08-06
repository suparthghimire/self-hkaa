import AdminAuth from "@/components/auth/AdminAuth.template";
import React, { PropsWithChildren } from "react";

const AdminLayout: React.FC<PropsWithChildren> = (props) => {
	return <AdminAuth>{props.children}</AdminAuth>;
};

export default AdminLayout;
