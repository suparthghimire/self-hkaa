import { T_Modes } from "../data/constants";

declare module "@experience/types" {
	export type T_ExperienceInfo = {
		slug: string;
		roomId: string;
		layoutId: string;
		mode: T_Modes;
		leaveUrl: string;
	};
	export type T_Chat = {
		user: string;
		message: string;
		time: string;
	};
	export type T_Experience = {
		info: T_ExperienceInfo;
		iframeRef: React.RefObject<HTMLIFrameElement> | null;
		setIframeRef: (ref: React.RefObject<HTMLIFrameElement>) => void;
		setRoomInfo: (info: T_ExperienceInfo) => void;
		hasLoaded: boolean;
		loaded: () => void;
		setLeaveUrl: (url: string) => void;
		chatMessages: T_Chat[];
		sendChatMessage: (messages: string) => void;
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
		  }
		| {
				type: "SET_LEAVE_URL";
				payload: string;
		  }
		| {
				type: "SEND_CHAT_MESSAGE";
				payload: string;
		  }
		| {
				type: "SET_CHAT_MESSAGE";
				payload: T_Chat;
		  };
}
