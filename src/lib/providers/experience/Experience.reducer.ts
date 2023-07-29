import { T_Actions, T_Experience } from "@experience/types";

export default function reducer(
	state: T_Experience,
	actions: T_Actions
): T_Experience {
	switch (actions.type) {
		case "SET_ROOM_INFO":
			console.log("SET_ROOM_INFO", actions.payload);
			return {
				...state,
				info: state.info,
			};

		case "LOADED": {
			return {
				...state,
				hasLoaded: true,
			};
		}
		case "SET_IFRAME_REF": {
			return {
				...state,
				iframeRef: actions.payload,
			};
		}
		case "SET_LEAVE_URL": {
			return {
				...state,
				info: {
					...state.info,
					leaveUrl: actions.payload,
				},
			};
		}
	}
}
