import { ActionIcon, ActionIconProps } from "@mantine/core";
type T_Props = ActionIconProps & React.DOMAttributes<HTMLButtonElement>;
const ExperienceIconButton: React.FC<T_Props> = (props) => {
	return (
		<ActionIcon color="blue.1" size="xl" variant="filled" radius={10000}>
			{props.children}
		</ActionIcon>
	);
};

export default ExperienceIconButton;
