import { Modal, ModalProps, rem } from "@mantine/core";
import React from "react";

const CustomModal: React.FC<ModalProps> = (props) => {
	return (
		<Modal
			bg="gray.0"
			closeButtonProps={{
				color: "dark.9",
				iconSize: "24px",
			}}
			styles={() => ({
				header: {},
			})}
			centered={true}
			padding={rem(40)}
			radius={rem(12)}
			{...props}
		/>
	);
};

export default CustomModal;
