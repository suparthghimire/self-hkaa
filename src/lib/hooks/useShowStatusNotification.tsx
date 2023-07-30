import { showNotification, updateNotification } from "@mantine/notifications";
import { useEffect } from "react";
type T_Args = {
	success: { status: boolean; text: string };
	error: { status: boolean; text: string };
	loading: { status: boolean; text: string };
};
export default function useShowStatusNotification(args: T_Args) {
	useEffect(() => {
		if (args.loading.status)
			showNotification({
				id: "status-notification",
				message: args.loading.text,
				color: "blue.9",
				loading: true,
			});
		else if (args.success.status)
			updateNotification({
				id: "status-notification",
				message: args.success.text,
				color: "green",
				loading: false,
			});
		else if (args.error.status)
			updateNotification({
				id: "status-notification",
				message: args.error.text,
				color: "red",
				loading: false,
			});
	}, [args.success.status, args.error.status, args.loading.status]);
}
