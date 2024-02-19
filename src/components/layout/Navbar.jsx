import { Menu, Dropdown } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import './Nav.css';
import { useContext } from "react";
import { AuthContext } from "../../auth/context/AuthContext";

const Navbar = () => {
  const {login, handlerLogout}= useContext(AuthContext);
    const menu = (
        <Menu>
          <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handlerLogout}>
            Logout
          </Menu.Item>
        </Menu>
      );
  return (
    <>
      <div className="user-info">
        <span>
        <UserOutlined />
        {login.user?.username}
        </span>
        <Dropdown  className="logout-icon" overlay={menu} placement="bottomRight" arrow>
          <span><LogoutOutlined /></span>
        </Dropdown>
    </div>
    </>
    
  );
};

export default Navbar;