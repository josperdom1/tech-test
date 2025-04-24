import { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import { dutiesApi } from '../api/api';
import { Duty, CreateDutyDto, UpdateDutyDto, DutyLog } from '../types/models';

export const useDuties = (initialPage = 1, initialLimit = 10) => {
  const [duties, setDuties] = useState<Duty[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: initialPage,
    pageSize: initialLimit,
    total: 0,
  });

  const fetchDuties = useCallback(async (page?: number, limit?: number) => {
    try {
      console.log('Fetching duties with params:', { page, limit });
      setLoading(true);
      const response = await dutiesApi.getAll(
        page ?? pagination.current,
        limit ?? pagination.pageSize
      );
      console.log('Received duties response:', response);
      setDuties(response.duties);
      setPagination({
        current: response.page,
        pageSize: response.limit,
        total: response.total,
      });
    } catch (error) {
      console.error('Error fetching duties:', error);
      message.error('Failed to fetch duties');
    } finally {
      setLoading(false);
    }
  }, []);

  const createDuty = async (duty: CreateDutyDto) => {
    try {
      console.log('Creating duty with data:', JSON.stringify(duty, null, 2));
      const newDuty = await dutiesApi.create(duty);
      console.log('Created duty response:', JSON.stringify(newDuty, null, 2));
      await fetchDuties(pagination.current, pagination.pageSize);
      message.success('Duty created successfully');
      return newDuty;
    } catch (error: any) {
      console.error('Error creating duty:', error);
      console.error('Error details:', {
        status: error.response?.status,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          data: error.config?.data,
        }
      });
      message.error(error.response?.data?.message || 'Failed to create duty');
      throw error;
    }
  };

  const updateDuty = async (id: string, duty: UpdateDutyDto) => {
    try {
      console.log('Updating duty:', { id, duty });
      const updatedDuty = await dutiesApi.update(id, duty);
      console.log('Updated duty:', updatedDuty);
      await fetchDuties(pagination.current, pagination.pageSize);
      message.success('Duty updated successfully');
      return updatedDuty;
    } catch (error) {
      console.error('Error updating duty:', error);
      message.error('Failed to update duty');
      throw error;
    }
  };

  const deleteDuty = async (id: string) => {
    try {
      console.log('Starting deleteDuty operation for ID:', id);
      console.log('Calling API delete endpoint...');
      await dutiesApi.delete(id);
      console.log('API delete call successful');
      console.log('Refreshing duties list...');
      await fetchDuties(pagination.current, pagination.pageSize);
      console.log('Duties list refreshed after deletion');
      message.success('Duty deleted successfully');
    } catch (error: any) {
      console.error('Error in deleteDuty:', error);
      console.error('Error details:', {
        status: error.response?.status,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          data: error.config?.data,
        }
      });
      message.error('Failed to delete duty');
      throw error;
    }
  };

  const getDutyLogs = async (id: string): Promise<DutyLog[]> => {
    try {
      console.log('Fetching logs for duty:', id);
      const logs = await dutiesApi.getLogs(id);
      console.log('Received duty logs:', logs);
      return logs;
    } catch (error) {
      console.error('Error fetching duty logs:', error);
      message.error('Failed to fetch duty logs');
      throw error;
    }
  };

  useEffect(() => {
    console.log('useEffect triggered, fetching duties...');
    fetchDuties();
  }, [fetchDuties]);

  // Log state changes
  useEffect(() => {
    console.log('Current duties:', duties);
    console.log('Current pagination:', pagination);
  }, [duties, pagination]);

  return {
    duties,
    loading,
    pagination,
    fetchDuties,
    createDuty,
    updateDuty,
    deleteDuty,
    getDutyLogs,
  };
}; 