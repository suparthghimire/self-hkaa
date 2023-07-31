import { MODES } from "@/lib/data/constants";
import useExperienceEventListener from "@/lib/hooks/useEventListener";
import { T_Experience, T_ExperienceInfo, T_WorldInfo } from "@experience/types";
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
	roomInfo: {
		layoutId: "",
		leaveUrl: "",
		mode: MODES.VISITOR,
		roomId: "",
		slug: "",
		accessToken: "",
	},
	userInfo: {
		name: "",
	},
	worldInfo: {
		description: "",
		image: "",
		isPublic: false,
		name: "",
		urlshortcode: "",
	},
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
			}}
		>
			{props.children}
		</ExperienceContext.Provider>
	);
};

export default ExperienceProvider;

export const useExperience = () => useContext(ExperienceContext);
