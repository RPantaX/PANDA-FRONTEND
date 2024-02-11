import { Button, Layout, theme } from 'antd';
import {Logo} from '../components/Logo';
import { MenuList } from '../components/MenuList';
import { useState } from 'react';
import {MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons'
import { Navigate, Route, Routes } from 'react-router-dom';
import { TrabajadoresPages } from '../pages/TrabajadoresPages';
import { RegisterPages } from '../pages/RegisterPages';

const {Header, Sider} = Layout;

export const AllMenu = () => {

    const [collapsed, setCollapsed] = useState(false);
  
    const{
    token: {colorBgContainer}, 
    } = theme.useToken();
    
    
  return (
    <Layout>
      <Sider 
        collapsed={collapsed}
        collapsible
        trigger={null} 
        className='sidebar'>
        <Logo />
        <MenuList />
      </Sider>
      <Layout>
        <Header style={{padding: 0, background: colorBgContainer}}>
        
          <Button 
          type='text'
          className='toggle'
          onClick={()=>setCollapsed(!collapsed)}
          icon={collapsed?
          <MenuUnfoldOutlined /> : 
          <MenuFoldOutlined /> } />
        </Header>
        <Routes>
            <Route path="/trabajadores" element={<TrabajadoresPages/>} />
            <Route path="/trabajadores/register" element={<RegisterPages/>} />
              <Route path="/trabajadores/edit/:id" element={<RegisterPages/>} />
              <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Layout> 
  )
}
