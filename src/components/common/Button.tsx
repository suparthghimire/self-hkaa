import { ButtonProps, Button as MantineButton } from "@mantine/core";
import React from "react";
type T_Props = ButtonProps & React.DOMAttributes<HTMLButtonElement>;

const Button: React.FC<T_Props> = (props) => {
	const buttonStyle = {
		padding: "12px 24px",
		fontSize: "20px",
		fontWeight: 500,
		height: "auto",
	};
	return (
		<MantineButton
			radius={8}
			uppercase
			styles={() => {
				return {
					root: buttonStyle,
				};
			}}
			{...props}
		/>
	);
};

export default Button;
