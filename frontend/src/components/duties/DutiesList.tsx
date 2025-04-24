import React, { useState } from 'react';
import { 
  Table, 
  Button, 
  Space, 
  Modal, 
  Tag, 
  Tooltip,
  Typography,
  List,
  Timeline,
  message
} from 'antd';
import { 
  EditOutlined, 
  DeleteOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined,
  HistoryOutlined
} from '@ant-design/icons';
import { Duty, DutyLog } from '../../types/models';
import { DutyForm } from './DutyForm';
import { useDuties } from '../../hooks/useDuties';
import { format } from 'date-fns';

const { Text } = Typography;

export const DutiesList: React.FC = () => {
  const [editingDuty, setEditingDuty] = useState<Duty | undefined>(undefined);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDutyForLogs, setSelectedDutyForLogs] = useState<Duty | undefined>(undefined);
  const [logs, setLogs] = useState<DutyLog[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [dutyToDelete, setDutyToDelete] = useState<Duty | undefined>(undefined);
  const { 
    duties, 
    loading, 
    pagination, 
    fetchDuties, 
    createDuty, 
    updateDuty, 
    deleteDuty,
    getDutyLogs
  } = useDuties();

  const handleViewLogs = async (duty: Duty) => {
    setSelectedDutyForLogs(duty);
    setLoadingLogs(true);
    try {
      const dutyLogs = await getDutyLogs(duty.id);
      setLogs(dutyLogs);
    } catch (error) {
      console.error('Error fetching logs:', error);
    } finally {
      setLoadingLogs(false);
    }
  };

  const handleDelete = async (duty: Duty) => {
    console.log('Delete button clicked for duty ID:', duty.id);
    setDutyToDelete(duty);
  };

  const handleConfirmDelete = async () => {
    if (!dutyToDelete) return;
    
    console.log('Delete confirmation accepted for duty ID:', dutyToDelete.id);
    try {
      console.log('Calling deleteDuty function...');
      await deleteDuty(dutyToDelete.id);
      console.log('Duty deleted successfully, refreshing list...');
      await fetchDuties(pagination.current, pagination.pageSize);
      console.log('List refreshed after deletion');
      message.success('Duty deleted successfully');
    } catch (error) {
      console.error('Error in handleDelete:', error);
      message.error('Failed to delete duty');
    } finally {
      setDutyToDelete(undefined);
    }
  };

  const handleCancelDelete = () => {
    console.log('Delete cancelled');
    setDutyToDelete(undefined);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Type',
      dataIndex: ['type', 'name'],
      key: 'type',
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: 'Status',
      dataIndex: 'completed',
      key: 'completed',
      render: (completed: boolean) => (
        <Tag color={completed ? 'success' : 'processing'} icon={completed ? <CheckCircleOutlined /> : <ClockCircleOutlined />}>
          {completed ? 'Completed' : 'Pending'}
        </Tag>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => format(new Date(date), 'PPp'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Duty) => (
        <Space>
          <Tooltip title="View Logs">
            <Button 
              icon={<HistoryOutlined />} 
              onClick={() => handleViewLogs(record)}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button 
              icon={<EditOutlined />} 
              onClick={() => {
                setEditingDuty(record);
                setIsModalVisible(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button 
              danger 
              icon={<DeleteOutlined />} 
              onClick={() => handleDelete(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleTableChange = (pagination: any) => {
    console.log('Table pagination changed:', pagination);
    fetchDuties(pagination.current, pagination.pageSize);
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button 
          type="primary" 
          onClick={() => {
            setEditingDuty(undefined);
            setIsModalVisible(true);
          }}
        >
          Create New Duty
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={duties}
        rowKey="id"
        loading={loading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          pageSizeOptions: ['5', '10', '20', '50'],
        }}
        onChange={handleTableChange}
      />

      <Modal
        title={editingDuty ? 'Edit Duty' : 'Create New Duty'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <DutyForm
          initialValues={editingDuty}
          onSubmit={async (values) => {
            if (editingDuty) {
              await updateDuty(editingDuty.id, values);
            } else {
              await createDuty(values);
            }
            setIsModalVisible(false);
            // Refresh the current page after creating/updating
            fetchDuties(pagination.current, pagination.pageSize);
          }}
        />
      </Modal>

      <Modal
        title={`Logs for ${selectedDutyForLogs?.name}`}
        open={!!selectedDutyForLogs}
        onCancel={() => setSelectedDutyForLogs(undefined)}
        footer={null}
        width={600}
      >
        {loadingLogs ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>Loading logs...</div>
        ) : (
          <Timeline
            items={logs.map(log => ({
              color: log.action === 'CREATED' ? 'green' : log.action === 'UPDATED' ? 'blue' : 'red',
              children: (
                <div>
                  <Text strong>{log.action}</Text>
                  <br />
                  <Text type="secondary">{log.details}</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    {format(new Date(log.createdAt), 'PPp')}
                  </Text>
                </div>
              ),
            }))}
          />
        )}
      </Modal>

      <Modal
        title="Delete Duty"
        open={!!dutyToDelete}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
        okText="Delete"
        okType="danger"
        cancelText="Cancel"
      >
        {dutyToDelete && (
          <div>
            <p>Are you sure you want to delete this duty?</p>
            <div style={{ marginTop: '16px', padding: '12px', background: '#f5f5f5', borderRadius: '4px' }}>
              <p><strong>Name:</strong> {dutyToDelete.name}</p>
              <p><strong>Type:</strong> {dutyToDelete.type.name}</p>
              <p><strong>Status:</strong> {dutyToDelete.completed ? 'Completed' : 'Pending'}</p>
            </div>
            <p style={{ marginTop: '16px', color: 'red' }}>This action cannot be undone.</p>
          </div>
        )}
      </Modal>
    </div>
  );
}; 