import { useEffect, useState } from "react";
import { Table } from "antd";
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import { userAuth } from "../../auth/pages/hooks/userAuth";
import { useCarretas } from "../hook/useCarretas";
import '../ListStyle.css';
export const CarretaList = () => {
    const {carretas,getCarretas,handlerRemoveCarreta, handlerCarretaSelectedForm}= useCarretas();
  
  const {contenido}=carretas|| { contenido: [] };
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const{login} = userAuth();

  useEffect(() => {
    setLoading(true)
    getCarretas(0);
    setLoading(false);
  }, []);

  const columns = [
  {
    title: 'ID',
    width: 30,
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Marca',
    dataIndex: 'marca',
    key: 'marca',
    width: 50,
  },
  {
    title: 'Capacidad de Carga',
    dataIndex: 'capacidadCarga',
    key: 'capacidadCarga',
    width: 50,
  },
  {
    title: 'Placa',
    dataIndex: 'placa',
    key: 'placa',
    width: 70,
  },
];
if (login.isAdmin) {
  columns.push(  {
    title: 'Actions',
    key: 'operation',
    width: 30,
    fixed: 'right',
    render: (record)=>{
      return <>
      <EditOutlined onClick={()=>handlerCarretaSelectedForm(record)} style={{color:"blue", marginLeft: 12}}/>

      <DeleteOutlined onClick={()=>handlerRemoveCarreta(record.id)} style={{color:"red", marginLeft: 12}} />
      </>
    }
  })
}
    return (
      <Table 
      className="styled-table"
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
            getCarretas(page);
        }
      }} 
      rowKey="id"
      />
  )
}
