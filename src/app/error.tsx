"use client";
import { Button } from "@mantine/core";
import React from "react";

type T_Props = {
	error: Error;
	reset: () => void;
};

const RootError: React.FC<T_Props> = (props) => {
	return (
		<div>
			Something Went Wrong.
			<Button onClick={props.reset}>Retry</Button>
		</div>
	);
};

export default RootError;
