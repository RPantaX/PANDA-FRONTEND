import { Table } from "antd";
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import { useUser } from "../hook/useUser";
import '../ListStyle.css';
export const UserList = () => {
    const {users,handlerRemoveUser, handlerUserSelectedForm}= useUser();
  const columns = [
  {
    title: 'ID',
    width: 100,
    dataIndex: 'id',
    key: 'id',
    fixed: 'left',
  },
  {
    title: 'Nombres',
    width: 200,
    dataIndex: 'nombres',
    key: 'nombres',
    fixed: 'left',
  },
  {
    title: 'apellidos',
    dataIndex: 'apellidos',
    key: 'apellidos',
    width: 200,
  },
  {
    title: 'N° de identidad',
    dataIndex: 'numIdentidad',
    key: 'numIdentidad',
    width: 150,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    width: 250,
  },
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
    width: 250,
  },
  {
    title: 'Teléfono',
    dataIndex: 'telefono',
    key: 'telefono',
    width: 150,
  },
  {
    title: 'Actions',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: (record)=>{
      return <>
      <EditOutlined onClick={()=>handlerUserSelectedForm(record)} style={{color:"blue", marginLeft: 12}}/>

      <DeleteOutlined onClick={()=>handlerRemoveUser(record.id)} style={{color:"red", marginLeft: 12}} />
      </>
    }
  },
];
    return (
      <Table 
      className="styled-table"
      columns={columns} 
      dataSource={users}  
      scroll={{
        x: 1500,
        y: 1500,
      }}
      rowKey="id"
      />
  )
}
