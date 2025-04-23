import { Request, Response } from 'express';
import { GetDutyQuery } from '../../../../application/queries/GetDutyQuery';

export const createGetDutyByIdHandler = (getDutyQuery: GetDutyQuery) => {
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
  return async (req: Request, res: Response) => {
    const duty = await getDutyQuery.execute(req.params.id);
    res.json(duty);
  };
}; 