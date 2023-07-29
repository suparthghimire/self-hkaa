import { T_Modes } from "../data/constants";

declare module "@experience/types" {
	export type T_ExperienceInfo = {
		slug: string;
		roomId: string;
		layoutId: string;
		mode: T_Modes;
	};
	export type T_Experience = {
		info: T_ExperienceInfo;
		iframeRef: React.RefObject<HTMLIFrameElement> | null;
		setIframeRef: (ref: React.RefObject<HTMLIFrameElement>) => void;
		setRoomInfo: (info: T_ExperienceInfo) => void;
		hasLoaded: boolean;
		loaded: () => void;
	};

	export type T_Actions =
		| {
				type: "SET_ROOM_INFO";
				payload: T_ExperienceInfo;
		  }
		| {
				type: "LOADED";
		  }
		| {
				type: "SET_IFRAME_REF";
				payload: React.RefObject<HTMLIFrameElement>;
		  };
}
