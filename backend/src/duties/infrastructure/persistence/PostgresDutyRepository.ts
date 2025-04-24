import { Pool } from 'pg';
import { Duty } from '../../domain/entities/Duty';
import { DutyRepository } from '../../domain/repositories/DutyRepository';
import { Type } from '../../../types/domain/entities/Type';
import { DatabaseError } from '../../../shared/domain/errors/DatabaseError';

export class PostgresDutyRepository implements DutyRepository {
  constructor(private readonly pool: Pool) {}

  async save(duty: Duty): Promise<void> {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      
      await client.query(
        `INSERT INTO duties (id, name, description, completed, created_at, updated_at, type_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [duty.id, duty.name, duty.description, duty.completed, duty.createdAt, duty.updatedAt, duty.type.id]
      );

      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw new DatabaseError('Error saving duty', error);
    } finally {
      client.release();
    }
  }

  async findById(id: string): Promise<Duty | null> {
    try {
      const result = await this.pool.query(
        `SELECT d.*, t.name as type_name 
         FROM duties d
         JOIN types t ON d.type_id = t.id
         WHERE d.id = $1 AND d.deleted = false`,
        [id]
      );

      if (result.rows.length === 0) {
        return null;
      }

      const row = result.rows[0];
      return new Duty(
        row.id,
        row.name,
        row.description,
        row.completed,
        row.created_at,
        row.updated_at,
        new Type(row.type_id, row.type_name),
        row.deleted
      );
    } catch (error) {
      throw new DatabaseError('Error finding duty', error);
    }
  }

  async findAll(): Promise<Duty[]> {
    try {
      const result = await this.pool.query(
        `SELECT d.*, t.name as type_name 
         FROM duties d
         JOIN types t ON d.type_id = t.id
         WHERE d.deleted = false
         ORDER BY d.created_at DESC`
      );

      return result.rows.map(row => new Duty(
        row.id,
        row.name,
        row.description,
        row.completed,
        row.created_at,
        row.updated_at,
        new Type(row.type_id, row.type_name),
        row.deleted
      ));
    } catch (error) {
      throw new DatabaseError('Error finding duties', error);
    }
  }

  async findAllPaginated(page: number, limit: number): Promise<{ duties: Duty[]; total: number }> {
    try {
      const offset = (page - 1) * limit;
      
      const [dutiesResult, totalResult] = await Promise.all([
        this.pool.query(
          `SELECT d.*, t.name as type_name 
           FROM duties d
           JOIN types t ON d.type_id = t.id
           WHERE d.deleted = false
           ORDER BY d.created_at DESC
           LIMIT $1 OFFSET $2`,
          [limit, offset]
        ),
        this.pool.query('SELECT COUNT(*) FROM duties WHERE deleted = false')
      ]);

      const duties = dutiesResult.rows.map(row => new Duty(
        row.id,
        row.name,
        row.description,
        row.completed,
        row.created_at,
        row.updated_at,
        new Type(row.type_id, row.type_name),
        row.deleted
      ));

      return {
        duties,
        total: parseInt(totalResult.rows[0].count)
      };
    } catch (error) {
      throw new DatabaseError('Error finding paginated duties', error);
    }
  }

  async update(duty: Duty): Promise<void> {
    try {
      const result = await this.pool.query(
        `UPDATE duties 
         SET name = $1, description = $2, completed = $3, updated_at = $4, deleted = $5
         WHERE id = $6`,
        [duty.name, duty.description, duty.completed, duty.updatedAt, duty.deleted, duty.id]
      );

      if (result.rowCount === 0) {
        throw new Error('Duty not found');
      }
    } catch (error) {
      throw new DatabaseError('Error updating duty', error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const result = await this.pool.query(
        `UPDATE duties 
         SET deleted = true, updated_at = NOW()
         WHERE id = $1`,
        [id]
      );

      if (result.rowCount === 0) {
        throw new Error('Duty not found');
      }
    } catch (error) {
      throw new DatabaseError('Error deleting duty', error);
    }
  }
} 