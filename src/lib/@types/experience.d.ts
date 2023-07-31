import { T_Modes } from "../data/constants";

declare module "@experience/types" {
	export type T_ExperienceInfo = {
		slug: string;
		roomId: string;
		layoutId: string;
		mode: T_Modes;
		leaveUrl: string;
		accessToken: string;
	};
	export type T_Chat = {
		user: string;
		message: string;
		time: string;
	};
	export type T_Experience = {
		roomInfo: T_ExperienceInfo;
		worldInfo: T_WorldInfo;
		userInfo: T_UserInfo;

		audio: T_AudioOptions;

		toggleMic: () => void;
		toggleVoice: () => void;

		changeUserName: (name: string) => void;
		iframeRef: React.RefObject<HTMLIFrameElement> | null;
		setIframeRef: (ref: React.RefObject<HTMLIFrameElement>) => void;
		setRoomInfo: (info: T_ExperienceInfo) => void;
		hasLoaded: boolean;
		loaded: () => void;
		chatMessages: T_Chat[];
		sendChatMessage: (messages: string) => void;
		setWorldInfo: (info: T_WorldInfo) => void;
		saveStatus: T_SaveStatus;
		saveRoom: (info: T_WorldInfo) => void;
		setSaveStatus: (status: T_SaveStatus) => void;
		captureImage: () => void;
	};
	export type T_AudioOptions = {
		micEnabled: boolean;
		voiceEnabled: boolean;
	};

	export type T_UserInfo = {
		name: string;
	};
	export type T_WorldInfo = {
		name: string;
		description: string;
		urlshortcode: string;
		image: File | string;
		isPublic: boolean;
	};
	export type T_SaveStatus = "idle" | "success" | "error" | "loading";

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
				type: "SEND_CHAT_MESSAGE";
				payload: string;
		  }
		| {
				type: "SET_CHAT_MESSAGE";
				payload: T_Chat;
		  }
		| {
				type: "SET_WORLD_INFO";
				payload: T_WorldInfo;
		  }
		| {
				type: "SET_SAVE_STATUS";
				payload: T_SaveStatus;
		  }
		| {
				type: "SAVE_ROOM";
				payload: T_WorldInfo;
		  }
		| {
				type: "CAPTURE_IMAGE";
		  }
		| {
				type: "SET_CAPTURED_IMAGE";
				payload: string;
		  }
		| {
				type: "CHANGE_USER_NAME";
				payload: string;
		  }
		| {
				type: "TOGGLE_MIC";
		  }
		| {
				type: "TOGGLE_VOICE";
		  };
}
