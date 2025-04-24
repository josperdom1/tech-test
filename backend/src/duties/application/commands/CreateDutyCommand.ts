import { Duty } from '../../domain/entities/Duty';
import { DutyRepository } from '../../domain/repositories/DutyRepository';
import { TypeRepository } from '../../../types/domain/repositories/TypeRepository';
import { CreateDutyDto, DutyDto } from '../../infrastructure/http/dtos/DutyDto';
import { DutyMapper } from '../mappers/DutyMapper';
import { DutyCreatedEvent } from '../../domain/events/DutyCreatedEvent';
import { IDutyEventHandler } from '../event-handlers/DutyEventHandler';
import { InvalidDutyError } from '../../../shared/domain/errors/InvalidDutyError';

export class CreateDutyCommand {
  constructor(
    private readonly dutyRepository: DutyRepository,
    private readonly typeRepository: TypeRepository,
    private readonly dutyEventHandler: IDutyEventHandler
  ) {}

  async execute(createDutyDto: CreateDutyDto): Promise<DutyDto> {
    if (!createDutyDto.type || !createDutyDto.type.id) {
      throw new InvalidDutyError('Type is required for creating a duty');
    }

    const type = await this.typeRepository.findById(createDutyDto.type.id);
    if (!type) {
      throw new InvalidDutyError(`Type with id ${createDutyDto.type.id} does not exist`);
    }

    const { name, description } = DutyMapper.toDomain(createDutyDto);
    const duty = Duty.create(name, description, type);
    await this.dutyRepository.save(duty);
    
    // Emit event
    await this.dutyEventHandler.handleDutyCreated(new DutyCreatedEvent(duty));
    
    return DutyMapper.toDto(duty);
  }
} 