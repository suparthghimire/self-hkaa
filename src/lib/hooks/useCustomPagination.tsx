import { usePagination } from "@mantine/hooks";
import { useMemo, useState } from "react";

type T_Props<T> = {
	data: T[];
	limit: number;
};
export default function useCustomPagination<T>(props: T_Props<T>) {
	const [page, onChange] = useState(1);

	const totalPages = useMemo(
		() => Math.ceil(props.data.length / props.limit),
		[props.data.length, props.limit]
	);

	const dataToShow = useMemo(() => {
		const start = (page - 1) * props.limit;
		const end = start + props.limit;
		return props.data.slice(start, end);
	}, [page, props.data, props.limit]);

	const pagination = usePagination({
		total: totalPages,
		page,
		onChange,
	});

	return {
		data: dataToShow,
		totalPages: totalPages,
		pagination: pagination,
	};
}
