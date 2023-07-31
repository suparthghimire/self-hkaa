import logo from "@/assets/logo.png";
import Image from "next/image";
import React from "react";
const Logo: React.FC = () => {
	return (
		<Image
			src={logo}
			alt="Honkong Airport Authority"
			width={84.85}
			height={50}
		/>
	);
};

export default Logo;
