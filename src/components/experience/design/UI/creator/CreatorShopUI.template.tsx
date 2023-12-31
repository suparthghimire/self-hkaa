import Save from "@/components/experience/design/controls/creator/save/SaveControl.template";
import Settings from "@/components/experience/design/controls/creator/settings/Settings.template";
import { useExperience } from "@/lib/providers/experience/Experience.provider";
import AddAsset from "../../controls/creator/shop/add/AddControl.template";
import AssetHandle from "../../controls/creator/shop/assetHandle/AssetHandleControl.template";
import Cart from "../../controls/creator/shop/cart/CartControl.template";
import Delete from "../../controls/creator/shop/delete/DeleteControl.template";
import Deselect from "../../controls/creator/shop/deselect/DeselectControl.template";
import { getMarginStyle } from "../ExperienceUI";

const CreatorShopUI = () => {
	const {
		asset: { selected },
	} = useExperience();
	return (
		<>
			<div className="absolute" style={getMarginStyle("top", "right")}>
				<Save />
			</div>
			<div className="absolute" style={getMarginStyle("bottom", "right")}>
				<Settings />
			</div>
			<div
				className="absolute flex gap-[20px] flex-col"
				style={getMarginStyle("bottom", "left")}
			>
				{selected && (
					<>
						<Deselect />
						<Delete />
						<Cart />
						<AssetHandle />
					</>
				)}
				<AddAsset />
			</div>
		</>
	);
};

export default CreatorShopUI;
