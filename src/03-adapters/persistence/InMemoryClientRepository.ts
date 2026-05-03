import crypto from "crypto";
import { ClientRepository } from "../../01-domain/interfaces/ClientRepository";
import { Client } from "../../01-domain/entities/Client";
import { IdGenerator } from "../../01-domain/interfaces/IdGenerator";

export class InMemoryClientRepository implements ClientRepository {
  private clients: Map<string, Client> = new Map();

  async save(id: string, client: Client): Promise<void> {
    this.clients.set(id, client);
    console.log("Inicio de log de registros");
    console.log(`Client with ID ${id} saved, for moment in memory.`);
    console.log("New client added: ", client);
    console.log("End -----------------------");
    console.log("Current clients in memory: ", "***CONTEO*** ", this.clients.size, "\n", Array.from(this.clients.entries()));
  }

  async findByIdentificationNumber(identificationNumber: string): Promise<{ id: string; client: Client } | null> {
    for (const [id, client] of this.clients.entries()) {
      if (client.identificationNumber === identificationNumber) {
        return { id, client };
      }
    }
    return null;
  }
}

export class UuidIdGenerator implements IdGenerator {
  generate(): string {
    return crypto.randomUUID();
  }
}
