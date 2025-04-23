import { Router } from 'express';
import { CreateDutyCommand } from '../../../application/commands/CreateDutyCommand';
import { UpdateDutyCommand } from '../../../application/commands/UpdateDutyCommand';
import { DeleteDutyCommand } from '../../../application/commands/DeleteDutyCommand';
import { GetDutyQuery } from '../../../application/queries/GetDutyQuery';
import { DutyRepository } from '../../../domain/repositories/DutyRepository';
import { Type } from '../../../../types/domain/entities/Type';

export const createDutyRoutes = (dutyRepository: DutyRepository) => {
  const router = Router();
  const createDutyCommand = new CreateDutyCommand(dutyRepository);
  const updateDutyCommand = new UpdateDutyCommand(dutyRepository);
  const deleteDutyCommand = new DeleteDutyCommand(dutyRepository);
  const getDutyQuery = new GetDutyQuery(dutyRepository);

  /**
   * @swagger
   * /api/duties:
   *   post:
   *     summary: Create a new duty
   *     tags: [Duties]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - name
   *               - type
   *             properties:
   *               name:
   *                 type: string
   *               type:
   *                 $ref: '#/components/schemas/Type'
   *     responses:
   *       201:
   *         description: Duty created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Duty'
   *       400:
   *         description: Invalid input
   */
  router.post('/', async (req, res) => {
    const { name, type } = req.body;
    const duty = await createDutyCommand.execute(name, type);
    res.status(201).json(duty);
  });

  /**
   * @swagger
   * /api/duties/{id}:
   *   get:
   *     summary: Get a duty by ID
   *     tags: [Duties]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *     responses:
   *       200:
   *         description: Duty found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Duty'
   *       404:
   *         description: Duty not found
   */
  router.get('/:id', async (req, res) => {
    const duty = await getDutyQuery.execute(req.params.id);
    res.json(duty);
  });

  /**
   * @swagger
   * /api/duties/{id}:
   *   put:
   *     summary: Update a duty
   *     tags: [Duties]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - name
   *               - type
   *             properties:
   *               name:
   *                 type: string
   *               type:
   *                 $ref: '#/components/schemas/Type'
   *               completed:
   *                 type: boolean
   *     responses:
   *       200:
   *         description: Duty updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Duty'
   *       404:
   *         description: Duty not found
   */
  router.put('/:id', async (req, res) => {
    const { name, type, completed } = req.body;
    const duty = await updateDutyCommand.execute(req.params.id, name, type, completed);
    res.json(duty);
  });

  /**
   * @swagger
   * /api/duties/{id}:
   *   delete:
   *     summary: Delete a duty
   *     tags: [Duties]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *     responses:
   *       204:
   *         description: Duty deleted successfully
   *       404:
   *         description: Duty not found
   */
  router.delete('/:id', async (req, res) => {
    await deleteDutyCommand.execute(req.params.id);
    res.status(204).send();
  });

  return router;
}; 