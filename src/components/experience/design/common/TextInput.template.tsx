import { TextInput, TextInputProps } from "@mantine/core";
import React from "react";

const TextInputExperience: React.FC<TextInputProps> = (props) => {
	return (
		<TextInput
			{...props}
			radius={4}
			styles={() => ({
				input: {
					borderColor: "#D1D5DB",
					height: "40px",
				},
				label: {
					marginBottom: "4px",
				},
			})}
		/>
	);
};

export default TextInputExperience;
