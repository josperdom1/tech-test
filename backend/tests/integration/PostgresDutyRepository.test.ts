import { Pool } from 'pg';
import { PostgresDutyRepository } from '../../src/duties/infrastructure/persistence/PostgresDutyRepository';
import { Duty } from '../../src/duties/domain/entities/Duty';
import { Type } from '../../src/types/domain/entities/Type';

describe('PostgresDutyRepository', () => {
  let pool: Pool;
  let repository: PostgresDutyRepository;
  let testType: Type;

  beforeAll(async () => {
    pool = new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'duties'
    });
    repository = new PostgresDutyRepository(pool);

    // Create a test type
    testType = new Type('11111111-1111-1111-1111-111111111111', 'Work');
  });

  afterAll(async () => {
    await pool.end();
  });

  beforeEach(async () => {
    // Clean up tables before each test, respecting foreign key constraints
    await pool.query('DELETE FROM duty_logs');
    await pool.query('DELETE FROM duties');
  });

  it('should save and find a duty', async () => {
    // Arrange
    const duty = new Duty(
      'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      'Test Duty',
      'Test Description',
      false,
      new Date(),
      new Date(),
      testType
    );

    // Act
    await repository.save(duty);
    const foundDuty = await repository.findById(duty.id);

    // Assert
    expect(foundDuty).not.toBeNull();
    expect(foundDuty?.id).toBe(duty.id);
    expect(foundDuty?.name).toBe(duty.name);
    expect(foundDuty?.description).toBe(duty.description);
    expect(foundDuty?.completed).toBe(duty.completed);
    expect(foundDuty?.type.id).toBe(testType.id);
    expect(foundDuty?.type.name).toBe(testType.name);
  });

  it('should find all duties', async () => {
    // Arrange
    const duty1 = new Duty(
      'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      'Test Duty 1',
      'Test Description 1',
      false,
      new Date(),
      new Date(),
      testType
    );
    const duty2 = new Duty(
      'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
      'Test Duty 2',
      'Test Description 2',
      true,
      new Date(),
      new Date(),
      testType
    );

    // Act
    await repository.save(duty1);
    await repository.save(duty2);
    const duties = await repository.findAll();

    // Assert
    expect(duties).toHaveLength(2);
    expect(duties.map(d => d.id)).toContain(duty1.id);
    expect(duties.map(d => d.id)).toContain(duty2.id);
  });

  it('should update a duty', async () => {
    // Arrange
    const duty = new Duty(
      'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      'Test Duty',
      'Test Description',
      false,
      new Date(),
      new Date(),
      testType
    );
    await repository.save(duty);

    // Act
    const updatedDuty = new Duty(
      duty.id,
      'Updated Duty',
      'Updated Description',
      true,
      duty.createdAt,
      new Date(),
      testType
    );
    await repository.update(updatedDuty);
    const foundDuty = await repository.findById(duty.id);

    // Assert
    expect(foundDuty).not.toBeNull();
    expect(foundDuty?.name).toBe('Updated Duty');
    expect(foundDuty?.description).toBe('Updated Description');
    expect(foundDuty?.completed).toBe(true);
  });
}); 