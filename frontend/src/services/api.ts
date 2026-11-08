export const apiUrl = (path: string) => {
	const url = new URL(path, window.location.href);
	url.port = "3000";

	return url.toString();
};
