import Save from "@/components/experience/design/controls/creator/save/SaveControl.template";
import Settings from "@/components/experience/design/controls/creator/settings/Settings.template";
import { useExperience } from "@/lib/providers/experience/Experience.provider";
import { Modal, rem } from "@mantine/core";
import { useState } from "react";
import Speaker from "../../controls/visitor/SpeakerControl.template";
import HotspotPanel from "../../panels/HotspotPanel.template";
import { getMarginStyle } from "../ExperienceUI";

const CreatorUI = () => {
	const {
		hotspotInfo: { selectedAsset },
		setSelectedHotspot,
	} = useExperience();
	const [openHotspotModal, setOpenHotspotModal] = useState(false);

	return (
		<>
			<div className="absolute" style={getMarginStyle("bottom", "left")}>
				<Speaker />
			</div>
			<div className="absolute" style={getMarginStyle("top", "right")}>
				<Save />
			</div>
			<div className="absolute" style={getMarginStyle("bottom", "right")}>
				<Settings />
			</div>
			<Modal
				opened={selectedAsset !== null}
				onClose={() => setSelectedHotspot(null)}
				centered
				radius={16}
				size={rem(584)}
				withCloseButton={false}
				padding={rem(40)}
			>
				<HotspotPanel closeHotspotPanel={() => setSelectedHotspot(null)} />
			</Modal>
		</>
	);
};

export default CreatorUI;
