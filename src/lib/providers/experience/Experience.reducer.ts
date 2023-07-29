import { T_Actions, T_Experience } from "@experience/types";

export default function reducer(
	state: T_Experience,
	actions: T_Actions
): T_Experience {
	switch (actions.type) {
		case "SET_ROOM_INFO":
			return {
				...state,
				info: {
					...state.info,
				},
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
	}
}
