import { Button, Modal, ModalProps, rem } from "@mantine/core";
import React from "react";
const ConfirmationModal: React.FC<
	ModalProps & {
		onYes: () => void;
		onCancel: () => void;
	}
> = (props) => {
	return (
		<Modal
			{...props}
			size="626px"
			centered
			radius={rem(16)}
			styles={() => ({
				body: {
					padding: "40px 0",
				},
			})}
		>
			<div className="grid place-items-center">
				{props.children}
				<div className="flex gap-[48px]">
					<Button
						variant="outline"
						radius={rem(8)}
						styles={() => ({
							root: {
								padding: "12px 24px",
								height: "auto",
								width: "146px",
								borderWidth: rem(3),
							},
						})}
						onClick={props.onCancel}
					>
						Cancel
					</Button>
					<Button
						styles={() => ({
							root: {
								padding: "12px 24px",
								height: "auto",
								width: "146px",
							},
						})}
						radius={rem(8)}
						onClick={props.onYes}
					>
						Yes
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default ConfirmationModal;
