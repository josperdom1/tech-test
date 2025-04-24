import React from 'react';
import { render, screen } from '@testing-library/react';
import { DutyForm } from '../../components/duties/DutyForm';
import { useTypes } from '../../hooks/useTypes';

// Mock the useTypes hook
jest.mock('../../hooks/useTypes');
const mockUseTypes = useTypes as jest.MockedFunction<typeof useTypes>;

describe('DutyForm', () => {
  const mockTypes = [
    { id: '1', name: 'Type 1' },
    { id: '2', name: 'Type 2' },
  ];

  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Setup default mock implementation
    mockUseTypes.mockReturnValue({
      types: mockTypes,
      loading: false,
      fetchTypes: jest.fn(),
      createType: jest.fn(),
      updateType: jest.fn(),
    });
  });

  test('renders form with all required fields', () => {
    render(<DutyForm onSubmit={mockOnSubmit} />);
    
    // Check if all form fields are rendered
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Type')).toBeInTheDocument();
    
    // Check if submit button is rendered
    expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument();
  });

  test('renders form with initial values', () => {
    const initialValues = {
      id: '1',
      name: 'Test Duty',
      description: 'Test Description',
      type: { id: '1', name: 'Type 1' },
      completed: false,
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    };

    render(<DutyForm initialValues={initialValues} onSubmit={mockOnSubmit} />);
    
    // Check if all form fields are rendered with initial values
    expect(screen.getByLabelText('Name')).toHaveValue('Test Duty');
    expect(screen.getByLabelText('Description')).toHaveValue('Test Description');
    
    // Check if type select has the correct option selected
    const typeSelect = screen.getByLabelText('Type');
    expect(typeSelect).toBeInTheDocument();
    expect(screen.getByText('Type 1')).toBeInTheDocument();
    
    // Check if completed switch is rendered for edit mode
    expect(screen.getByLabelText('Completed')).toBeInTheDocument();
    
    // Check if submit button shows Update instead of Create
    expect(screen.getByRole('button', { name: 'Update' })).toBeInTheDocument();
  });
});
