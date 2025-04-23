import { Request, Response } from 'express';
import { UpdateDutyCommand } from '../../../../application/commands/UpdateDutyCommand';
import { UpdateDutyDto } from '../../dtos/DutyDto';

export const createUpdateDutyHandler = (updateDutyCommand: UpdateDutyCommand) => {
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
   *               - description
   *               - type
   *             properties:
   *               name:
   *                 type: string
   *               description:
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
  return async (req: Request, res: Response) => {
    const updateDutyDto: UpdateDutyDto = req.body;
    const duty = await updateDutyCommand.execute(req.params.id, updateDutyDto);
    res.json(duty);
  };
}; 