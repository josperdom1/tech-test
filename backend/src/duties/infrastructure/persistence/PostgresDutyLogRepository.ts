import { Pool } from 'pg';
import { DutyLog, DutyAction } from '../../domain/entities/DutyLog';
import { DutyLogRepository } from '../../domain/repositories/DutyLogRepository';
import { DatabaseError } from '../../../shared/domain/errors/DatabaseError';

export class PostgresDutyLogRepository implements DutyLogRepository {
  constructor(private readonly pool: Pool) {}

  async save(log: DutyLog): Promise<void> {
    try {
      await this.pool.query(
        `INSERT INTO duty_logs (id, duty_id, action, details, created_at)
         VALUES ($1, $2, $3, $4, $5)`,
        [log.id, log.dutyId, log.action, log.details, log.createdAt]
      );
    } catch (error) {
      throw new DatabaseError('Error saving duty log', error);
    }
  }

  async findByDutyId(dutyId: string): Promise<DutyLog[]> {
    try {
      const result = await this.pool.query(
        `SELECT * FROM duty_logs WHERE duty_id = $1 ORDER BY created_at DESC`,
        [dutyId]
      );

      return result.rows.map(row => new DutyLog(
        row.id,
        row.duty_id,
        row.action as DutyAction,
        row.details,
        row.created_at
      ));
    } catch (error) {
      throw new DatabaseError('Error finding duty logs', error);
    }
  }

  async findAll(): Promise<DutyLog[]> {
    try {
      const result = await this.pool.query(
        `SELECT * FROM duty_logs ORDER BY created_at DESC`
      );

      return result.rows.map(row => new DutyLog(
        row.id,
        row.duty_id,
        row.action as DutyAction,
        row.details,
        row.created_at
      ));
    } catch (error) {
      throw new DatabaseError('Error finding all duty logs', error);
    }
  }
} 