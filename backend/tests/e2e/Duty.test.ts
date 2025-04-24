import request from 'supertest';
import { Server } from '../../src/shared/infrastructure/http/Server';
import { createContainer } from '../../src/shared/infrastructure/dependency-injection/container';
import { Type } from '../../src/types/domain/entities/Type';
import { Pool } from 'pg';

describe('Duty E2E Tests', () => {
  let server: Server;
  let testType: Type;
  let pool: Pool;

  beforeAll(async () => {
    // Create a test type
    testType = new Type('11111111-1111-1111-1111-111111111111', 'Work');

    // Initialize server
    pool = new Pool({
      host: process.env.DB_HOST || 'test-db',
      port: parseInt(process.env.DB_PORT || '5432'),
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'duties'
    });
    const container = createContainer(pool);
    server = new Server(container);
  });

  afterAll(async () => {
    await pool.end();
  });

  beforeEach(async () => {
    // Clean up tables before each test, respecting foreign key constraints
    await pool.query('DELETE FROM duty_logs');
    await pool.query('DELETE FROM duties');
  });

  it('should create, read, update and list duties', async () => {
    // Create a duty
    const createResponse = await request(server['app'])
      .post('/api/duties')
      .send({
        name: 'Test Duty',
        description: 'Test Description',
        type: {
          id: testType.id,
          name: testType.name
        }
      });

    expect(createResponse.status).toBe(201);
    expect(createResponse.body).toHaveProperty('id');
    expect(createResponse.body.name).toBe('Test Duty');
    expect(createResponse.body.description).toBe('Test Description');
    expect(createResponse.body.completed).toBe(false);
    expect(createResponse.body.type.id).toBe(testType.id);

    const dutyId = createResponse.body.id;

    // Get the duty
    const getResponse = await request(server['app'])
      .get(`/api/duties/${dutyId}`);

    expect(getResponse.status).toBe(200);
    expect(getResponse.body.id).toBe(dutyId);
    expect(getResponse.body.name).toBe('Test Duty');

    // Update the duty
    const updateResponse = await request(server['app'])
      .put(`/api/duties/${dutyId}`)
      .send({
        name: 'Updated Duty',
        description: 'Updated Description',
        type: {
          id: testType.id,
          name: testType.name
        },
        completed: true
      });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.name).toBe('Updated Duty');
    expect(updateResponse.body.description).toBe('Updated Description');
    expect(updateResponse.body.completed).toBe(true);

    // Get all duties
    const listResponse = await request(server['app'])
      .get('/api/duties');

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.duties).toHaveLength(1);
    expect(listResponse.body.duties[0].id).toBe(dutyId);
    expect(listResponse.body.duties[0].name).toBe('Updated Duty');
  });

  it('should handle duty logs', async () => {
    // Create a duty
    const createResponse = await request(server['app'])
      .post('/api/duties')
      .send({
        name: 'Test Duty',
        description: 'Test Description',
        type: {
          id: testType.id,
          name: testType.name
        }
      });

    const dutyId = createResponse.body.id;

    // Get duty logs
    const logsResponse = await request(server['app'])
      .get(`/api/duties/${dutyId}/logs`);

    expect(logsResponse.status).toBe(200);
    expect(Array.isArray(logsResponse.body)).toBe(true);
    expect(logsResponse.body).toHaveLength(1);
    expect(logsResponse.body[0].action).toBe('CREATED');
    expect(logsResponse.body[0].dutyId).toBe(dutyId);
  });

  it('should handle validation errors', async () => {
    // Try to create a duty without type
    const createResponse = await request(server['app'])
      .post('/api/duties')
      .send({
        name: 'Test Duty',
        description: 'Test Description'
      });

    expect(createResponse.status).toBe(400);
    expect(createResponse.body).toHaveProperty('error');
    expect(createResponse.body.error).toContain('Type is required');
  });

  it('should not create a duty for non-existent type', async () => {
    const nonExistentTypeId = '99999999-9999-9999-9999-999999999999';
    // Try to create a duty with non-existent type
    const createResponse = await request(server['app'])
      .post('/api/duties')
      .send({
        name: 'Test Duty',
        description: 'Test Description',
        type: {
          id: nonExistentTypeId,
          name: 'Non-existent Type'
        }
      });

    expect(createResponse.status).toBe(400);
    expect(createResponse.body).toHaveProperty('error');
    expect(createResponse.body.error).toContain(`Type with id ${nonExistentTypeId} does not exist`);
  });
}); 