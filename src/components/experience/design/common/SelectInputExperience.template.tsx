import { Select, SelectProps } from "@mantine/core";
import React from "react";

const SelectInputExperience: React.FC<SelectProps> = (props) => {
	return (
		<Select
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

export default SelectInputExperience;
