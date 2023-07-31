import { Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import React from "react";

type T_Props = {
	error: string;
};
const ServerError: React.FC<T_Props> = (props) => {
	return (
		<div className="mb-3">
			<Alert
				icon={<IconAlertCircle size="1rem" />}
				title="Bummer!"
				variant="filled"
				color="red"
			>
				{props.error}
			</Alert>
		</div>
	);
};

export default ServerError;
