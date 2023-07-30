import { MODES, T_Modes } from "@/lib/data/constants";
import { rem } from "@mantine/core";
import CommonUI from "./common/CommonUI";
import CreatorUI from "./creator/CreatorUI.template";
import VisitorUI from "./visitor/VisitorUI";

export const MARGIN = rem(40);

export const getMarginStyle = (
	ydir: "top" | "bottom",
	xdir: "left" | "right"
) => ({
	[xdir]: MARGIN,
	[ydir]: MARGIN,
});
type T_Props = {
	mode: T_Modes;
};
const ExperienceUI: React.FC<T_Props> = (props) => {
	return (
		<>
			<CommonUI />
			{props.mode === MODES.CREATOR && <CreatorUI />}
			{props.mode === MODES.VISITOR && <VisitorUI />}
		</>
	);
};

export default ExperienceUI;
