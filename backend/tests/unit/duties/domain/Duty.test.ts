import { Duty } from '../../../../src/duties/domain/entities/Duty';
import { Type } from '../../../../src/types/domain/entities/Type';

describe('Duty', () => {
  let type: Type;
  let duty: Duty;

  beforeEach(() => {
    type = new Type('1', 'Test Type');
    duty = Duty.create('Test Duty', 'Test Description', type);
  });

  it('should create a duty with correct initial values', () => {
    expect(duty.name).toBe('Test Duty');
    expect(duty.description).toBe('Test Description');
    expect(duty.completed).toBe(false);
    expect(duty.type).toBe(type);
    expect(duty.id).toBeDefined();
    expect(duty.createdAt).toBeInstanceOf(Date);
    expect(duty.updatedAt).toBeInstanceOf(Date);
  });

  it('should complete a duty', () => {
    duty.complete();
    expect(duty.completed).toBe(true);
    expect(duty.updatedAt).toBeInstanceOf(Date);
  });

  it('should uncomplete a duty', () => {
    duty.complete();
    duty.uncomplete();
    expect(duty.completed).toBe(false);
    expect(duty.updatedAt).toBeInstanceOf(Date);
  });
}); 