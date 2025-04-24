import { Request, Response } from 'express';
import { GetAllTypesQuery } from '../../../../application/queries/GetAllTypesQuery';

export const createGetAllTypesHandler = (getAllTypesQuery: GetAllTypesQuery) => {
  /**
   * @swagger
   * /api/types:
   *   get:
   *     summary: Get all types
   *     tags: [Types]
   *     responses:
   *       200:
   *         description: List of types
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Type'
   */
  return async (req: Request, res: Response) => {
    const types = await getAllTypesQuery.execute();
    res.json(types);
  };
}; 