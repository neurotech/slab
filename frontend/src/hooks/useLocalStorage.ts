type Config = {
	hostname: string;
};

const KEY = "SLAB_CONFIG_HOSTNAME";

export const useLocalStorage = () => {
	const getConfig = (): Config => {
		const config = JSON.parse(localStorage.getItem(KEY)) as Config;
		return config;
	};

	const setConfig = (config: Config) => {
		const currentConfig = getConfig();
		localStorage.setItem(KEY, JSON.stringify({ ...currentConfig, ...config }));
	};

	return { getConfig, setConfig };
};
