import { Request, Response } from "express";
import { CreateClientUseCase, CreateClientDTO } from "../../02-application/CreateClientUseCase";
import { GetClientByIdentificationUseCase, GetClientByIdentificationDTO } from "../../02-application/GetClientByIdentificationUseCase";

export class ClientController {
  constructor(
    private createClientUseCase: CreateClientUseCase,
    private getClientByIdentificationUseCase: GetClientByIdentificationUseCase
  ) {}

  async createClient(req: Request, res: Response): Promise<void> {
    try {
      const input: CreateClientDTO = req.body;
      const output = await this.createClientUseCase.saveClient(input);
      res.status(201).json(output);
    } catch (error) {
      res.status(400).json({
        error: "Error creating client",
        details: (error as Error).message,
      });
    }
  }

  async getClientByIdentification(req: Request, res: Response): Promise<void> {
    try {
      const identificationNumberParam = req.params.identificationNumber as string;

      // Validar que identificationNumber no esté vacío
      if (!identificationNumberParam || identificationNumberParam.trim() === "") {
        res.status(400).json({
          error: "Invalid request",
          details: "identificationNumber parameter is required and cannot be empty",
        });
        return;
      }

      const input: GetClientByIdentificationDTO = { identificationNumber: identificationNumberParam };
      const output = await this.getClientByIdentificationUseCase.getClient(input);
      res.status(200).json(output);
    } catch (error) {
      const message = (error as Error).message;
      const statusCode = message.includes("not found") ? 404 : 400;
      res.status(statusCode).json({
        error: statusCode === 404 ? "Client not found" : "Error retrieving client",
        details: message,
      });
    }
  }
}
