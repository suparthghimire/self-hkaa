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

const ExperienceContext = createContext<T_Experience>({} as T_Experience);

const initialState: T_Experience = {
	info: {
		slug: "",
		roomId: "",
		layoutId: "",
		mode: MODES.VISITOR,
	},
	iframeRef: null,
	hasLoaded: false,
	loaded: () => {},
	setRoomInfo: (_: T_ExperienceInfo) => {},
	setIframeRef: () => {},
};

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
			}}
		>
			{props.children}
		</ExperienceContext.Provider>
	);
};

export default ExperienceProvider;

export const useExperience = () => useContext(ExperienceContext);
