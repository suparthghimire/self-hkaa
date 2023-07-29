import { T_Actions } from "@experience/types";
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
					case "worldinfo": {
						break;
					}
					case "sceneloaded": {
						dispatch({
							type: "LOADED",
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
