import { CivilStatus, Gender } from "../01-domain/entities/Client";
import { ClientRepository } from "../01-domain/interfaces/ClientRepository";

export type GetClientByIdentificationDTO = {
  identificationNumber: string;
};

export type GetClientByIdentificationOutputDTO = {
  id: string;
  fullName: string;
  identificationNumber: string;
  email: string;
  birthDate: string;
  gender: Gender;
  civilStatus: CivilStatus;
};

export class GetClientByIdentificationUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async getClient(input: GetClientByIdentificationDTO): Promise<GetClientByIdentificationOutputDTO> {
    const client = await this.clientRepository.findByIdentificationNumber(input.identificationNumber);

    if (!client) {
      throw new Error(`Client with identification number ${input.identificationNumber} not found`);
    }

    return {
      id: client.id,
      fullName: client.client.fullName,
      identificationNumber: client.client.identificationNumber,
      email: client.client.email.getValue(),
      birthDate: client.client.birthDate.toISOString().split('T')[0],
      gender: client.client.gender,
      civilStatus: client.client.civilStatus,
    };
  }
}
