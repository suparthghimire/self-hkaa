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

const initialState = {} as T_Experience;
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
			}}
		>
			{props.children}
		</ExperienceContext.Provider>
	);
};

export default ExperienceProvider;

export const useExperience = () => useContext(ExperienceContext);
