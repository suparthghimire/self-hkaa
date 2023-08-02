import { MODES, T_Modes } from "@/lib/data/constants";
import useShowStatusNotification from "@/lib/hooks/useShowStatusNotification";
import { useExperience } from "@/lib/providers/experience/Experience.provider";
import { rem } from "@mantine/core";
import CommonUI from "./common/CommonUI";
import CreatorShopUI from "./creator/CreatorShopUI.template";

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
const ExperienceShopUI: React.FC<T_Props> = (props) => {
	const {
		status: { errorText, loadingText },
		setLoadingText,
		setErrorText,
	} = useExperience();

	useShowStatusNotification({
		loading: {
			status: loadingText !== null,
			text: loadingText ?? "",
			onClose: () => setLoadingText(null),
		},
		error: {
			status: errorText !== null,
			text: errorText ?? "",
			onClose: () => setErrorText(null),
		},
		success: {
			status: false,
			text: "",
		},
	});

	return (
		<>
			<CommonUI />
			{props.mode === MODES.CREATOR && <CreatorShopUI />}
		</>
	);
};

export default ExperienceShopUI;
