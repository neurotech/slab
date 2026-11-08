import { useState } from "react";

export const useServiceDialog = () => {
	const [serviceDialogOpen, setServiceDialogOpen] = useState<boolean>(false);

	const toggleServiceDialog = () => setServiceDialogOpen((p) => !p);

	return { serviceDialogOpen, toggleServiceDialog };
};
