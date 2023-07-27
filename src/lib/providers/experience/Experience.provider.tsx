import { T_Experience } from "@experience/types";
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
		roomId: "",
		setRoomId: (_: string) => {},
	},
	isOpen: false,
	closeExperience: () => {},
	openExperience: () => {},
};

const ExperienceProvider: React.FC<PropsWithChildren> = (props) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const openExperience = useCallback(
		() =>
			dispatch({
				type: "OPEN_EXPERIENCE",
			}),
		[]
	);
	const closeExperience = useCallback(
		() =>
			dispatch({
				type: "CLOSE_EXPERIENCE",
			}),
		[]
	);
	const setRoomId = useCallback(
		(roomId: string) =>
			dispatch({
				type: "SET_ROOM_INFO",
				payload: roomId,
			}),
		[]
	);
	return (
		<ExperienceContext.Provider
			value={{
				...state,
				closeExperience,
				openExperience,
				info: {
					...state.info,
					setRoomId,
				},
			}}
		>
			{props.children}
		</ExperienceContext.Provider>
	);
};

export default ExperienceProvider;

export const useExperience = () => useContext(ExperienceContext);
