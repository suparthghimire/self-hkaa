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
	export type T_HotspotAssetType =
		| "2d"
		| "2dai"
		| "3d"
		| "audio"
		| "video"
		| "stream";
	export type T_HotspotSelect = {
		assettype: T_HotspotAssetType;
		targetname: string;
		targetpath: string[];
		targetpos: [number, number, number];
	};
	export type T_HotspotAssetSend = T_HotspotSelect & {
		value: {
			source: T_HotspotAssetType;
			url?: string;
			[other: string]: any;
		};
	};
	export type T_Experience = {
		roomInfo: T_ExperienceInfo;
		worldInfo: T_WorldInfo;
		userInfo: T_UserInfo;
		hotspotInfo: T_HotspotInfo;

		setSelectedHotspot: (hotspot: T_HotspotSelect | null) => void;
		sendHotspotAssetSelected: (hotspotAsset: T_HotspotAssetSend) => void;

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

		status: {
			loadingText: string | null;
			errorText: string | null;
		};
		setLoadingText: (text: string | null) => void;
		setErrorText: (text: string | null) => void;
	};

	export type T_HotspotInfo = {
		selectedAsset: T_HotspotSelect | null;
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
		published: boolean;
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
		  }
		| {
				type: "SET_HOTSPOT_ASSET";
				payload: T_HotspotSelect | null;
		  }
		| {
				type: "SEND_HOTSPOT_ASSET";
				payload: T_HotspotAssetSend;
		  }
		| {
				type: "SET_LOADING_TEXT";
				payload: string | null;
		  }
		| {
				type: "SET_ERROR_TEXT";
				payload: string | null;
		  };
}
