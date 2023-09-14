import { ButtonProps, Button as MantineButton, rem } from "@mantine/core";
import React from "react";
type T_Props = ButtonProps & React.DOMAttributes<HTMLButtonElement>;

const Button: React.FC<T_Props> = (props) => {
	return (
		<MantineButton
			radius={rem(8)}
			styles={() => ({
				root: {
					padding: "12px 24px",
					height: "auto",
					minWidth: "146px",
					borderWidth: props.variant === "outline" ? rem(3) : undefined,
				},
				label: {
					fontSize: rem(20),
				},
			})}
			{...props}
		>
			{props.children}
		</MantineButton>
	);
};

export default Button;
