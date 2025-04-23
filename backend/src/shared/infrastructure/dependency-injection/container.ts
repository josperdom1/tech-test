import { Pool } from 'pg';
import { DutyRepository } from '../../../duties/domain/repositories/DutyRepository';
import { PostgresDutyRepository } from '../../../duties/infrastructure/persistence/PostgresDutyRepository';

export interface Container {
  dutyRepository: DutyRepository;
}

export const createContainer = (pool: Pool): Container => {
  // Repository implementations
  const dutyRepository: DutyRepository = new PostgresDutyRepository(pool);

  return {
    dutyRepository,
  };
}; 