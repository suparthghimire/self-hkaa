// this component should be used to view image. Backend can change anytime to support image potimization

import Image, { ImageProps } from "next/image";
import React from "react";

const ImageViewer: React.FC<ImageProps> = (props) => {
	return <Image {...props} />;
};

export default ImageViewer;
