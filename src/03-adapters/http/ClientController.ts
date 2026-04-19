import { Request, Response } from "express";
import { CreateClientUseCase, CreateClientDTO } from "../../02-application/CreateClientUseCase";

export class ClientController {
  constructor(private createClientUseCase: CreateClientUseCase) {}
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
}
