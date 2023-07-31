import { Button, ButtonProps, rem } from "@mantine/core";

type T_Props = ButtonProps & React.DOMAttributes<HTMLButtonElement>;

const ButtonExperience: React.FC<T_Props> = (props) => {
	return (
		<Button
			{...props}
			radius={rem(16)}
			color="blue.1"
			styles={() => ({
				root: {
					textTransform: "uppercase",
					padding: "16px 24px 16px 20px",
					height: "auto",
				},
			})}
		/>
	);
};

export default ButtonExperience;
