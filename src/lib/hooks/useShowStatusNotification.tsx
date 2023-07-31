import { showNotification, updateNotification } from "@mantine/notifications";
import { useEffect } from "react";
type T_Args = {
	success: { status: boolean; text: string; onClose?: () => void };
	error: { status: boolean; text: string; onClose?: () => void };
	loading: { status: boolean; text: string; onClose?: () => void };
};
export default function useShowStatusNotification(args: T_Args) {
	useEffect(() => {
		if (args.loading.status)
			showNotification({
				id: "status-notification",
				message: args.loading.text,
				color: "blue.9",
				loading: true,
				onClose: args.loading.onClose,
			});
		else if (args.success.status)
			updateNotification({
				id: "status-notification",
				message: args.success.text,
				color: "green",
				loading: false,
				onClose: args.success.onClose,
			});
		else if (args.error.status)
			updateNotification({
				id: "status-notification",
				message: args.error.text,
				color: "red",
				loading: false,
				onClose: args.error.onClose,
			});
	}, [
		args.success.status,
		args.error.status,
		args.loading.status,
		args.success.text,
		args.error.text,
		args.loading.text,
		args.success.onClose,
		args.error.onClose,
		args.loading.onClose,
	]);
}
