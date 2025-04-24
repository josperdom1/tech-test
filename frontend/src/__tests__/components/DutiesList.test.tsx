import React from 'react';
import { render, screen } from '@testing-library/react';
import { DutiesList } from '../../components/duties/DutiesList';
import { useDuties } from '../../hooks/useDuties';

// Mock the useDuties hook
jest.mock('../../hooks/useDuties');
const mockUseDuties = useDuties as jest.MockedFunction<typeof useDuties>;

describe('DutiesList', () => {
  const mockDuties = [
    {
      id: '1',
      name: 'Test Duty',
      description: 'Test Description',
      type: { id: '1', name: 'Test Type' },
      completed: false,
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    },
  ];

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Setup default mock implementation
    mockUseDuties.mockReturnValue({
      duties: mockDuties,
      loading: false,
      pagination: {
        current: 1,
        pageSize: 10,
        total: 1,
      },
      fetchDuties: jest.fn(),
      createDuty: jest.fn(),
      updateDuty: jest.fn(),
      deleteDuty: jest.fn(),
      getDutyLogs: jest.fn().mockResolvedValue([]),
    });
  });

  test('renders duties list with data', () => {
    render(<DutiesList />);
    
    // Check if the table is rendered with the mock data
    expect(screen.getByText('Test Duty')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Test Type')).toBeInTheDocument();
  });
});
