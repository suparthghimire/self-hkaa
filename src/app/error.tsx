"use client";
import { Button } from "@mantine/core";
import React, { useEffect } from "react";

type T_Props = {
	error: Error;
	reset: () => void;
};

const RootError: React.FC<T_Props> = (props) => {
	useEffect(() => {
		console.log("[APP ERROR]");
		console.log(props.error);
	}, [props.error]);
	return (
		<div>
			Something Went Wrong.
			<Button onClick={props.reset}>Retry</Button>
		</div>
	);
};

export default RootError;
