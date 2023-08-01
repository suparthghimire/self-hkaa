import { FONT_FAMILY } from "@/lib/data/constants";
import { Tabs, TabsProps } from "@mantine/core";

const StyledTabs: React.FC<TabsProps> = (props) => {
	return (
		<Tabs
			unstyled
			styles={(theme) => ({
				root: {
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				},
				tab: {
					border: 0,
					backgroundColor: "transparent",
					fontSize: "20px",
					fontWeight: 500,
					cursor: "pointer",
					padding: 0,
					paddingBottom: "8px",
					fontFamily: FONT_FAMILY,

					"&[data-active]": {
						borderBottom: `3px solid ${theme.colors.blue[0]}`,
						fontWeight: 600,
					},
				},
				tabsList: {
					display: "inline-flex",
					gap: "80px",
				},
			})}
			{...props}
		/>
	);
};

export default StyledTabs;
