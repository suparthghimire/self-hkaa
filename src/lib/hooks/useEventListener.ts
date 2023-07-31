import { T_Actions, T_WorldInfo } from "@experience/types";
import { useEffect } from "react";

type T_Event = {
	key: string;
	value: any;
};

export default function useExperienceEventListener(
	dispatch: React.Dispatch<T_Actions>
) {
	useEffect(() => {
		function eventListener(event: MessageEvent) {
			try {
				const data = JSON.parse(event.data);
				if (data.source && data.source === "react-devtools-bridge") return;

				const { key, value } = data as T_Event;
				console.log("[Web UI] After Parsing Message", data);
				switch (key) {
					case "sceneloaded": {
						dispatch({
							type: "LOADED",
						});
						break;
					}
					case "chat": {
						const message = value as string;
						const { user, time } = data as {
							user: string;
							time: string;
						};
						dispatch({
							type: "SET_CHAT_MESSAGE",
							payload: {
								user,
								message,
								time,
							},
						});
						break;
					}
					case "worldinfo": {
						const { description, image, name, urlshortcode, published } =
							value as T_WorldInfo;
						dispatch({
							type: "SET_WORLD_INFO",
							payload: {
								name,
								description,
								image,
								urlshortcode: urlshortcode ?? "",
								published: published ?? false,
							},
						});
						break;
					}
					case "savedroom": {
						dispatch({
							type: "SET_SAVE_STATUS",
							payload: "success",
						});
						break;
					}
					case "saveroomfail": {
						dispatch({
							type: "SET_SAVE_STATUS",
							payload: "error",
						});
						break;
					}
					case "captureimage": {
						dispatch({
							type: "SET_CAPTURED_IMAGE",
							payload: value,
						});
						break;
					}
				}
			} catch (error) {
				console.log("EVENT NOT FROM IFRAME");
			}
		}

		window.addEventListener("message", eventListener);

		return () => {
			window.removeEventListener("message", eventListener);
		};
	}, []);
}
