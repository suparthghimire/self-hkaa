import { Box, ScrollArea, Text } from "@mantine/core";
import { useEffect, useRef } from "react";

const ChatPanel = () => {
	const chatPanelRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!chatPanelRef.current) return;
		chatPanelRef.current.scrollTo({
			top: chatPanelRef.current.scrollHeight,
			behavior: "smooth",
		});
	}, [chatPanelRef]);

	return (
		<div className="h-[344px] w-[302px]">
			<div className="grid w-full gap-[12px]">
				<ScrollArea
					className="h-[340px]"
					offsetScrollbars
					viewportRef={chatPanelRef}
				>
					<div className="text-center">29 May 2023</div>
					<ul className="p-0 grid gap-[12px]">
						<li className="w-full flex justify-start">
							<div className="w-full">
								<div className="flex gap-2">
									<Text weight={600}>david0212</Text>
									<Text color="gray.5">12:59</Text>
								</div>
								<Text>Hello everyone!</Text>
							</div>
						</li>
						<li className="w-full flex justify-start">
							<div className="w-full">
								<div className="flex gap-2">
									<Text weight={600}>erin89</Text>
									<Text color="gray.5">13:03</Text>
								</div>
								<Text>Hi.</Text>
							</div>
						</li>
						<li className="w-full flex justify-start">
							<div className="w-full">
								<div className="flex gap-2">
									<Text weight={600}>jeff0921</Text>
									<Text color="gray.5">13:11</Text>
								</div>
								<Text>Welcome!</Text>
							</div>
						</li>
						<li className="w-full flex justify-start">
							<div className="w-full">
								<div className="flex gap-2">
									<Text weight={600}>jeff0921</Text>
									<Text color="gray.5">13:11</Text>
								</div>
								<Text>Welcome!</Text>
							</div>
						</li>
						<li className="w-full flex justify-end align-items-end">
							<Box
								className="p-[10px] rounded-[16px_16px_0px_16px]"
								bg="blue.1"
							>
								<Text className="text-white">Welcome David!</Text>
							</Box>
						</li>
						<li className="w-full flex justify-end align-items-end">
							<Box
								className="p-[10px] rounded-[16px_16px_0px_16px]"
								bg="blue.1"
							>
								<Text className="text-white">Let’s meet by the Dior shop.</Text>
							</Box>
						</li>
					</ul>
				</ScrollArea>
			</div>
		</div>
	);
};

export default ChatPanel;
