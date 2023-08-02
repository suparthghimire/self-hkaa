import Save from "@/components/experience/design/controls/creator/save/SaveControl.template";
import Settings from "@/components/experience/design/controls/creator/settings/Settings.template";
import { rem } from "@mantine/core";
import AddAsset from "../../controls/creator/shop/add/AddControl.template";
import AssetHandle from "../../controls/creator/shop/assetHandle/AssetHandleControl.template";
import Cart from "../../controls/creator/shop/cart/CartControl.template";
import Delete from "../../controls/creator/shop/delete/DeleteControl.template";
import { MARGIN, getMarginStyle } from "../ExperienceUI";

const CreatorShopUI = () => {
	return (
		<>
			<div className="absolute" style={getMarginStyle("bottom", "left")}>
				<AddAsset />
			</div>
			<div className="absolute" style={getMarginStyle("top", "right")}>
				<Save />
			</div>
			<div className="absolute" style={getMarginStyle("bottom", "right")}>
				<Settings />
			</div>
			<div
				className="absolute"
				style={{
					left: MARGIN,
					bottom: rem(100),
				}}
			>
				<AssetHandle />
			</div>
			<div
				className="absolute"
				style={{
					left: MARGIN,
					bottom: rem(160),
				}}
			>
				<Cart />
			</div>
			<div
				className="absolute"
				style={{
					left: MARGIN,
					bottom: rem(220),
				}}
			>
				<Delete />
			</div>
		</>
	);
};

export default CreatorShopUI;
