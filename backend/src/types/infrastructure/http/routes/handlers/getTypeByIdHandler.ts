import { Request, Response } from 'express';
import { GetTypeQuery } from '../../../../application/queries/GetTypeQuery';

export const createGetTypeByIdHandler = (getTypeQuery: GetTypeQuery) => {
  /**
   * @swagger
   * /api/types/{id}:
   *   get:
   *     summary: Get a type by ID
   *     tags: [Types]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *     responses:
   *       200:
   *         description: Type found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Type'
   *       404:
   *         description: Type not found
   */
  return async (req: Request, res: Response) => {
    const type = await getTypeQuery.execute(req.params.id);
    res.json(type);
  };
}; 