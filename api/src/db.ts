import { DatabaseSync } from "node:sqlite";
import type { Service } from "./types.js";

const database = new DatabaseSync(process.env.DB_PATH ?? "./slab.db");
const sql = database.createTagStore();

export const setup = () => {
	database.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA synchronous = NORMAL;
  `);

	database.exec(`
    CREATE TABLE IF NOT EXISTS services(
      id INTEGER PRIMARY KEY,
      name TEXT,
      port INTEGER,
      icon TEXT,
      description TEXT
    ) STRICT
  `);
};

export const getServices = () => sql.all`SELECT * FROM services`;

export const createService = (service: Service) => {
	const { lastInsertRowid } = sql.run`
  INSERT INTO services (name, port, icon, description)
  VALUES (${service.name}, ${service.port}, ${service.icon}, ${service.description})
`;
	return { ...service, id: Number(lastInsertRowid) };
};

export const updateService = (service: Service, id: string) => sql.run`
  UPDATE services
  SET name = ${service.name}, port = ${service.port}, icon = ${service.icon}, description = ${service.description}
  WHERE id = ${id}
`;

export const deleteService = (id: string) =>
	sql.run`DELETE FROM services WHERE id = ${id}`;
