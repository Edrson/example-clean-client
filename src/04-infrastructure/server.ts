import express from "express";
import { createClientRoutes } from "../03-adapters/http/clientRoutes";
import { ClientController } from "../03-adapters/http/ClientController";
import { CreateClientUseCase } from "../02-application/CreateClientUseCase";
import { InMemoryClientRepository, UuidIdGenerator } from "../03-adapters/persistence/InMemoryClientRepository";

const app = express();
app.use(express.json());

// Dependency Injection, Aquí se construyen y conectan dependencias
const clientRepository = new InMemoryClientRepository();
const idGenerator = new UuidIdGenerator();
const createClientUseCase = new CreateClientUseCase(clientRepository, idGenerator);
const clientController = new ClientController(createClientUseCase);
const clientRoutes = createClientRoutes(clientController);
app.use("/api", clientRoutes);

const PORT = 3000;

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
