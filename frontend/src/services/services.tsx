import { ServiceCard } from "./service-card";
import type { Service } from "./types";

export const Services = ({
	services,
	loading,
	toggleServiceDialog,
	handleDelete,
	setEditingService,
}: {
	services: Service[];
	loading: boolean;
	toggleServiceDialog: () => void;
	handleDelete: (id: string) => Promise<void>;
	setEditingService: (service: Service) => void;
}) => {
	if (loading) return <>Loading...</>;

	return (
		<section className="grid grid-cols-3 gap-4 select-none">
			{services?.length === 0 ? (
				<button type="button" onClick={() => toggleServiceDialog()}>
					<h2 className="font-bold text-2xl">No services added.</h2>
					<h3 className="text-xl">Click here to add one.</h3>
				</button>
			) : (
				services.map((service) => (
					<ServiceCard
						key={service.id}
						service={service}
						handleDelete={handleDelete}
						setEditingService={setEditingService}
						toggleServiceDialog={toggleServiceDialog}
					/>
				))
			)}
		</section>
	);
};
