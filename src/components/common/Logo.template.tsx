import Image from "next/image";
import React from "react";

const Logo: React.FC = () => {
	return (
		<Image
			src="/logo.png"
			alt="Honkong Airport Authority"
			width={84.85}
			height={50}
		/>
	);
};

export default Logo;
