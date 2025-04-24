import { useState, useEffect } from 'react';
import { message } from 'antd';
import { typesApi } from '../api/api';
import { Type, CreateTypeDto, UpdateTypeDto } from '../types/models';

export const useTypes = () => {
  const [types, setTypes] = useState<Type[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTypes = async () => {
    try {
      console.log('Fetching types...');
      setLoading(true);
      const response = await typesApi.getAll();
      console.log('Received types:', response);
      setTypes(response);
    } catch (error) {
      console.error('Error fetching types:', error);
      message.error('Failed to fetch types');
    } finally {
      setLoading(false);
    }
  };

  const createType = async (type: CreateTypeDto) => {
    try {
      console.log('Creating type:', type);
      const newType = await typesApi.create(type);
      console.log('Created type:', newType);
      setTypes(prev => [...prev, newType]);
      message.success('Type created successfully');
      return newType;
    } catch (error) {
      console.error('Error creating type:', error);
      message.error('Failed to create type');
      throw error;
    }
  };

  const updateType = async (id: string, type: UpdateTypeDto) => {
    try {
      console.log('Updating type:', { id, type });
      const updatedType = await typesApi.update(id, type);
      console.log('Updated type:', updatedType);
      setTypes(prev => prev.map(t => t.id === id ? updatedType : t));
      message.success('Type updated successfully');
      return updatedType;
    } catch (error) {
      console.error('Error updating type:', error);
      message.error('Failed to update type');
      throw error;
    }
  };

  useEffect(() => {
    console.log('useTypes effect triggered');
    fetchTypes();
  }, []);

  // Log types changes
  useEffect(() => {
    console.log('Current types:', types);
  }, [types]);

  return {
    types,
    loading,
    fetchTypes,
    createType,
    updateType,
  };
}; 