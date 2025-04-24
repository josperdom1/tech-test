import { Request, Response } from 'express';
import { CreateTypeCommand } from '../../../../application/commands/CreateTypeCommand';
import { CreateTypeDto } from '../../dtos/TypeDto';

export const createCreateTypeHandler = (createTypeCommand: CreateTypeCommand) => {
  /**
   * @swagger
   * /api/types:
   *   post:
   *     summary: Create a new type
   *     tags: [Types]
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
   *       201:
   *         description: Type created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Type'
   *       400:
   *         description: Invalid input
   */
  return async (req: Request, res: Response) => {
    const createTypeDto: CreateTypeDto = req.body;
    const type = await createTypeCommand.execute(createTypeDto);
    res.status(201).json(type);
  };
}; 