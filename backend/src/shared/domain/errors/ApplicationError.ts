export abstract class ApplicationError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly errorCode: string
  ) {
    super(message);
    this.name = this.constructor.name;
  }
} 