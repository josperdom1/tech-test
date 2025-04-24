import { Pool } from 'pg';
import { Type } from '../../domain/entities/Type';
import { TypeRepository } from '../../domain/repositories/TypeRepository';
import { DatabaseError } from '../../../shared/domain/errors/DatabaseError';

export class PostgresTypeRepository implements TypeRepository {
  constructor(private readonly pool: Pool) {}

  async save(type: Type): Promise<void> {
    try {
      await this.pool.query(
        'INSERT INTO types (id, name) VALUES ($1, $2)',
        [type.id, type.name]
      );
    } catch (error) {
      throw new DatabaseError('Error saving type', error);
    }
  }

  async findById(id: string): Promise<Type | null> {
    try {
      const result = await this.pool.query(
        'SELECT * FROM types WHERE id = $1',
        [id]
      );

      if (result.rows.length === 0) {
        return null;
      }

      const row = result.rows[0];
      return new Type(row.id, row.name);
    } catch (error) {
      throw new DatabaseError('Error finding type', error);
    }
  }

  async findAll(): Promise<Type[]> {
    try {
      const result = await this.pool.query('SELECT * FROM types');
      return result.rows.map(row => new Type(row.id, row.name));
    } catch (error) {
      throw new DatabaseError('Error finding types', error);
    }
  }

  async update(type: Type): Promise<void> {
    try {
      await this.pool.query(
        'UPDATE types SET name = $1 WHERE id = $2',
        [type.name, type.id]
      );
    } catch (error) {
      throw new DatabaseError('Error updating type', error);
    }
  }
} 