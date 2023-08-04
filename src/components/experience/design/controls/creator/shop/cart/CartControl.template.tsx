import ExperienceIconButton from "@/components/experience/design/common/IconButton";
import { useDisclosure } from "@mantine/hooks";
import { IconShoppingCart } from "@tabler/icons-react";
import AssetSale from "./AssetSale.template";

const Cart = () => {
	const [opened, { open, close }] = useDisclosure(false);
	return (
		<>
			<AssetSale opened={opened} onClose={close} />

			<ExperienceIconButton color="blue.1" onClick={open}>
				<IconShoppingCart />
			</ExperienceIconButton>
		</>
	);
};

export default Cart;
