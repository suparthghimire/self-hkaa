import { ImageProps } from "next/image";
import React from "react";
import ImageViewer from "./ImageViewer";

type T_Props = Omit<ImageProps, "src"> & {
	image: File | string;
};
const DisplayImage: React.FC<T_Props> = (props) => {
	return (
		<ImageViewer
			{...props}
			src={
				typeof props.image === "string"
					? props.image
					: URL.createObjectURL(props.image)
			}
		/>
	);
};

export default DisplayImage;
