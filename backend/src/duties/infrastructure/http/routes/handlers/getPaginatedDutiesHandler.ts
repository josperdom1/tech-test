import { Request, Response } from 'express';
import { GetPaginatedDutiesQuery } from '../../../../application/queries/GetPaginatedDutiesQuery';

export const createGetPaginatedDutiesHandler = (getPaginatedDutiesQuery: GetPaginatedDutiesQuery) => {
  /**
   * @swagger
   * /api/duties:
   *   get:
   *     summary: Get all duties with pagination
   *     tags: [Duties]
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *           minimum: 1
   *           default: 1
   *         description: Page number
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           minimum: 1
   *           maximum: 100
   *           default: 10
   *         description: Number of items per page
   *     responses:
   *       200:
   *         description: List of duties with pagination metadata
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 duties:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Duty'
   *                 total:
   *                   type: integer
   *                   description: Total number of duties
   *                 page:
   *                   type: integer
   *                   description: Current page number
   *                 limit:
   *                   type: integer
   *                   description: Number of items per page
   *                 totalPages:
   *                   type: integer
   *                   description: Total number of pages
   */
  return async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await getPaginatedDutiesQuery.execute(page, limit);
    res.json(result);
  };
}; 