import { Router } from "express";
import { ClientController } from "./ClientController";
export function createClientRoutes(clientController: ClientController): Router {
  const router = Router();
  //router.post("/clients", (req, res) => clientController.createClient(req, res));
  router.post("/clients", clientController.createClient.bind(clientController));
  return router;
}
