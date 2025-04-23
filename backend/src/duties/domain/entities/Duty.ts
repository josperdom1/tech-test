import { v4 as uuidv4 } from 'uuid';
import { Type } from '../../../types/domain/entities/Type';

export class Duty {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public completed: boolean,
    public readonly createdAt: Date,
    public updatedAt: Date,
    public readonly type: Type
  ) {}

  static create(name: string, description: string, type: Type): Duty {
    return new Duty(
      uuidv4(),
      name,
      description,
      false,
      new Date(),
      new Date(),
      type
    );
  }

  complete(): void {
    this.completed = true;
    this.updatedAt = new Date();
  }

  uncomplete(): void {
    this.completed = false;
    this.updatedAt = new Date();
  }
} 