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
		case "SEND_CHAT_MESSAGE": {
			const message = {
				key: "chat",
				value: actions.payload,
			};
			console.log("[WEB UI] SENDING", message);
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
	}
}
