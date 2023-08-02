import { NumberInput, Slider, SliderProps, Text, rem } from "@mantine/core";

const StyledSlider: React.FC<SliderProps> = (props) => {
	return (
		<Slider
			{...props}
			styles={(theme) => ({
				thumb: {
					border: 0,
					backgroundColor: theme.colors.blue[9],
				},
				bar: {
					backgroundColor: theme.colors.gray[2],
				},
			})}
		/>
	);
};

type T_Props = {
	label: string;
};
const InputControl: React.FC<T_Props> = (props) => {
	return (
		<div className="w-full grid gap-[12px]">
			<div className="grid gap-[10px]">
				<div className="flex justify-between items-start">
					<Text size={16} weight={400}>
						{props.label}
					</Text>
					<NumberInput
						hideControls
						defaultValue={50}
						styles={() => ({
							root: {
								width: rem(40),
								height: "auto",
								padding: 0,
							},
						})}
					/>
				</div>
				<StyledSlider max={100} min={0} defaultValue={50} />
			</div>
		</div>
	);
};

export default InputControl;
