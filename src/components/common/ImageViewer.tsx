// this component should be used to view image. Backend can change anytime to support image potimization

import { ReplaceWithPrefixUrl } from "@/lib/helpers";
import { usePrefixUrl } from "@/lib/providers/PrefixUrlProvider";
import Image, { ImageProps } from "next/image";
import React from "react";
const ImageViewer: React.FC<ImageProps> = (props) => {
	const prefixUrl = usePrefixUrl();

	let prefixedSrc = ReplaceWithPrefixUrl(
		prefixUrl?.urlprefix.roomassets,
		props.src.toString()
	);

	return <Image {...props} src={prefixedSrc} />;
};

export default ImageViewer;
