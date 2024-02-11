import { Menu } from "antd"
import {HomeOutlined, 
    TeamOutlined, 
    AppstoreOutlined, 
    FolderOpenOutlined,
    FileDoneOutlined,
    FilePdfOutlined,
    FilePptOutlined } from '@ant-design/icons'
import { Link } from "react-router-dom"
export const MenuList = () => {
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
                <Menu.Item className="sub-menu" key={"choferes"}>Choferes
                </Menu.Item>
                <Menu.Item className="sub-menu" key={"camiones"}>camiones
                </Menu.Item>
                <Menu.Item className="sub-menu" key={"carretas"} >carretas
                </Menu.Item>
            </Menu.SubMenu>
            
            <Menu.SubMenu key="documentos" icon={<FolderOpenOutlined />}
            title="Citas y documentos">
                <Menu.Item key={"citas"} icon={<FileDoneOutlined />}>
                Citas
                </Menu.Item>
                <Menu.Item key={"facturas"} icon={<FilePdfOutlined />}>
                Facturas
                </Menu.Item>
                <Menu.Item key={"guiasRemitente"} icon={<FilePptOutlined />}>
                Guias de transportista
                </Menu.Item>
            </Menu.SubMenu>
        </Menu>
    
  )
}
