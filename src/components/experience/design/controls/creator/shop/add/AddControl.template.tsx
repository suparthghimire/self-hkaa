import ExperienceIconButton from "@/components/experience/design/common/IconButton";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import AssetLibrary from "../../../assetLibrary/AssetLibrary.template";

const AddAsset = () => {
	const [openedAssetLibrary, { open, close }] = useDisclosure();
	return (
		<>
			<ExperienceIconButton color="blue.1" onClick={open}>
				<IconPlus />
			</ExperienceIconButton>
			<AssetLibrary
				opened={openedAssetLibrary}
				onClose={close}
				assetSelectable={true}
			/>
		</>
	);
};

export default AddAsset;
