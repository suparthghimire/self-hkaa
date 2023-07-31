import { useExperience } from "@/lib/providers/experience/Experience.provider";
import { T_Chat } from "@experience/types";
import { ActionIcon, Box, ScrollArea, Text, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconSend } from "@tabler/icons-react";
import { useEffect, useRef } from "react";
import { z } from "zod";

const ChatPanel = () => {
	const chatPanelRef = useRef<HTMLDivElement>(null);

	const { chatMessages, sendChatMessage } = useExperience();

	const chatForm = useForm({
		initialValues: {
			chatMessage: "",
		},
		validate: zodResolver(
			z.object({
				chatMessage: z.string().nonempty("Please enter valid chat message"),
			})
		),
	});

	useEffect(() => {
		if (!chatPanelRef.current) return;
		chatPanelRef.current.scrollTo({
			top: chatPanelRef.current.scrollHeight,
			behavior: "smooth",
		});
	}, [chatPanelRef, chatMessages.length]);

	return (
		<div className="h-[344px] w-[302px]">
			<div className="grid w-full gap-[12px]">
				<ScrollArea
					className="h-[295px]"
					offsetScrollbars
					viewportRef={chatPanelRef}
				>
					<div className="text-center">29 May 2023</div>
					<ul className="p-0 grid gap-[12px]">
						{chatMessages.map((chat, idx) => {
							const key = `chat-${idx}-${chat.user}-${chat.time}`;
							if (chat.user[0] === "*")
								return <MyChatMessage key={key} message={chat.message} />;
							return (
								<OtherChatMessage
									key={key}
									message={chat.message}
									time={chat.time}
									user={chat.user}
								/>
							);
						})}
					</ul>
				</ScrollArea>
				<form
					onSubmit={chatForm.onSubmit((v) => {
						sendChatMessage(v.chatMessage);
						chatForm.reset();
					})}
				>
					<TextInput
						{...chatForm.getInputProps("chatMessage")}
						radius={8}
						placeholder="Type your Message"
						rightSection={
							<ActionIcon
								type="submit"
								variant="filled"
								radius={100}
								color="blue.1"
							>
								<IconSend />
							</ActionIcon>
						}
					/>
				</form>
			</div>
		</div>
	);
};

type T_MyChatMessage = {
	message: string;
};
const MyChatMessage: React.FC<T_MyChatMessage> = (props) => {
	return (
		<li className="w-full flex justify-end align-items-end">
			<Box className="p-[10px] rounded-[16px_16px_0px_16px]" bg="blue.1">
				<Text
					className="text-white"
					style={{
						color: "white",
					}}
				>
					{props.message}
				</Text>
			</Box>
		</li>
	);
};

type T_OtherChatMessage = T_Chat;
const OtherChatMessage: React.FC<T_OtherChatMessage> = (props) => {
	return (
		<li className="w-full flex justify-start">
			<div className="w-full">
				<div className="flex gap-2">
					<Text weight={600}>{props.user}</Text>
					<Text color="gray.5">{props.time}</Text>
				</div>
				<Text>{props.message}</Text>
			</div>
		</li>
	);
};

export default ChatPanel;
