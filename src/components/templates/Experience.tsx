import { IFRAME_ENDPOINT } from "@/lib/config";
import { T_Modes } from "@/lib/data/constants";
import { JoinParams } from "@/lib/helpers";
import useSessionToken from "@/lib/hooks/useSessionToken";
import { useExperience } from "@/lib/providers/experience/Experience.provider";
import React, { useEffect, useMemo } from "react";
import ExperienceLoading from "../experience/design/common/Loading";
type T_Props = {
	mode: T_Modes;
	roomSlug: string;
	accessToken?: string;
	leaveUrl: string;
};
const Experience: React.FC<T_Props> = (props) => {
	const { info, hasLoaded, setIframeRef } = useExperience();
	const iframeRef = React.useRef<HTMLIFrameElement>(null);

	const {
		isLoading: tokenLoading,
		isError,
		isSuccess,
		accessToken,
		sessionToken,
	} = useSessionToken({
		mode: props.mode,
		slug: props.roomSlug,
		accessToken: props.accessToken,
	});

	const showLoadingScreen = useMemo(
		() => tokenLoading || !hasLoaded,
		[tokenLoading, hasLoaded]
	);

	useEffect(() => {
		if (!iframeRef.current) return;
		setIframeRef(iframeRef);
	}, [iframeRef]);

	return (
		<div className="absolute w-screen h-screen top-0 bg-neutral-100 z-[9999999999999999999999]">
			{showLoadingScreen && <ExperienceLoading />}
			{isSuccess && (
				<iframe
					className="absolute top-0 left-0 w-full h-full"
					src={JoinParams(
						IFRAME_ENDPOINT,
						{
							code: sessionToken,
						},
						["noui"]
					)}
					style={{
						transform: showLoadingScreen ? "scale(0)" : "scale(1)",
					}}
				/>
			)}
		</div>
	);
};

export default Experience;
