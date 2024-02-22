import { useEffect, useState } from "react";
import { Table } from "antd";
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import { userAuth } from "../auth/pages/hooks/userAuth";
import { useCamiones } from "./hook/useCamiones";

export const CamionList = () => {
    const {camiones,getCamiones,handlerRemoveCamion, handlerCamionSelectedForm}= useCamiones();
  
  const {contenido}=camiones|| { contenido: [] };
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const{login} = userAuth();
  useEffect(() => {
    setLoading(true)
    getCamiones(0);
    setLoading(false);
  }, []);

  const columns = [
  {
    title: 'ID',
    width: 50,
    dataIndex: 'id',
    key: 'id',
    fixed: 'left',
  },
  {
    title: 'Marca',
    width: 100,
    dataIndex: 'marca',
    key: 'marca',
  },
  {
    title: 'Modelo',
    width: 100,
    dataIndex: 'modelo',
    key: 'modelo',
  },
  {
    title: 'Año Fabricación',
    width: 100,
    dataIndex: 'anoFabricacion',
    key: 'anoFabricacion',
  },
  {
    title: 'Placa',
    width: 100,
    dataIndex: 'placa',
    key: 'placa',
  },
  {
    title: 'Informacion de carreta',
    children:[
      {
        title: 'ID',
        dataIndex: 'carreta',
        key: 'carretaID',
        width: 150,
        render: (carreta) => (
            <span style={{ color: carreta && carreta.id !== null ? 'black' : 'red' }}>
                {carreta && carreta.id !== null ? carreta.id : 'No existe'}
            </span>
        ),
    },
    {
        title: 'Placa',
        dataIndex: 'carreta',
        key: 'carretaPlaca',
        width: 150,
        render: (carreta) => (
            <span style={{ color: carreta && carreta.placa !== null ? 'black' : 'red' }}>
                {carreta && carreta.placa !== null ? carreta.placa : 'No existe'}
            </span>
        ),
    },
    ]
  },
];
if (login.isAdmin) {
  columns.push({
    title: 'Actions',
    key: 'operation',
    fixed: 'right',
    width: 70,
    render: (record)=>{
      return <>
      <EditOutlined onClick={()=>handlerCamionSelectedForm(record)} style={{color:"blue", marginLeft: 12}}/>

      <DeleteOutlined onClick={()=>handlerRemoveCamion(record.id)} style={{color:"red", marginLeft: 12}} />
      </>
    }
  })
}
    return (
      <Table 
      loading={loading} 
      columns={columns} 
      dataSource={contenido}  
      scroll={{
        x: 1500,
        y: 1500,
      }}
      pagination={{
        pageSize:10,
        total:totalPages,
        onChange: (page)=>{
            getCamiones(page);
        }
      }} 
      rowKey="id"
      />
  )
}
