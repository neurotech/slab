export const NotConfigured = ({
	toggleConfigDialog,
}: {
	toggleConfigDialog: () => void;
}) => {
	return (
		<button type="button" onClick={() => toggleConfigDialog()}>
			Slab is not configured! Click here to open the configuration dialog.
		</button>
	);
};
