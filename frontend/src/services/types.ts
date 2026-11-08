export type Service = {
	id: string;
	name: string;
	port: string;
	description: string;
};

export type NewService = Omit<Service, "id">;
