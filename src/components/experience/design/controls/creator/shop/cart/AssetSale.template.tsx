import {
	LinkAssetSchema,
	T_LinkAsset,
} from "@/components/experience/lib/schema/linkAsset.schema";
import { CreateAssetSale, GetSingleAssetSale } from "@/lib/api/api";
import useShowStatusNotification from "@/lib/hooks/useShowStatusNotification";
import { useAuth } from "@/lib/providers/Auth/AuthProvider";
import { useExperience } from "@/lib/providers/experience/Experience.provider";
import { T_AssetSale } from "@api/types";
import { Modal, ModalProps, rem, useMantineTheme } from "@mantine/core";
import { UseFormReturnType, useForm, zodResolver } from "@mantine/form";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import AssetSaleForm from "./AssetSaleForm.tempalte";

const AssetSale: React.FC<ModalProps> = (props) => {
	const theme = useMantineTheme();

	const {
		asset: { selected },
	} = useExperience();

	const form = useForm<T_LinkAsset>({
		initialValues: {
			media: [],
			name: "",
			description: "",
			price: "0",
			url: "",
		},
		validate: zodResolver(LinkAssetSchema),
	});
	const {
		auth: { user },
	} = useAuth();

	const getAssetSale = useQuery({
		queryKey: ["getAssetSale", selected?.id],
		queryFn: () => GetSingleAssetSale(user?.token ?? "", selected?.id ?? ""),
	});

	useSetFormValues(form, getAssetSale.data?.data);

	return (
		<Modal
			{...props}
			size={rem(587)}
			padding={rem(40)}
			centered
			radius={16}
			closeButtonProps={{
				iconSize: rem(24),
				color: "gray.9",
			}}
		>
			{selected &&
				(selected?.assetsaleid ? (
					<Update
						form={form}
						assetsaleid={selected.assetsaleid}
						onClose={props.onClose}
					/>
				) : (
					<Create form={form} onClose={props.onClose} />
				))}
		</Modal>
	);
};

const Create: React.FC<{
	form: UseFormReturnType<T_LinkAsset>;
	onClose: () => void;
}> = (props) => {
	const {
		asset: { selected },
		sendAssetMeta,
		sendDeselected,
	} = useExperience();
	const {
		auth: { user },
	} = useAuth();

	const linkAsset = useMutation({
		mutationFn: () => CreateAssetSale(props.form.values, user?.token ?? ""),
		onSuccess(data) {
			console.log("data", data);
			console.log("SENDING ASSET META", data.data.assetSale.id);
			sendAssetMeta({
				assetsaleid: data.data.assetSale.id,
			});
			if (selected) sendDeselected(selected);
			props.onClose();
		},
	});
	useShowStatusNotification({
		error: {
			status: linkAsset.isError,
			text: "Something Went Wrong when adding this asset for sale",
		},
		loading: {
			status: linkAsset.isLoading,
			text: "Processing",
		},
		success: {
			status: linkAsset.isError,
			text: "Asset marked for sale",
		},
	});

	return (
		<AssetSaleForm
			form={props.form}
			isLoading={linkAsset.isLoading}
			mutationFn={() => {
				linkAsset.mutate();
			}}
		/>
	);
};

const Update: React.FC<{
	assetsaleid: number;
	form: UseFormReturnType<T_LinkAsset>;
	onClose?: () => void;
}> = (props) => {
	return (
		<AssetSaleForm
			form={props.form}
			isLoading={false}
			mutationFn={() => {
				return new Promise(() => {});
			}}
		/>
	);
};

export default AssetSale;

const useSetFormValues = (
	form: UseFormReturnType<T_LinkAsset>,
	data: T_AssetSale | undefined
) => {
	useEffect(() => {
		if (!data) return;
		let media: (string | File)[] = [];
		try {
			if (typeof data.assetSale.media === "string")
				media = JSON.parse(data.assetSale.media) as string[];
		} catch (error) {
			console.error("CANNOT PARSE INVALID JSON");
		} finally {
			form.setValues({
				media,
				name: data.assetSale.name,
				description: data.assetSale.description,
				price: data.assetSale.price,
				url: data.assetSale.url,
			});
		}
	}, [data, form]);
};
