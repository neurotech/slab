import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import {
	createService,
	deleteService,
	getServices,
	setup,
	updateService,
} from "./db.js";
import type { Service } from "./types.js";

const app = new Hono();

app.use(
	"/api/*",
	cors({
		origin: ["http://macbookpro:4000", "http://localhost:4000"],
	}),
);

app.get("/api/services", (c) => {
	const services = getServices();
	return c.json(services);
});

app.post("/api/services", async (c) => {
	const input = await c.req.json<Service>();
	const service = createService(input);
	return c.json(service, 201);
});

app.put("/api/services/:id", async (c) => {
	const json = await c.req.json<Service>();
	updateService(json, c.req.param("id"));
	return c.body(null, 204);
});

app.delete("/api/services/:id", (c) => {
	deleteService(c.req.param("id"));
	return c.body(null, 204);
});

app.get("/api/health", (c) => c.text("ok"));

serve(
	{
		fetch: app.fetch,
		port: 3000,
	},
	(info) => {
		setup();
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
