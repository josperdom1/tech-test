import { Router } from 'express';
import { Container } from '../../dependency-injection/container';
import { createDutyRoutes } from '@/duties/infrastructure/http/routes/dutyRoutes';


export const createRoutes = (container: Container) => {
  const router = Router();

  router.use('/duties', createDutyRoutes(container.dutyRepository));

  return router;
}; 