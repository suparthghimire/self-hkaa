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
				value: actions.payload,
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
		case "SEND_HOTSPOT_ASSET": {
			const message = {
				key: "hotspotselected",
				value: actions.payload,
			};
			iframePostMessage(message);
			return state;
		}
		case "SET_HOTSPOT_ASSET": {
			const hotspot = actions.payload;
			return {
				...state,
				hotspotInfo: {
					...state.hotspotInfo,
					selectedAsset: hotspot,
				},
			};
		}
		case "SET_LOADING_TEXT": {
			return {
				...state,
				status: {
					...state.status,
					loadingText: actions.payload,
				},
			};
		}
		case "SET_ERROR_TEXT": {
			return {
				...state,
				status: {
					...state.status,
					errorText: actions.payload,
				},
			};
		}
		case "DROP_ASSET": {
			const asset = actions.payload as any;
			// rename id key to dbid
			asset.dbid = asset.id;
			delete asset.id;

			const message = {
				key: "dropasset",
				value: asset,
			};
			iframePostMessage(message);
			return state;
		}
		case "RECEIVE_SELECT":
		case "SEND_SELECTED": {
			const asset = actions.payload;
			const message = {
				key: "selected",
				value: asset.id,
			};
			iframePostMessage(message);
			return {
				...state,
				asset: {
					...state.asset,
					selected: asset,
				},
			};
		}
		case "RECEIVE_DESELECT":
		case "SEND_DESELECTED": {
			const asset = state.asset.selected;
			if (!asset) return state;

			const message = {
				key: "deselected",
				value: asset.id,
			};
			iframePostMessage(message);
			return {
				...state,
				asset: {
					...state.asset,
					selected: null,
				},
			};
		}
		case "UPDATE_ASSET": {
			const { type, value } = actions.payload;
			const message = {
				key: type,
				value: value,
			};
			iframePostMessage(message);
			return state;
		}
		case "SET_SELECTED_ASSET": {
			const asset = actions.payload;
			return {
				...state,
				asset: {
					...state.asset,
					selected: asset,
				},
			};
		}
		case "SEND_ASSET_META": {
			const selectedAsset = state.asset.selected;

			if (!selectedAsset) return state;
			const message = {
				key: "assetmeta",
				value: {
					id: selectedAsset.id,
					value: actions.payload,
				},
			};
			iframePostMessage(message);

			return state;
		}
		case "UPDATE_AVATAR": {
			const data = actions.payload;
			const message = {
				key: "updateavatar",
				value: data,
			};
			iframePostMessage(message);
			return {
				...state,
				avatarInfo: data,
			};
		}
	}
}
