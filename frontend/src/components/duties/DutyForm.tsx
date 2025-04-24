import React, { useEffect } from 'react';
import { Form, Input, Select, Switch, Button } from 'antd';
import { useTypes } from '../../hooks/useTypes';
import { CreateDutyDto, UpdateDutyDto, Duty } from '../../types/models';

interface DutyFormProps {
  initialValues?: Duty;
  onSubmit: (values: CreateDutyDto | UpdateDutyDto) => Promise<void>;
}

export const DutyForm: React.FC<DutyFormProps> = ({ initialValues, onSubmit }) => {
  const [form] = Form.useForm();
  const { types, loading: typesLoading } = useTypes();

  useEffect(() => {
    console.log('DutyForm mounted with types:', types);
    console.log('Initial values:', initialValues);
  }, [types, initialValues]);

  // Reset form when initialValues change
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        type: initialValues.type.id
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleSubmit = async (values: any) => {
    console.log('Form submitted with values:', values);
    try {
      // Transform the form values to match the DTO
      const transformedValues = {
        ...values,
        type: {
          id: values.type
        }
      };
      console.log('Transformed values:', transformedValues);
      await onSubmit(transformedValues);
      form.resetFields();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      onValuesChange={(changedValues) => {
        console.log('Form values changed:', changedValues);
      }}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[
          { required: true, message: 'Please enter the duty name' },
          { min: 3, message: 'Name must be at least 3 characters' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[
          { required: true, message: 'Please enter the description' },
          { min: 10, message: 'Description must be at least 10 characters' },
        ]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item
        name="type"
        label="Type"
        rules={[{ required: true, message: 'Please select a type' }]}
      >
        <Select 
          loading={typesLoading}
          placeholder="Select a type"
          notFoundContent={typesLoading ? "Loading..." : "No types available"}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.children as unknown as string)
              .toLowerCase()
              .includes(input.toLowerCase())
          }
        >
          {types.map(type => (
            <Select.Option key={type.id} value={type.id}>
              {type.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      {initialValues && (
        <Form.Item
          name="completed"
          label="Completed"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      )}

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {initialValues ? 'Update' : 'Create'}
        </Button>
      </Form.Item>
    </Form>
  );
}; 