import { AppWindowMac } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import type { NewService, Service } from "./types";

export const ServiceDialog = ({
	open,
	onOpenChange,
	loading,
	handleCreate,
	handleUpdate,
	setEditingService,
	service,
}: {
	open: boolean;
	onOpenChange: () => void;
	loading: boolean;
	handleCreate: (input: NewService) => Promise<void>;
	handleUpdate: (input: Service) => Promise<void>;
	setEditingService: (service?: Service) => void;
	service?: Service;
}) => {
	const [name, setName] = useState<string>(service?.name ?? "");
	const [port, setPort] = useState<string>(service?.port ?? "");
	// const [icon, setIcon] = useState<string>(service?.icon ?? "");
	const [description, setDescription] = useState<string>(
		service?.description ?? "",
	);

	const handleSave = () => {
		if (!service) {
			handleCreate({ name, port, description });
		} else {
			handleUpdate({ id: service.id, name, port, description });
			setEditingService();
		}

		onOpenChange();
	};

	return (
		<Dialog
			open={open}
			toggle={onOpenChange}
			title={service ? `Editing ${service.name}` : "New Service"}
			icon={<AppWindowMac size={16} />}
			footer={
				<Button disabled={!name || loading} onClick={handleSave}>
					Save
				</Button>
			}
			onClose={() => (service ? setEditingService() : null)}
		>
			<section className="flex flex-col gap-8">
				<Input
					id="input-service-name"
					type="text"
					label="Service Name"
					value={name}
					onChange={(e) => setName(e.currentTarget.value)}
					valid={!!name}
					autoFocus={!service}
				/>

				<Input
					id="input-service-port"
					type="number"
					label="Service Port"
					value={port}
					onChange={(e) => setPort(e.currentTarget.value)}
					valid={!!port}
				/>

				<Input
					id="input-service-description"
					type="text"
					label="Service Description"
					value={description}
					onChange={(e) => setDescription(e.currentTarget.value)}
					valid={!!description}
				/>
			</section>
		</Dialog>
	);
};
