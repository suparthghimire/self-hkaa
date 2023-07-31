import { T_Actions, T_Experience } from "@experience/types";

export default function reducer(
	state: T_Experience,
	actions: T_Actions
): T_Experience {
	function iframePostMessage(msg: {
		key: string;
		value: number | string | boolean | object;
	}) {
		console.log(state.iframeRef);
		if (state.iframeRef) {
			console.log("[WEB UI] POSTING", msg);
			state.iframeRef.current?.contentWindow?.postMessage(
				JSON.stringify(msg),
				"*"
			);
		}
	}

	switch (actions.type) {
		case "SET_ROOM_INFO":
			console.log("SET_ROOM_INFO", actions.payload);
			return {
				...state,
				roomInfo: actions.payload,
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
		case "SEND_CHAT_MESSAGE": {
			const message = {
				key: "chat",
				value: actions.payload,
			};
			iframePostMessage(message);
			return state;
		}
		case "SET_CHAT_MESSAGE": {
			const chat = actions.payload;
			const currentChat = state.chatMessages;
			currentChat.push(chat);
			return {
				...state,
				chatMessages: currentChat,
			};
		}
		case "SET_WORLD_INFO": {
			return {
				...state,
				worldInfo: actions.payload,
			};
		}
		case "SAVE_ROOM": {
			const message = {
				key: "saveroom",
				value: {
					...actions.payload,
					public: actions.payload.isPublic,
				},
			};

			iframePostMessage(message);
			return {
				...state,
				worldInfo: actions.payload,
				saveStatus: "loading",
			};
		}
		case "SET_SAVE_STATUS": {
			return {
				...state,
				saveStatus: actions.payload,
			};
		}
		case "CAPTURE_IMAGE": {
			const message = {
				key: "captureimage",
				value: "",
			};

			iframePostMessage(message);
			return state;
		}
		case "SET_CAPTURED_IMAGE": {
			return {
				...state,
				worldInfo: {
					...state.worldInfo,
					image: actions.payload,
				},
			};
		}
		case "CHANGE_USER_NAME": {
			const message = {
				key: "alias",
				value: actions.payload,
			};
			iframePostMessage(message);
			return {
				...state,
				worldInfo: {
					...state.worldInfo,
				},
				userInfo: {
					...state.userInfo,
					name: actions.payload,
				},
			};
		}
		case "TOGGLE_MIC": {
			const currMicVal = state.audio.micEnabled;
			const newMicVal = !currMicVal;
			const message = {
				key: "voicetoggle",
				value: newMicVal,
			};
			iframePostMessage(message);
			return {
				...state,
				audio: {
					...state.audio,
					micEnabled: newMicVal,
				},
			};
		}
		case "TOGGLE_VOICE": {
			const currVoiceVal = state.audio.voiceEnabled;
			const newVoiceVal = !currVoiceVal;
			const message = {
				key: "audio",
				value: newVoiceVal,
			};
			iframePostMessage(message);
			return {
				...state,
				audio: {
					...state.audio,
					voiceEnabled: newVoiceVal,
				},
			};
		}
	}
}
