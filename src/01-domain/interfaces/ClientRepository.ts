import { Client } from "../entities/Client";

export interface ClientRepository {
  save(id: string, client: Client): Promise<void>;
  findByIdentificationNumber(identificationNumber: string): Promise<{ id: string; client: Client } | null>;
}
