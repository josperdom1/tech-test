import { Request, Response } from 'express';
import { CreateDutyCommand } from '../../../../application/commands/CreateDutyCommand';
import { CreateDutyDto } from '../../dtos/DutyDto';

export const createCreateDutyHandler = (createDutyCommand: CreateDutyCommand) => {
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
   *               - description
   *               - type
   *             properties:
   *               name:
   *                 type: string
   *               description:
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
  return async (req: Request, res: Response) => {
    const createDutyDto: CreateDutyDto = req.body;
    const duty = await createDutyCommand.execute(createDutyDto);
    res.status(201).json(duty);
  };
}; 