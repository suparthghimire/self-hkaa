declare module "@experience/types" {
	export type T_Experience = {
		info: {
			roomId: string;
			setRoomId: (roomId: string) => void;
		};
		isOpen: boolean;
		openExperience: () => void;
		closeExperience: () => void;
	};

	export type T_Actions =
		| {
				type: "OPEN_EXPERIENCE";
		  }
		| {
				type: "CLOSE_EXPERIENCE";
		  }
		| {
				type: "SET_ROOM_INFO";
				payload: string;
		  };
}
