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
	}
}
