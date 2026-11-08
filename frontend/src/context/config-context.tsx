import {
	createContext,
	type ReactNode,
	useCallback,
	useMemo,
	useState,
} from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type ConfigContextType = {
	configDialogOpen: boolean;
	toggleConfigDialog: () => void;
	hostname: string;
	saveHostname: (newHostname: string) => void;
};

const defaultValues: ConfigContextType = {
	configDialogOpen: false,
	toggleConfigDialog: () => {},
	hostname: null,
	saveHostname: () => {},
};

export const ConfigContext = createContext<ConfigContextType>(defaultValues);

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
	const { getConfig, setConfig } = useLocalStorage();

	const [configDialogOpen, setConfigDialogOpen] = useState(
		defaultValues.configDialogOpen,
	);

	const toggleConfigDialog = useCallback(() => {
		setConfigDialogOpen((prev) => !prev);
	}, []);

	const hostname = useMemo(() => {
		const currentConfig = getConfig();
		return currentConfig?.hostname;
	}, [getConfig]);

	const saveHostname = useCallback(
		(newHostname: string) => {
			setConfig({ hostname: newHostname });
		},
		[setConfig],
	);

	const contextValue = useMemo(
		() => ({
			configDialogOpen,
			toggleConfigDialog,
			hostname,
			saveHostname,
		}),
		[configDialogOpen, toggleConfigDialog, hostname, saveHostname],
	);

	return <ConfigContext value={contextValue}>{children}</ConfigContext>;
};
