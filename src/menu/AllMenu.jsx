import { Button, Layout, theme } from 'antd';
import {Logo} from '../components/Logo';
import { MenuList } from '../components/MenuList';
import { useState } from 'react';
import {MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons'
import { Navigate, Route, Routes } from 'react-router-dom';
import { TrabajadoresPages } from '../pages/TrabajadoresPages';
import { RegisterPages } from '../components/trabajadores/RegisterPages';
import { ConductoresPages } from '../pages/ConductoresPage';
import { CamionesPage } from '../pages/CamionesPage';
import { CarretasPage } from '../pages/CarretasPage';
import { UsersPage } from '../pages/UsersPage';
import { userAuth } from '../auth/pages/hooks/userAuth';
import { GuiaTransportistaPage } from '../pages/GuiaTransportistaPage';
import { RegisterPagesGuia } from '../components/guiaTransportista/RegisterPagesGuia';
import { GuiaPdf } from '../components/guiaTransportista/GuiaPdf';
import { FacturasPage } from '../pages/FacturasPage';
import { RegisterPagesFactura } from '../components/facturas/RegisterPagesFactura';

const {Header, Sider} = Layout;

export const AllMenu = () => {

    const [collapsed, setCollapsed] = useState(false);
  
    const{
    token: {colorBgContainer}, 
    } = theme.useToken();
    
    const{login} = userAuth();
    
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
            <Route path="/guia-transportistas" element={< GuiaTransportistaPage/>} />
            <Route path="/facturas" element={< FacturasPage/>} />
            <Route path="/factura/register" element={ <RegisterPagesFactura/>} />
            <Route path="/conductores" element={<ConductoresPages/>} />
            <Route path="/camiones" element={<CamionesPage/>} />
            <Route path="/carretas" element={<CarretasPage/>} />
            <Route path="/guia-transportista/:id" element={<GuiaPdf/>} /> 
            <Route path="/guia-transportista/register" element={ <RegisterPagesGuia/>} />
            <Route path="/trabajadores/register" element={ <RegisterPages/>} />
            
            {!login.isAdmin ||
            <>
              <Route path="/usuarios" element={<UsersPage/>} />
              <Route path="/trabajadores/edit/:id" element={<RegisterPages/>} /> 
            </>
            }
            
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>

      </Layout>
    </Layout> 
  )
}
