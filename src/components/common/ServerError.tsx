import { T_ApiError } from "@api/types";
import { Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { AxiosError } from "axios";
import React, { PropsWithChildren } from "react";

type T_Props = {
	error: unknown;
};
const ServerError: React.FC<T_Props> = (props) => {
	let error = "";
	if (typeof props.error === "string") error = props.error;
	else if (props.error instanceof AxiosError) {
		const apiErr = props.error as AxiosError<T_ApiError>;
		error = apiErr.response?.data.message ?? "Something went wrong";
	} else error = "Something went wrong";
	return <Wrapper>{error}</Wrapper>;
};
const Wrapper: React.FC<PropsWithChildren> = (props) => {
	return (
		<div className="mb-3">
			<Alert
				icon={<IconAlertCircle size="1rem" />}
				title="Bummer!"
				variant="filled"
				color="red"
			>
				{props.children}
			</Alert>
		</div>
	);
};

export default ServerError;
