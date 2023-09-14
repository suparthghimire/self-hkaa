import { IFRAME_ENDPOINT } from "@/lib/config";
import { HKAA_LAYOUT, T_Modes } from "@/lib/data/constants";
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
	ui?: React.ReactNode;
	sessionTokenData?: {
		[key: string]: any;
	};
};
const Experience: React.FC<T_Props> = (props) => {
	const { hasLoaded, setIframeRef, setRoomInfo } = useExperience();
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
		extraData: props.sessionTokenData,
	});
	const showLoadingScreen = useMemo(
		() => tokenLoading || !hasLoaded,
		[tokenLoading, hasLoaded]
	);

	useEffect(() => {
		if (isError || !isSuccess || showLoadingScreen) return;
		setRoomInfo({
			layoutId: HKAA_LAYOUT,
			leaveUrl: props.leaveUrl,
			roomId: roomId,
			mode: props.mode,
			slug: props.roomSlug,
			accessToken: accessToken,
		});
	}, [isError, isSuccess, showLoadingScreen]);

	useEffect(() => {
		if (iframeRef.current) {
			console.log("SETTING IFRAME REF", iframeRef.current);
			setIframeRef(iframeRef);
		}
	}, [iframeRef]);

	return (
		<div className="absolute w-screen h-screen top-0 bg-neutral-100 z-[100] overflow-hidden">
			<>
				{showLoadingScreen && <ExperienceLoading />}
				<iframe
					ref={iframeRef}
					className="absolute top-0 left-0 w-full h-full"
					src={
						isSuccess
							? JoinParams(
									IFRAME_ENDPOINT,
									{
										code: sessionToken,
									},
									["noui"]
							  )
							: "#"
					}
					style={{
						transform: showLoadingScreen ? "scale(0)" : "scale(1)",
					}}
					allow="camera; microphone; display-capture; autoplay; clipboard-write"
				/>
				{!showLoadingScreen && (props.ui ?? <ExperienceUI mode={props.mode} />)}
			</>
		</div>
	);
};

export default Experience;
