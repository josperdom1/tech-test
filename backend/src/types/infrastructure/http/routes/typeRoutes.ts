import { Router } from 'express';
import { CreateTypeCommand } from '../../../application/commands/CreateTypeCommand';
import { UpdateTypeCommand } from '../../../application/commands/UpdateTypeCommand';
import { GetTypeQuery } from '../../../application/queries/GetTypeQuery';
import { GetAllTypesQuery } from '../../../application/queries/GetAllTypesQuery';
import { TypeRepository } from '../../../domain/repositories/TypeRepository';
import { createCreateTypeHandler } from './handlers/createTypeHandler';
import { createGetTypeByIdHandler } from './handlers/getTypeByIdHandler';
import { createGetAllTypesHandler } from './handlers/getAllTypesHandler';
import { createUpdateTypeHandler } from './handlers/updateTypeHandler';

export const createTypeRoutes = (typeRepository: TypeRepository) => {
  const router = Router();
  const createTypeCommand = new CreateTypeCommand(typeRepository);
  const updateTypeCommand = new UpdateTypeCommand(typeRepository);
  const getTypeQuery = new GetTypeQuery(typeRepository);
  const getAllTypesQuery = new GetAllTypesQuery(typeRepository);

  router.get('/', createGetAllTypesHandler(getAllTypesQuery));
  router.post('/', createCreateTypeHandler(createTypeCommand));
  router.get('/:id', createGetTypeByIdHandler(getTypeQuery));
  router.put('/:id', createUpdateTypeHandler(updateTypeCommand));

  return router;
}; 