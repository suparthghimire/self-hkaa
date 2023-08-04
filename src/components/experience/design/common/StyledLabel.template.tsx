import { Text, TextProps } from "@mantine/core";

const StyledLabel: React.FC<TextProps> = (props) => {
	return (
		<Text
			size={14}
			weight={600}
			color="gray.6"
			className="uppercase"
			{...props}
		/>
	);
};

export default StyledLabel;
