import { Text } from "@mantine/core";
import { memo, useMemo } from "react";
import ReactPlayer from "react-player";
import AssetViewer3d from "./AssetViewer3d.template";

const AssetViewer: React.FC<{ url: string; fileType: string }> = (props) => {
	const Render = useMemo(() => {
		console.log("FIL:E TYPE", props.fileType);
		switch (props.fileType) {
			case "url":
				return (
					<div className="w-full h-full grid place-items-center">
						<Text size="16">We cant display asset from URL</Text>
					</div>
				);
			case "image/png":
			case "image/jpg":
			case "image/jpeg":
			case "image/webp":
				return <ImageViewer url={props.url} />;
			case "video/mp4":
			case "video/mkv":
			case "audio/mp3":
			case "audio/wav":
			case "audio/mpeg":
				return <AudioVideoViewer url={props.url} />;
			case "glb":
				return <ThreeDViewer url={props.url} />;
			default:
				return (
					<div className="w-full h-full grid place-items-center">
						<Text size="16">Invalid File Type</Text>
					</div>
				);
		}
	}, [props.url, props.fileType]);

	return (
		<div
			style={{
				border: "2px solid #ededed",
			}}
			className="w-full h-[207px] roudned-[8px]"
		>
			{Render}
		</div>
	);
};

const ImageViewer: React.FC<{ url: string }> = (props) => {
	return (
		<img
			src={props.url}
			className="object-cover w-full h-full object-center rounded-[8px]"
			alt="Placeholder Image"
		/>
	);
};

const AudioVideoViewer: React.FC<{ url: string }> = (props) => {
	return (
		<ReactPlayer
			url={props.url}
			width="100%"
			height="100%"
			style={{
				borderRadius: "8px",
			}}
			controls
			alt="Placeholder Image"
		/>
	);
};
const ThreeDViewer: React.FC<{ url: string }> = (props) => {
	return <AssetViewer3d url={props.url} />;
};

export default memo(AssetViewer);
