import { Loader } from "@mantine/core";
import { PresentationControls, Stage, useGLTF } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
type T_Props = {
	url: string;
};
function Model(props: { url: string; [x: string]: any }) {
	const { scene } = useGLTF(props.url);

	return <primitive object={scene} {...props} />;
}

const AssetViewer3d: React.FC<T_Props> = (props) => {
	return (
		<Suspense fallback={<Loader />}>
			<Canvas
				dpr={[1, 2]}
				camera={{
					fov: 45,
				}}
				style={{
					width: "100%",
					height: "100%",
				}}
			>
				<DisplayModal url={props.url} />
			</Canvas>
		</Suspense>
	);
};

function DisplayModal({ url }: { url: string }) {
	const { camera } = useThree();

	useEffect(() => {
		const handleScroll = (event: WheelEvent) => {
			const zoomSpeed = 0.001;
			const deltaY = event.deltaY;
			camera.zoom -= deltaY * zoomSpeed;
			camera.zoom = Math.max(0.1, camera.zoom);
			camera.zoom = Math.min(2, camera.zoom);
			camera.updateProjectionMatrix();
		};

		window.addEventListener("wheel", handleScroll);

		return () => {
			window.removeEventListener("wheel", handleScroll);
		};
	}, [camera]);

	return (
		<PresentationControls speed={2} global zoom={0.5} polar={[-1, Math.PI / 4]}>
			<Stage shadows={false}>
				<Model scale={0.01} url={url} />
			</Stage>
		</PresentationControls>
	);
}

export default AssetViewer3d;
