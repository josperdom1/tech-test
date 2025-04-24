export class InvalidDutyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidDutyError';
  }
} 