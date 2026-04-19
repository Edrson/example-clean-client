/**
 * Value Object de dominio para representar un email valido e inmutable.
 * Normaliza el valor de entrada y garantiza formato correcto.
 */
export class Email {
  private constructor(private readonly value: string) {}

  /**
   * Crea un Email desde texto plano, aplicando normalizacion y validacion.
   * @param email Email de entrada.
   * @returns Instancia de Email valida.
   * @throws Error Si el formato del email es invalido.
   */
  static create(email: string): Email {
    const normalizedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      throw new Error("Invalid email format");
    }

    return new Email(normalizedEmail);
  }

  /**
   * Retorna el valor primitivo normalizado del email.
   */
  getValue(): string {
    return this.value;
  }

  /**
   * Compara dos Email por valor.
   * @param other Otro Email.
   */
  equals(other: Email): boolean {
    return this.value === other.value;
  }
}
