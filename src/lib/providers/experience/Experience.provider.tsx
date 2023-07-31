import { MODES } from "@/lib/data/constants";
import useExperienceEventListener from "@/lib/hooks/useEventListener";
import {
	T_Experience,
	T_ExperienceInfo,
	T_HotspotAssetSend,
	T_HotspotSelect,
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

const initialState: T_Experience = {
	chatMessages: [],
	hasLoaded: false,
	iframeRef: null,
	hotspotInfo: {
		selectedAsset: null,
	},
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
	userInfo: {
		name: "",
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
	setErrorText: () => {},
	setLoadingText: () => {},
	sendHotspotAssetSelected: () => {},
	setSelectedHotspot: () => {},
	toggleMic: () => {},
	toggleVoice: () => {},
	changeUserName: () => {},
	captureImage: () => {},
	saveStatus: "idle",
	setSaveStatus: () => {},
	saveRoom: () => {},
	setWorldInfo: () => {},
	loaded: () => {},
	sendChatMessage: () => {},
	setIframeRef: () => {},
	setRoomInfo: () => {},
};
const ExperienceContext = createContext<T_Experience>(
	initialState as T_Experience
);

const ExperienceProvider: React.FC<PropsWithChildren> = (props) => {
	const [state, dispatch] = useReducer(reducer, initialState);

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

	const changeUserName = useCallback(
		(name: string) =>
			dispatch({
				type: "CHANGE_USER_NAME",
				payload: name,
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
				changeUserName,
				toggleMic,
				toggleVoice,
				sendHotspotAssetSelected,
				setSelectedHotspot,
				setErrorText,
				setLoadingText,
			}}
		>
			{props.children}
		</ExperienceContext.Provider>
	);
};

export default ExperienceProvider;

export const useExperience = () => useContext(ExperienceContext);
