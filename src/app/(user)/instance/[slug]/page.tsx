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
			mode={MODES.VISITOR}
			roomSlug={props.params.slug}
			leaveUrl="/"
		/>
	);
};

export default VisitorWorldPage;
