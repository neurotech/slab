import { useState } from "react";

export const useConfigDialog = () => {
	const [configDialogOpen, setConfigDialogOpen] = useState<boolean>(false);

	const toggleConfigDialog = () => setConfigDialogOpen((p) => !p);

	return { configDialogOpen, toggleConfigDialog };
};
