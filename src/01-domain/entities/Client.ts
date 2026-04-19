export type Gender = "male" | "female" | "other";
export type CivilStatus = "single" | "married" | "divorced" | "widowed";
import { Email } from "../value-objects/Email";

/**
 * Entidad de dominio que representa un cliente del sistema.
 * Contiene datos de identificacion y atributos personales basicos.
 */
export class Client {
  /**
   * Crea una entidad Client con sus atributos de negocio.
   * @param fullName Nombre completo.
   * @param identificationNumber Documento de identificacion.
   * @param email Email validado como Value Object.
   * @param birthDate Fecha de nacimiento.
   * @param gender Genero declarado.
   * @param civilStatus Estado civil.
   */
  constructor(
    public readonly fullName: string,
    public readonly identificationNumber: string,
    public readonly email: Email,
    public readonly birthDate: Date,
    public readonly gender: Gender,
    public readonly civilStatus: CivilStatus
  ) {}
}
