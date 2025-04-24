import { Router } from 'express';
import { Container } from '../../dependency-injection/container';
import { createDutyRoutes } from '@/duties/infrastructure/http/routes/dutyRoutes';
import { createTypeRoutes } from '@/types/infrastructure/http/routes/typeRoutes';

export const createRoutes = (container: Container) => {
  const router = Router();

  router.use('/duties', createDutyRoutes(container.dutyRepository, container.dutyLogRepository, container.typeRepository));
  router.use('/types', createTypeRoutes(container.typeRepository));

  return router;
}; 