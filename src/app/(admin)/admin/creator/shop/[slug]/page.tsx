"use client";
import ExperienceShopUI from "@/components/experience/design/UI/ExperienceShopUI";
import Experience from "@/components/templates/Experience";
import { NODE_ENV } from "@/lib/config";
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
			roomSlug={props.params.slug}
			leaveUrl="/admin/slug"
			accessToken={auth.user.token}
			ui={<ExperienceShopUI mode={MODES.CREATOR} />}
			sessionTokenData={
				NODE_ENV === "development"
					? {
							config: "config-dev",
					  }
					: undefined
			}
		/>
	);
};

export default CreatorWorldPage;
