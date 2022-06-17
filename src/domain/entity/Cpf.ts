export default class Cpf {
  FACTOR_FIRST_VERIFIER_DIGIT = 10;

  FACTOR_SECOND_VERIFIER_DIGIT = 11;

  value: string;

  constructor(value: string) {
    if (!this.validate(value)) throw new Error('Invalid cpf');
    this.value = value;
  }

  cleanCpf(cpf: string): string {
    return cpf.replace(/\D/g, '');
  }

  isValidLength(cpf: string): boolean {
    return cpf.length === 11;
  }

  areDigitsEqual(cpf: string): boolean {
    const [firstDigit] = cpf;
    return [...cpf].every(c => c === firstDigit);
  }

  calculateDigit(cpf: string, factor: number): number {
    let total = 0;
    for (const digit of cpf) {
      if (factor > 1) total += parseInt(digit) * factor--;
    }
    const rest = total % 11;
    return rest < 2 ? 0 : 11 - rest;
  }

  extractVerifierDigit(cpf: string): string {
    return cpf.slice(9);
  }

  validate(rawCpf: string): boolean {
    if (!rawCpf) return false;
    const cpf = this.cleanCpf(rawCpf);
    if (!this.isValidLength(cpf)) return false;
    if (this.areDigitsEqual(cpf)) return false;
    const firstVerifierDigit = this.calculateDigit(
      cpf,
      this.FACTOR_FIRST_VERIFIER_DIGIT,
    );
    const secondVerifierDigit = this.calculateDigit(
      cpf,
      this.FACTOR_SECOND_VERIFIER_DIGIT,
    );
    const verifierDigit = this.extractVerifierDigit(cpf);
    const calculatedVerifiedDigit = `${firstVerifierDigit}${secondVerifierDigit}`;
    return verifierDigit === calculatedVerifiedDigit;
  }
}
