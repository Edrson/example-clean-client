import { Client } from "../entities/Client";

export interface ClientRepository {
  save(id: string, client: Client): Promise<void>;
}
