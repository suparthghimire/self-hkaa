import { MODES } from "@/lib/data/constants";
import useExperienceEventListener from "@/lib/hooks/useEventListener";
import { T_Experience, T_ExperienceInfo } from "@experience/types";
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
	info: {
		layoutId: "",
		leaveUrl: "",
		mode: MODES.VISITOR,
		roomId: "",
		slug: "",
	},
	loaded: () => {},
	sendChatMessage: () => {},
	setIframeRef: () => {},
	setLeaveUrl: () => {},
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
	const setLeaveUrl = useCallback(
		(leaveUrl: string) =>
			dispatch({
				type: "SET_LEAVE_URL",
				payload: leaveUrl,
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

	useExperienceEventListener(dispatch);

	return (
		<ExperienceContext.Provider
			value={{
				...state,
				info: {
					...state.info,
				},
				setRoomInfo,
				setIframeRef,
				setLeaveUrl,
				sendChatMessage,
			}}
		>
			{props.children}
		</ExperienceContext.Provider>
	);
};

export default ExperienceProvider;

export const useExperience = () => useContext(ExperienceContext);
