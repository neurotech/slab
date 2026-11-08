import { CogIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export const ConfigDialog = ({
	open,
	onOpenChange,
}: {
	open: boolean;
	onOpenChange: () => void;
}) => {
	const { setConfig } = useLocalStorage();
	const [hostname, setHostname] = useState<string>("");

	return (
		<Dialog
			open={open}
			toggle={onOpenChange}
			title={"Configuration"}
			icon={<CogIcon size={16} />}
			footer={
				<Button
					onClick={() => {
						setConfig({ hostname });
						onOpenChange();
					}}
				>
					Save
				</Button>
			}
		>
			<section className="flex flex-col gap-2">
				<Input
					id="input-hostname"
					type="text"
					label="Hostname"
					value={hostname}
					onChange={(e) => setHostname(e.currentTarget.value)}
					valid={!!hostname}
				/>
			</section>
		</Dialog>
	);
};
