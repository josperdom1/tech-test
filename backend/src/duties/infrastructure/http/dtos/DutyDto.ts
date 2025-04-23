export interface TypeDto {
  id: string;
  name: string;
}

export interface DutyDto {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  type: TypeDto;
}

export interface CreateDutyDto {
  name: string;
  description: string;
  type: TypeDto;
}

export interface UpdateDutyDto {
  name: string;
  description: string;
  type: TypeDto;
  completed?: boolean;
}

export interface PaginatedDutiesDto {
  duties: DutyDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
} 