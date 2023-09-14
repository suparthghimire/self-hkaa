"use client";
import Experience from "@/components/templates/Experience";
import { MODES } from "@/lib/data/constants";
import { useAuth } from "@/lib/providers/Auth/AuthProvider";
import React from "react";

type T_Props = {
	params: {
		slug: string;
	};
};
const VisitorWorldPage: React.FC<T_Props> = (props) => {
	const { auth } = useAuth();
	if (!auth.status) return <div>Anon Login Failed</div>;
	return (
		<Experience
			mode={MODES.VISITOR}
			roomSlug={props.params.slug}
			leaveUrl="/"
			accessToken={auth.user.token}
		/>
	);
};

export default VisitorWorldPage;
