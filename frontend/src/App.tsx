import React from 'react';
import { Layout, Typography, Space } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';
import { DutiesList } from './components/duties/DutiesList';
import { ConfigProvider } from 'antd';

const { Header, Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  return (
    <ConfigProvider>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ background: '#fff', padding: '0 24px' }}>
          <Space align="center" style={{ height: '100%' }}>
            <UnorderedListOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            <Title level={3} style={{ margin: '16px 0' }}>
              Nexplore TODO
            </Title>
          </Space>
        </Header>
        <Content style={{ padding: '24px' }}>
          <DutiesList />
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
