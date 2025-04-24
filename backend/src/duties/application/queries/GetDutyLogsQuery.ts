import { DutyLog } from '../../domain/entities/DutyLog';
import { DutyLogRepository } from '../../domain/repositories/DutyLogRepository';

export class GetDutyLogsQuery {
  constructor(private readonly dutyLogRepository: DutyLogRepository) {}

  async execute(dutyId: string): Promise<DutyLog[]> {
    return this.dutyLogRepository.findByDutyId(dutyId);
  }
} 