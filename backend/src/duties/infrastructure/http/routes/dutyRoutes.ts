import { Router } from 'express';
import { CreateDutyCommand } from '../../../application/commands/CreateDutyCommand';
import { UpdateDutyCommand } from '../../../application/commands/UpdateDutyCommand';
import { DeleteDutyCommand } from '../../../application/commands/DeleteDutyCommand';
import { GetDutyQuery } from '../../../application/queries/GetDutyQuery';
import { GetPaginatedDutiesQuery } from '../../../application/queries/GetPaginatedDutiesQuery';
import { GetDutyLogsQuery } from '../../../application/queries/GetDutyLogsQuery';
import { DutyRepository } from '../../../domain/repositories/DutyRepository';
import { DutyLogRepository } from '../../../domain/repositories/DutyLogRepository';
import { TypeRepository } from '../../../../types/domain/repositories/TypeRepository';
import { DutyEventHandler } from '../../../application/event-handlers/DutyEventHandler';
import { createGetPaginatedDutiesHandler } from './handlers/getPaginatedDutiesHandler';
import { createCreateDutyHandler } from './handlers/createDutyHandler';
import { createGetDutyByIdHandler } from './handlers/getDutyByIdHandler';
import { createUpdateDutyHandler } from './handlers/updateDutyHandler';
import { createDeleteDutyHandler } from './handlers/deleteDutyHandler';
import { createGetDutyLogsHandler } from './handlers/getDutyLogsHandler';

export const createDutyRoutes = (
  dutyRepository: DutyRepository,
  dutyLogRepository: DutyLogRepository,
  typeRepository: TypeRepository
) => {
  const router = Router();
  const dutyEventHandler = new DutyEventHandler(dutyLogRepository);
  const createDutyCommand = new CreateDutyCommand(dutyRepository, typeRepository, dutyEventHandler);
  const updateDutyCommand = new UpdateDutyCommand(dutyRepository, typeRepository, dutyEventHandler);
  const deleteDutyCommand = new DeleteDutyCommand(dutyRepository, dutyEventHandler);
  const getDutyQuery = new GetDutyQuery(dutyRepository);
  const getPaginatedDutiesQuery = new GetPaginatedDutiesQuery(dutyRepository);
  const getDutyLogsQuery = new GetDutyLogsQuery(dutyLogRepository);

  router.get('/', createGetPaginatedDutiesHandler(getPaginatedDutiesQuery));
  router.post('/', createCreateDutyHandler(createDutyCommand));
  router.get('/:id', createGetDutyByIdHandler(getDutyQuery));
  router.put('/:id', createUpdateDutyHandler(updateDutyCommand));
  router.delete('/:id', createDeleteDutyHandler(deleteDutyCommand));
  router.get('/:id/logs', createGetDutyLogsHandler(getDutyLogsQuery));

  return router;
}; 