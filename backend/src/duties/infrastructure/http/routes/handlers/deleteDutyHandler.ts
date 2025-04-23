import { Request, Response } from 'express';
import { DeleteDutyCommand } from '../../../../application/commands/DeleteDutyCommand';

export const createDeleteDutyHandler = (deleteDutyCommand: DeleteDutyCommand) => {
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
  return async (req: Request, res: Response) => {
    await deleteDutyCommand.execute(req.params.id);
    res.status(204).send();
  };
}; 