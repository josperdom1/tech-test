import { Router } from 'express';
import { CreateDutyCommand } from '../../../application/commands/CreateDutyCommand';
import { UpdateDutyCommand } from '../../../application/commands/UpdateDutyCommand';
import { DeleteDutyCommand } from '../../../application/commands/DeleteDutyCommand';
import { GetDutyQuery } from '../../../application/queries/GetDutyQuery';
import { GetPaginatedDutiesQuery } from '../../../application/queries/GetPaginatedDutiesQuery';
import { DutyRepository } from '../../../domain/repositories/DutyRepository';
import { createGetPaginatedDutiesHandler } from './handlers/getPaginatedDutiesHandler';
import { createCreateDutyHandler } from './handlers/createDutyHandler';
import { createGetDutyByIdHandler } from './handlers/getDutyByIdHandler';
import { createUpdateDutyHandler } from './handlers/updateDutyHandler';
import { createDeleteDutyHandler } from './handlers/deleteDutyHandler';

export const createDutyRoutes = (dutyRepository: DutyRepository) => {
  const router = Router();
  const createDutyCommand = new CreateDutyCommand(dutyRepository);
  const updateDutyCommand = new UpdateDutyCommand(dutyRepository);
  const deleteDutyCommand = new DeleteDutyCommand(dutyRepository);
  const getDutyQuery = new GetDutyQuery(dutyRepository);
  const getPaginatedDutiesQuery = new GetPaginatedDutiesQuery(dutyRepository);

  router.get('/', createGetPaginatedDutiesHandler(getPaginatedDutiesQuery));
  router.post('/', createCreateDutyHandler(createDutyCommand));
  router.get('/:id', createGetDutyByIdHandler(getDutyQuery));
  router.put('/:id', createUpdateDutyHandler(updateDutyCommand));
  router.delete('/:id', createDeleteDutyHandler(deleteDutyCommand));

  return router;
}; 