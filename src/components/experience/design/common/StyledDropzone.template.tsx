import { rem } from "@mantine/core";
import { Dropzone, DropzoneProps } from "@mantine/dropzone";

const StyledDropzone: React.FC<
	DropzoneProps & {
		height?: string;
		width?: string;
	}
> = (props) => {
	return (
		<Dropzone
			padding={rem(24)}
			radius={4}
			styles={() => ({
				root: {
					height: props.height ?? rem(187),
					width: props.width ?? rem(187),
					display: "grid",
					border: "none",
					placeItems: "center",
				},
			})}
			{...props}
		/>
	);
};
export default StyledDropzone;
