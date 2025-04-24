import { DutyLog } from '../entities/DutyLog';

export interface DutyLogRepository {
  save(log: DutyLog): Promise<void>;
  findByDutyId(dutyId: string): Promise<DutyLog[]>;
  findAll(): Promise<DutyLog[]>;
} 