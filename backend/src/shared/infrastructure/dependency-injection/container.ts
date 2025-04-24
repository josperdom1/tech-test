import { Pool } from 'pg';
import { DutyRepository } from '../../../duties/domain/repositories/DutyRepository';
import { PostgresDutyRepository } from '../../../duties/infrastructure/persistence/PostgresDutyRepository';
import { DutyLogRepository } from '../../../duties/domain/repositories/DutyLogRepository';
import { PostgresDutyLogRepository } from '../../../duties/infrastructure/persistence/PostgresDutyLogRepository';
import { TypeRepository } from '../../../types/domain/repositories/TypeRepository';
import { PostgresTypeRepository } from '../../../types/infrastructure/persistence/PostgresTypeRepository';

export interface Container {
  dutyRepository: DutyRepository;
  dutyLogRepository: DutyLogRepository;
  typeRepository: TypeRepository;
}

export const createContainer = (pool: Pool): Container => {
  // Repository implementations
  const dutyRepository: DutyRepository = new PostgresDutyRepository(pool);
  const dutyLogRepository: DutyLogRepository = new PostgresDutyLogRepository(pool);
  const typeRepository: TypeRepository = new PostgresTypeRepository(pool);

  return {
    dutyRepository,
    dutyLogRepository,
    typeRepository,
  };
}; 