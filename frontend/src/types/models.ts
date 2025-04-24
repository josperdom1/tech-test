export interface Type {
  id: string;
  name: string;
}

export interface Duty {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  type: Type;
}

export interface DutyLog {
  id: string;
  dutyId: string;
  action: 'CREATED' | 'UPDATED' | 'DELETED';
  details: string;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  duties: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateDutyDto {
  name: string;
  description: string;
  type: {
    id: string;
  };
}

export interface UpdateDutyDto extends CreateDutyDto {
  completed?: boolean;
}

export interface CreateTypeDto {
  name: string;
}

export interface UpdateTypeDto extends CreateTypeDto {} 