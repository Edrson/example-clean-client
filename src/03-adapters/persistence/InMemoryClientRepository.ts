import { ClientRepository } from "../../01-domain/interfaces/ClientRepository";
import { Client } from "../../01-domain/entities/Client";
import { IdGenerator } from "../../01-domain/interfaces/IdGenerator";

export class InMemoryClientRepository implements ClientRepository {
  private clients: Map<string, Client> = new Map();

  async save(id: string, client: Client): Promise<void> {
    this.clients.set(id, client);
    console.log(`Client with ID ${id} saved, for moment in memory.`);
    console.log("New client added: ", client);
  }
}

export class UuidIdGenerator implements IdGenerator {
  generate(): string {
    return crypto.randomUUID();
  }
}
