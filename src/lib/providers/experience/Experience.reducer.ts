import { T_Actions, T_Experience } from "@experience/types";

export default function reducer(
	state: T_Experience,
	actions: T_Actions
): T_Experience {
	switch (actions.type) {
		case "OPEN_EXPERIENCE":
			return {
				...state,
				isOpen: true,
			};
		case "CLOSE_EXPERIENCE":
			return {
				...state,
				isOpen: false,
			};
		case "SET_ROOM_INFO":
			return {
				...state,
				info: {
					...state.info,
					roomId: actions.payload,
				},
			};
	}
}
