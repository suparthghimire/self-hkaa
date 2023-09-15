import { rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconQuestionMark } from "@tabler/icons-react";
import Image from "next/image";
import { MARGIN } from "../../UI/ExperienceUI";
import CustomModal from "../../common/CustomModal";
import ExperienceIconButton from "../../common/IconButton";

const Help = () => {
	const [helpOpened, { open: openHelp, close: closeHelp }] =
		useDisclosure(false);

	return (
		<>
			<CustomModal
				opened={helpOpened}
				onClose={closeHelp}
				withCloseButton={false}
				overlayProps={{
					opacity: 0,
					blur: 0,
				}}
				styles={() => ({
					content: {
						position: "absolute",
						bottom: rem(100),
						right: MARGIN,
						width: rem(514),
					},
				})}
			>
				<div className="w-full h-[380px] relative">
					<Image
						src={"/assets/help_section.png"}
						alt="Help Image"
						fill
						className="object-contain"
					/>
				</div>
			</CustomModal>

			<ExperienceIconButton onClick={openHelp}>
				<IconQuestionMark />
			</ExperienceIconButton>
		</>
	);
};

export default Help;
