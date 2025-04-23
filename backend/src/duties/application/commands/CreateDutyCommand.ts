import { Duty } from '../../domain/entities/Duty';
import { DutyRepository } from '../../domain/repositories/DutyRepository';
import { Type } from '../../../types/domain/entities/Type';

export class CreateDutyCommand {
  constructor(private readonly dutyRepository: DutyRepository) {}

  async execute(name: string, type: Type): Promise<Duty> {
    const duty = Duty.create(name, type);
    await this.dutyRepository.save(duty);
    return duty;
  }
} 