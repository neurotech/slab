import { use, useMemo, useState } from "react";
import { Button } from "./components/ui/button";
import { ConfigDialog } from "./config/config-dialog";
import { NotConfigured } from "./config/not-configured";
import { ConfigContext } from "./context/config-context";
import { useFetch } from "./hooks/useFetch";
import { useMutation } from "./hooks/useMutation";
import { useServiceDialog } from "./hooks/useServiceDialog";
import { apiUrl } from "./services/api";
import { ServiceDialog } from "./services/service-dialog";
import { Services } from "./services/services";
import type { NewService, Service } from "./services/types";

export const App = () => {
	const { configDialogOpen, toggleConfigDialog, hostname } = use(ConfigContext);
	const { serviceDialogOpen, toggleServiceDialog } = useServiceDialog();

	const [editingService, setEditingService] = useState<Service | null>();

	const {
		data: services,
		loading,
		refetch,
	} = useFetch<Service[]>({
		url: apiUrl("/api/services"),
	});
	const create = useMutation<NewService, Service>("POST", "/api/services");
	const update = useMutation<Service, Service>(
		"PUT",
		(s) => `/api/services/${s.id}`,
	);
	const remove = useMutation<string, void>(
		"DELETE",
		(id) => `/api/services/${id}`,
	);

	const handleCreate = async (input: NewService) => {
		try {
			await create.mutate(input);
			refetch();
		} catch (err) {
			console.error(err);
		}
	};

	const handleUpdate = async (input: Service) => {
		try {
			await update.mutate({ ...input });
			refetch();
		} catch (err) {
			console.error(err);
		}
	};

	const handleDelete = async (id: string) => {
		try {
			await remove.mutate(id);
			refetch();
		} catch (err) {
			console.error(err);
		}
	};

	const configPresent = useMemo(
		() => hostname !== null && hostname !== undefined,
		[hostname],
	);

	return (
		<div className="font-display flex flex-col h-screen bg-zinc-950 text-zinc-500 selection:bg-zinc-300 selection:text-zinc-700">
			<header className="flex flex-row justify-between items-center font-semibold p-2 bg-zinc-900">
				<h1 className="text-zinc-400 text-shadow-black/30 text-shadow-2xs text-2xl select-none tracking-tighter pl-2">
					Slab
				</h1>
				<Button
					onClick={toggleServiceDialog}
					variant="emerald"
					disabled={!configPresent}
				>
					Add Service
				</Button>
			</header>
			<main className="relative flex flex-col flex-1 overflow-y-auto p-4">
				{configPresent ? (
					<Services
						services={services}
						loading={loading}
						toggleServiceDialog={toggleServiceDialog}
						handleDelete={handleDelete}
						setEditingService={setEditingService}
					/>
				) : (
					<NotConfigured toggleConfigDialog={toggleConfigDialog} />
				)}
			</main>

			<ConfigDialog open={configDialogOpen} onOpenChange={toggleConfigDialog} />
			{serviceDialogOpen ? (
				<ServiceDialog
					service={editingService}
					open={serviceDialogOpen}
					onOpenChange={toggleServiceDialog}
					loading={create.loading}
					handleCreate={handleCreate}
					handleUpdate={handleUpdate}
					setEditingService={setEditingService}
				/>
			) : null}
		</div>
	);
};
