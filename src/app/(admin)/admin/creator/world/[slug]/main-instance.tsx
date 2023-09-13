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
const CreatorWorldPage: React.FC<T_Props> = (props) => {
	const { auth } = useAuth();

	if (!auth.status) return <>Not Admin</>;

	return (
		<Experience
			mode={MODES.CREATOR}
			roomSlug="hkaa-instance-1"
			leaveUrl="/admin"
			accessToken={auth.user.token}
			sessionTokenData={{
				config: "config-dev",
				ismaster: true,
				instanceid: 0,
			}}
		/>
	);
};

export default CreatorWorldPage;
