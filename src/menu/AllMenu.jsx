import { Button, Layout, theme } from 'antd';
import {Logo} from '../components/Logo';
import { MenuList } from '../components/MenuList';
import { useContext, useState } from 'react';
import {MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons'
import { Navigate, Route, Routes } from 'react-router-dom';
import { TrabajadoresPages } from '../pages/TrabajadoresPages';
import { RegisterPages } from '../pages/RegisterPages';
import { ConductoresPages } from '../pages/ConductoresPage';
import { CamionesPage } from '../pages/CamionesPage';
import { CarretasPage } from '../pages/CarretasPage';
import { AuthContext } from '../auth/context/AuthContext';
import { UsersPage } from '../pages/UsersPage';

const {Header, Sider} = Layout;

export const AllMenu = () => {

    const [collapsed, setCollapsed] = useState(false);
  
    const{
    token: {colorBgContainer}, 
    } = theme.useToken();
    const{login} = useContext(AuthContext);
    
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
            <Route path="/conductores" element={<ConductoresPages/>} />
            <Route path="/camiones" element={<CamionesPage/>} />
            <Route path="/carretas" element={<CarretasPage/>} />
            {!login.isAdmin ||
            <>
              <Route path="/usuarios" element={<UsersPage/>} />
              <Route path="/trabajadores/register" element={ <RegisterPages/>} />
              <Route path="/trabajadores/edit/:id" element={<RegisterPages/>} /> 
            </>
            }
            
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>

      </Layout>
    </Layout> 
  )
}
