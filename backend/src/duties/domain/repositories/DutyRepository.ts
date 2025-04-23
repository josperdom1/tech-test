import { Duty } from '../entities/Duty';

export interface DutyRepository {
  save(duty: Duty): Promise<void>;
  findById(id: string): Promise<Duty | null>;
  findAll(): Promise<Duty[]>;
  update(duty: Duty): Promise<void>;
  delete(id: string): Promise<void>;
} 