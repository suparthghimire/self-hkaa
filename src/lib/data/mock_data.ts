import { T_Instance } from "@app/types";
import { USE_TEST_ROOM } from "../config";

export const USER_INSTANCES: T_Instance[] = [
	{
		id: 1,
		tabName: "Instance 1",
		key: "instance-1",
		title: "Instance Name",
		subTitle: "Instance 1",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu dolor orci. Vestibulum ornare in leo in varius. Duis aliquam nisl.",
		buttonName: "Enter Instance",
		date: "19/07/2023",
		slug: USE_TEST_ROOM ? "ttest" : "hkaa-instance-1",
		sessionTokenData: {
			config: "config-dev",
			instanceid: 1,
		},
	},
	{
		id: 2,
		tabName: "Instance 2",
		key: "instance-2",
		title: "Instance Name 2",
		subTitle: "Instance 2",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu dolor orci. Vestibulum ornare in leo in varius. Duis aliquam nisl.",
		buttonName: "Enter Instance",
		date: "19/07/2023",
		slug: USE_TEST_ROOM ? "ttest" : "hkaa-instance-2",
		sessionTokenData: {
			config: "config-dev",
			instanceid: 2,
		},
	},
	{
		id: 3,
		tabName: "Instance 3",
		key: "instance-3",
		title: "Instance Name 3",
		subTitle: "Instance 3",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu dolor orci. Vestibulum ornare in leo in varius. Duis aliquam nisl.",
		buttonName: "Enter Instance",
		date: "19/07/2023",
		slug: USE_TEST_ROOM ? "ttest" : "hkaa-instance-3",
		sessionTokenData: {
			config: "config-dev",
			instanceid: 3,
		},
	},
];

export const MAIN_INSTANCE = {
	id: 0,
	tabName: "Main Instance",
	key: "instance-0",
	image: "/assets/instance-img.jpeg",
	title: "Main Instance",
	subTitle: "Main Instance",
	description:
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu dolor orci. Vestibulum ornare in leo in varius. Duis aliquam nisl.",
	buttonName: "Enter Instance",
	date: "19/07/2023",
	slug: "main-instance",
	sessionTokenData: {
		config: "config-dev",
		ismaster: true,
		instanceid: 0,
	},
};

export const ADMIN_INSTANCES = [MAIN_INSTANCE, ...USER_INSTANCES];
