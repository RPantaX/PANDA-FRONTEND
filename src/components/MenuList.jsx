import { Menu } from "antd"
import {HomeOutlined, 
    TeamOutlined, 
    AppstoreOutlined, 
    FolderOpenOutlined,
    FilePdfOutlined,
    FilePptOutlined } from '@ant-design/icons'
import { Link } from "react-router-dom"
import { userAuth } from "../auth/pages/hooks/userAuth";

export const MenuList = () => {
    const{login} = userAuth();
  return (
    
        <Menu theme="dark" mode="inline" className="menu-bar">

            <Menu.Item key={"home"} icon={<HomeOutlined />}>
                <Link to="/">Inicio</Link>
            </Menu.Item>

            <Menu.Item key={"trabajadores"} icon={<TeamOutlined />}>
                <Link to="/trabajadores">Datos Trabajadores</Link>
                
            </Menu.Item>

            <Menu.SubMenu key="plantel" icon={<AppstoreOutlined />}
            title="Plantel">
                <Menu.Item className="sub-menu" key={"conductores"}><Link to="/conductores">Conductores</Link>
                </Menu.Item>
                <Menu.Item className="sub-menu" key={"camiones"}><Link to="/camiones">Camiones</Link>
                </Menu.Item>
                <Menu.Item className="sub-menu" key={"carretas"} ><Link to="/carretas">Carretas</Link>
                </Menu.Item>
            </Menu.SubMenu>
            
            <Menu.SubMenu key="documentos" icon={<FolderOpenOutlined />}
            title="Citas y documentos">
                <Menu.Item key={"facturas"} icon={<FilePdfOutlined />}>
                Facturas
                </Menu.Item>
                <Menu.Item key={"guiasRemitente"} icon={<FilePptOutlined />}>
                <Link to="/guia-transportistas">Guias de transportista</Link>
                </Menu.Item>
            
            </Menu.SubMenu>
            {!login.isAdmin ||
            <Menu.Item key={"usuarios"} icon={<TeamOutlined />}>
                <Link to="/usuarios">Gestion Usuarios</Link>
                
            </Menu.Item>
            }   
        </Menu>
    
  )
}
