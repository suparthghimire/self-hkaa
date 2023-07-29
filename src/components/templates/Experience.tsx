import { IFRAME_ENDPOINT } from "@/lib/config";
import { HKAA_LAYOUT, MODES, T_Modes } from "@/lib/data/constants";
import { JoinParams } from "@/lib/helpers";
import useSessionToken from "@/lib/hooks/useSessionToken";
import { useExperience } from "@/lib/providers/experience/Experience.provider";
import React, { useEffect, useMemo } from "react";
import ExperienceUI from "../experience/design/UI/ExperienceUI";
import ExperienceLoading from "../experience/design/common/Loading";
type T_Props = {
	mode: T_Modes;
	roomSlug: string;
	accessToken?: string;
	leaveUrl: string;
};
const Experience: React.FC<T_Props> = (props) => {
	const { hasLoaded, setIframeRef, setLeaveUrl, setRoomInfo } = useExperience();
	const iframeRef = React.useRef<HTMLIFrameElement>(null);

	const {
		isLoading: tokenLoading,
		isError,
		isSuccess,
		accessToken,
		sessionToken,
		roomId,
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
		if (isError || !isSuccess || showLoadingScreen) return;
		console.log("PROPS MODE", props.mode);
		setRoomInfo({
			layoutId: HKAA_LAYOUT,
			leaveUrl: props.leaveUrl,
			roomId: roomId,
			mode: props.mode,
			slug: props.roomSlug,
		});
	}, [isError, isSuccess, showLoadingScreen]);

	useEffect(() => {
		if (iframeRef.current) {
			console.log("SETTING IFRAME REF", iframeRef.current);
			setIframeRef(iframeRef);
		}
	}, [iframeRef]);

	useEffect(() => {
		setLeaveUrl(props.mode === MODES.CREATOR ? "/admin" : "/");
	}, [props.mode]);

	return (
		<div className="absolute w-screen h-screen top-0 bg-neutral-100 z-[100]">
			{showLoadingScreen && <ExperienceLoading />}
			{isSuccess && (
				<>
					<iframe
						ref={iframeRef}
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
					{!showLoadingScreen && <ExperienceUI mode={props.mode} />}
				</>
			)}
		</div>
	);
};

export default Experience;
