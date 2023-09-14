import { MODES } from "@/lib/data/constants";
import useExperienceEventListener from "@/lib/hooks/useEventListener";
import { T_AvatarSchema } from "@/schema/avatar.schema";
import {
	T_Experience,
	T_ExperienceAsset,
	T_ExperienceInfo,
	T_HotspotAssetSend,
	T_HotspotSelect,
	T_TransformType,
	T_WorldInfo,
} from "@experience/types";
import {
	PropsWithChildren,
	createContext,
	useCallback,
	useContext,
	useReducer,
} from "react";
import reducer from "./Experience.reducer";
const defaultAvatarInfo = {
	avatar: {
		avatarid: "Round",
		color: {
			brightness: 1,
			cycle: false,
			hue: 100,
		},
	},
	label: {
		color: {
			brightness: 1,
			cycle: false,
			hue: 100,
		},
		name: "",
	},
};
const initialState: T_Experience = {
	chatMessages: [],
	hasLoaded: false,
	iframeRef: null,
	hotspotInfo: {
		selectedAsset: null,
	},
	avatarInfo: defaultAvatarInfo,
	roomInfo: {
		layoutId: "",
		leaveUrl: "",
		mode: MODES.VISITOR,
		roomId: "",
		slug: "",
		accessToken: "",
	},
	audio: {
		micEnabled: false,
		voiceEnabled: false,
	},

	worldInfo: {
		description: "",
		image: "",
		published: false,
		name: "",
		urlshortcode: "",
	},
	status: {
		loadingText: null,
		errorText: null,
	},
	updateAvatar: () => {},
	setErrorText: () => {},
	setLoadingText: () => {},
	sendHotspotAssetSelected: () => {},
	setSelectedHotspot: () => {},
	toggleMic: () => {},
	toggleVoice: () => {},
	captureImage: () => {},
	saveStatus: "idle",
	setSaveStatus: () => {},
	saveRoom: () => {},
	setWorldInfo: () => {},
	loaded: () => {},
	sendChatMessage: () => {},
	setIframeRef: () => {},
	setRoomInfo: () => {},
	asset: {
		selected: null,
	},
	dropAsset: () => {},
	receiveSelect: () => {},
	sendSelected: () => {},
	sendDeselected: () => {},
	updateAsset: () => {},
	sendAssetMeta: () => {},
};
const ExperienceContext = createContext<T_Experience>(
	initialState as T_Experience
);

const ExperienceProvider: React.FC<PropsWithChildren> = (props) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	// save avatar when ui loads from localstorage

	const setRoomInfo = useCallback(
		(info: T_ExperienceInfo) =>
			dispatch({
				type: "SET_ROOM_INFO",
				payload: info,
			}),
		[]
	);
	const setIframeRef = useCallback(
		(ref: React.RefObject<HTMLIFrameElement>) =>
			dispatch({
				type: "SET_IFRAME_REF",
				payload: ref,
			}),
		[]
	);

	const sendChatMessage = useCallback(
		(chat: string) =>
			dispatch({
				type: "SEND_CHAT_MESSAGE",
				payload: chat,
			}),
		[]
	);

	const setWorldInfo = useCallback(
		(info: T_WorldInfo) =>
			dispatch({
				type: "SET_WORLD_INFO",
				payload: info,
			}),
		[]
	);
	const saveRoom = useCallback(
		(info: T_WorldInfo) =>
			dispatch({
				type: "SAVE_ROOM",
				payload: info,
			}),
		[]
	);
	const setSaveStatus = useCallback(
		(status: "idle" | "loading" | "success" | "error") =>
			dispatch({
				type: "SET_SAVE_STATUS",
				payload: status,
			}),
		[]
	);
	const captureImage = useCallback(
		() =>
			dispatch({
				type: "CAPTURE_IMAGE",
			}),
		[]
	);

	const toggleMic = useCallback(
		() =>
			dispatch({
				type: "TOGGLE_MIC",
			}),
		[]
	);
	const toggleVoice = useCallback(
		() =>
			dispatch({
				type: "TOGGLE_VOICE",
			}),
		[]
	);
	const sendHotspotAssetSelected = useCallback(
		(asset: T_HotspotAssetSend) =>
			dispatch({
				type: "SEND_HOTSPOT_ASSET",
				payload: asset,
			}),
		[]
	);
	const setSelectedHotspot = useCallback(
		(hotspot: T_HotspotSelect | null) =>
			dispatch({
				type: "SET_HOTSPOT_ASSET",
				payload: hotspot,
			}),
		[]
	);

	const setErrorText = useCallback(
		(text: string | null) =>
			dispatch({
				type: "SET_ERROR_TEXT",
				payload: text,
			}),
		[]
	);
	const setLoadingText = useCallback(
		(text: string | null) =>
			dispatch({
				type: "SET_LOADING_TEXT",
				payload: text,
			}),
		[]
	);

	const dropAsset = useCallback(
		(asset: T_ExperienceAsset) =>
			dispatch({
				type: "DROP_ASSET",
				payload: asset,
			}),
		[]
	);

	const receiveSelect = useCallback(
		(asset: T_ExperienceAsset) =>
			dispatch({
				type: "RECEIVE_SELECT",
				payload: asset,
			}),
		[]
	);
	const sendSelected = useCallback(
		(asset: T_ExperienceAsset) =>
			dispatch({
				type: "SEND_SELECTED",
				payload: asset,
			}),
		[]
	);
	const sendDeselected = useCallback(
		(asset: T_ExperienceAsset) =>
			dispatch({
				type: "SEND_DESELECTED",
				payload: asset,
			}),
		[]
	);
	const updateAsset = useCallback(
		(data: { type: T_TransformType; value: number }) =>
			dispatch({
				type: "UPDATE_ASSET",
				payload: data,
			}),
		[]
	);
	const sendAssetMeta = useCallback((data: { [key: string]: any }) => {
		dispatch({
			type: "SEND_ASSET_META",
			payload: data,
		});
	}, []);
	const updateAvatar = useCallback((data: T_AvatarSchema) => {
		dispatch({
			type: "UPDATE_AVATAR",
			payload: data,
		});
	}, []);

	// const sendAssetMeta = useCallback((data: { [key: string]: any }) => {
	// 	console.log("SEND ASSET META");
	// 	dispatch({
	// 		type: "SEND_ASSET_META",
	// 		payload: data,
	// 	});
	// }, []);

	useExperienceEventListener(dispatch);

	return (
		<ExperienceContext.Provider
			value={{
				...state,
				setRoomInfo,
				setIframeRef,
				sendChatMessage,
				setWorldInfo,
				saveRoom,
				setSaveStatus,
				captureImage,
				toggleMic,
				toggleVoice,
				sendHotspotAssetSelected,
				setSelectedHotspot,
				setErrorText,
				setLoadingText,
				dropAsset,
				receiveSelect,
				sendSelected,
				sendDeselected,
				updateAsset,
				sendAssetMeta,
				updateAvatar,
			}}
		>
			{props.children}
		</ExperienceContext.Provider>
	);
};

export default ExperienceProvider;

export const useExperience = () => useContext(ExperienceContext);
