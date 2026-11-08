import { use } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ConfigContext } from "@/context/config-context";
import type { Service } from "./types";

type ServiceCardProps = {
	service: Service;
	setEditingService: (service: Service) => void;
	toggleServiceDialog: () => void;
	handleDelete: (id: string) => void;
};

export const ServiceCard = ({
	service,
	setEditingService,
	toggleServiceDialog,
	handleDelete,
}: ServiceCardProps) => {
	const { hostname } = use(ConfigContext);
	const url = `http://${hostname}:${service.port}`;

	return (
		<a
			tabIndex={0}
			className="border border-zinc-900 bg-zinc-900 flex flex-col justify-between rounded-md min-h-45 text-left select-none p-4 gap-3 hover:cursor-pointer hover:bg-zinc-800/75 hover:border-zinc-700"
			href={url}
			target="_blank"
			rel="noopener noreferrer"
		>
			<div className="flex flex-col gap-3">
				<h4 className="self-start text-2xl font-semibold text-white text-shadow-md shadow-black">
					{service.name}
				</h4>
				<Separator />

				<h5 className="self-start text-md">{service.description}</h5>
			</div>

			<div className="flex flex-row justify-end gap-2">
				<Button
					onClick={() => {
						setEditingService(service);
						toggleServiceDialog();
					}}
				>
					Edit
				</Button>
				<Button variant="red" onClick={() => handleDelete(service.id)}>
					Delete
				</Button>
			</div>
		</a>
	);
};
