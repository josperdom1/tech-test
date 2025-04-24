import { v4 as uuidv4 } from 'uuid';

export class Type {
  constructor(
    public readonly id: string,
    public readonly name: string
  ) {}

  static create(name: string): Type {
    return new Type(
      uuidv4(),
      name
    );
  }
} 