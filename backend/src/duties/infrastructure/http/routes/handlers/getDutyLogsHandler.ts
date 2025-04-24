import { Request, Response } from 'express';
import { GetDutyLogsQuery } from '../../../../application/queries/GetDutyLogsQuery';
import { DutyLog } from '../../../../domain/entities/DutyLog';

export const createGetDutyLogsHandler = (getDutyLogsQuery: GetDutyLogsQuery) => {
  /**
   * @swagger
   * /api/duties/{id}/logs:
   *   get:
   *     summary: Get all logs for a specific duty
   *     tags: [Duties]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *         description: The duty ID
   *     responses:
   *       200:
   *         description: List of duty logs
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: string
   *                     format: uuid
   *                   dutyId:
   *                     type: string
   *                     format: uuid
   *                   action:
   *                     type: string
   *                     enum: [CREATED, UPDATED, DELETED]
   *                   details:
   *                     type: string
   *                   createdAt:
   *                     type: string
   *                     format: date-time
   *       404:
   *         description: Duty not found
   */
  return async (req: Request, res: Response) => {
    const logs = await getDutyLogsQuery.execute(req.params.id);
    res.json(logs);
  };
}; 