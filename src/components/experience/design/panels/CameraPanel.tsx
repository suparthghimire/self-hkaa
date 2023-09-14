import { Select, Switch, Tabs, Text } from "@mantine/core";
import { IconVideo } from "@tabler/icons-react";
import StyledTabs from "../common/StyledTabs.template";

const CameraPanel = () => {
	return (
		<div className="w-[396px] h-[548px]">
			<StyledTabs defaultValue="web_cam">
				<Tabs.List className="mb-6" grow>
					<Tabs.Tab value="web_cam">Web Cam</Tabs.Tab>
					<Tabs.Tab value="screen_share">Share Screen</Tabs.Tab>
				</Tabs.List>
				<div className="grid gap-[32px] h-full w-full">
					<Tabs.Panel value="web_cam">
						<WebCam />
					</Tabs.Panel>
					<Tabs.Panel value="screen_share">
						<ScreenShare />
					</Tabs.Panel>
				</div>
			</StyledTabs>
		</div>
	);
};

const WebCam = () => {
	return (
		<div className="grid gap-[24px]">
			<div className="grid gap-[12px]">
				<div className="grid gap-[2px] items-end">
					<Text color="gray.7">SELECT VIDEO</Text>
					<div className="flex gap-[12px] items-center">
						<Select
							w="100%"
							styles={() => ({
								input: {
									padding: "8px 16px",
									height: "40px",
								},
							})}
							defaultValue="1"
							data={[
								{
									value: "1",
									label: "Facetime HD Camera",
								},
								{
									value: "2",
									label: "Logitech HD Pro Webcam C920",
								},
							]}
						/>
						<IconVideo />
						<Switch />
					</div>
				</div>
				<div className="grid gap-[2px] items-end">
					<Text color="gray.7">SELECT AUDIO</Text>
					<div className="flex gap-[12px] items-center">
						<Select
							w="100%"
							styles={() => ({
								input: {
									padding: "8px 16px",
									height: "40px",
								},
							})}
							defaultValue="1"
							data={[
								{
									value: "1",
									label: "MACBOOK PRO - Default Audio",
								},
								{
									value: "2",
									label: "Snowball - USB Microphone",
								},
							]}
						/>
						<IconVideo />
						<Switch />
					</div>
				</div>
			</div>
		</div>
	);
};

const ScreenShare = () => {
	return <div className="w-full h-full">Screen Share</div>;
};

export default CameraPanel;
