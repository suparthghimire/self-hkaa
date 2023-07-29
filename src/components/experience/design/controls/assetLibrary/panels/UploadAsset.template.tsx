import PlaceholderImage from "@/assets/placeholder.svg";
import {
	Button,
	FileButton,
	Select,
	Text,
	TextInput,
	useMantineTheme,
} from "@mantine/core";
import Image from "next/image";
import React, { useState } from "react";
const UploadAsset: React.FC = () => {
	const theme = useMantineTheme();
	const [_file, setFile] = useState<File | null>(null);
	return (
		<div className="grid place-items-center">
			<div className="w-[420px] grid place-items-center gap-[16px]">
				<div className="grid gap-[4px] w-full">
					<div className="w-full h-[274px] relative">
						<Image
							fill
							src={PlaceholderImage}
							className="object-cover object-center rounded-[8px]"
							alt="Placeholder Image"
						/>
					</div>
					<Text size={12} align="center" color="gray.7">
						Supported file types: mp4, mkv, ogv, mov, mp3, ogg, wav, jpg, png,
						webp, gif, glb, gltf
					</Text>
				</div>
				<Text color="gray.9">OR</Text>
				<div className="w-full flex gap-[8px]">
					<TextInput
						className="w-full"
						placeholder="Enter url for image, audio, or video "
						styles={() => ({
							input: {
								height: "48px",
							},
						})}
						rightSection={
							<FileButton onChange={(f) => setFile(f)}>
								{(fileBtnProps) => (
									<Button
										{...fileBtnProps}
										mr={50}
										styles={() => ({
											root: {
												background: theme.colors.blue[0],
											},
										})}
									>
										Upload
									</Button>
								)}
							</FileButton>
						}
					/>
					<Select
						styles={() => ({
							input: {
								width: "97px",
								height: "48px",
							},
						})}
						defaultValue="audio"
						data={[
							{ value: "image", label: "Image" },
							{ value: "audio", label: "Audio" },
							{ value: "video", label: "Video" },
						]}
					/>
				</div>
			</div>
		</div>
	);
};

export default UploadAsset;
