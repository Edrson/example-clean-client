import { CivilStatus, Client, Gender } from "../01-domain/entities/Client";
import { ClientRepository } from "../01-domain/interfaces/ClientRepository";
import { IdGenerator } from "../01-domain/interfaces/IdGenerator";
import { Email } from "../01-domain/value-objects/Email";

export type CreateClientDTO = {
  fullName: string;
  identificationNumber: string;
  email: string;
  birthDate: string;
  gender: Gender;
  civilStatus: CivilStatus;
};

export type CreateClientOutputDTO = {
  id: string;
};

export class CreateClientUseCase {
  constructor(
    private clientRepository: ClientRepository,
    private idGenerator: IdGenerator
  ) {}

  async saveClient(input: CreateClientDTO): Promise<CreateClientOutputDTO> {
    const emailVO = Email.create(input.email);

    const birthDate = new Date(input.birthDate);
    if (Number.isNaN(birthDate.getTime())) {
      throw new Error("Invalid birthDate format");
    }

    const client = new Client(
      input.fullName,
      input.identificationNumber,
      emailVO,
      birthDate,
      input.gender,
      input.civilStatus
    );

    const id = this.idGenerator.generate();
    await this.clientRepository.save(id, client);

    return { id };
  }
}
