"use client";
import Experience from "@/components/templates/Experience";
import { MODES } from "@/lib/data/constants";
import React from "react";

type T_Props = {
	params: {
		slug: string;
	};
};
const VisitorWorldPage: React.FC<T_Props> = (props) => {
	return (
		<Experience
			mode={MODES.CREATOR}
			roomSlug={props.params.slug}
			leaveUrl="/admin"
		/>
	);
};

export default VisitorWorldPage;
