import { Duty } from '../../domain/entities/Duty';
import { DutyRepository } from '../../domain/repositories/DutyRepository';
import { TypeRepository } from '../../../types/domain/repositories/TypeRepository';
import { NotFoundError } from '../../../shared/domain/errors/NotFoundError';
import { InvalidDutyError } from '../../../shared/domain/errors/InvalidDutyError';
import { UpdateDutyDto, DutyDto } from '../../infrastructure/http/dtos/DutyDto';
import { DutyMapper } from '../mappers/DutyMapper';
import { DutyUpdatedEvent } from '../../domain/events/DutyUpdatedEvent';
import { IDutyEventHandler } from '../event-handlers/DutyEventHandler';

export class UpdateDutyCommand {
  constructor(
    private readonly dutyRepository: DutyRepository,
    private readonly typeRepository: TypeRepository,
    private readonly dutyEventHandler: IDutyEventHandler
  ) {}

  async execute(id: string, updateDutyDto: UpdateDutyDto): Promise<DutyDto> {
    if (!updateDutyDto.type || !updateDutyDto.type.id) {
      throw new InvalidDutyError('Type is required for updating a duty');
    }

    const type = await this.typeRepository.findById(updateDutyDto.type.id);
    if (!type) {
      throw new InvalidDutyError(`Type with id ${updateDutyDto.type.id} does not exist`);
    }

    const existingDuty = await this.dutyRepository.findById(id);
    if (!existingDuty) {
      throw new NotFoundError(`Duty with id ${id} not found`);
    }

    const { name, description } = DutyMapper.toDomain(updateDutyDto);
    const updatedDuty = new Duty(
      id,
      name,
      description,
      updateDutyDto.completed ?? existingDuty.completed,
      existingDuty.createdAt,
      new Date(),
      type
    );

    await this.dutyRepository.update(updatedDuty);
    
    // Emit event
    await this.dutyEventHandler.handleDutyUpdated(new DutyUpdatedEvent(updatedDuty));
    
    return DutyMapper.toDto(updatedDuty);
  }
} 