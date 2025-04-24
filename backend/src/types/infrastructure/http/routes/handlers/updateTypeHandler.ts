import { Request, Response } from 'express';
import { UpdateTypeCommand } from '../../../../application/commands/UpdateTypeCommand';
import { UpdateTypeDto } from '../../dtos/TypeDto';

export const createUpdateTypeHandler = (updateTypeCommand: UpdateTypeCommand) => {
  /**
   * @swagger
   * /api/types/{id}:
   *   put:
   *     summary: Update a type
   *     tags: [Types]
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
   *             properties:
   *               name:
   *                 type: string
   *     responses:
   *       200:
   *         description: Type updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Type'
   *       404:
   *         description: Type not found
   */
  return async (req: Request, res: Response) => {
    const updateTypeDto: UpdateTypeDto = req.body;
    const type = await updateTypeCommand.execute(req.params.id, updateTypeDto);
    res.json(type);
  };
}; 