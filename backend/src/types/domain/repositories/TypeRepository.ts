import { Type } from '../entities/Type';

export interface TypeRepository {
  save(type: Type): Promise<void>;
  findById(id: string): Promise<Type | null>;
  findAll(): Promise<Type[]>;
  update(type: Type): Promise<void>;
} 