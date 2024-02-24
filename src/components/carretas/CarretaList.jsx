import { useEffect, useState } from "react";
import { Button, Input, Table } from "antd";
import {EditOutlined, DeleteOutlined, SearchOutlined} from '@ant-design/icons'
import { useCarretas } from "../hook/useCarretas";
import '../ListStyle.css';
export const CarretaList = () => {
    const {carretas,getCarretas,handlerRemoveCarreta, handlerCarretaSelectedForm}= useCarretas();
  
  const {contenido, totalPaginas}=carretas|| { contenido: [] , totalPaginas: 1};
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getCarretas(0);
      setLoading(false);
    };
    fetchData();
  }, []);
  useEffect(() => {
    setDataSource(contenido);
  }, [contenido]);
  const handlePageChange = (page) => {
    getCarretas(page - 1); // La paginación de Ant Design comienza desde 1, pero en mi servicio comienza desde 0
  };
  const columns = [
  {
    title: 'ID',
    width: 30,
    dataIndex: 'id',
    key: 'id',
    align: 'center'
  },
  {
    title: 'Marca',
    dataIndex: 'marca',
    key: 'marca',
    width: 50,
    align: 'center',
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => {
      return (
        <>
          <Input
            autoFocus
            placeholder="Escribe aquí"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              confirm({ closeDropdown: false });
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
          ></Input>
          <Button
            onClick={() => {
              confirm();
            }}
            type="primary"
          >
            Buscar
          </Button>
          <Button
            onClick={() => {
              clearFilters();
            }}
            type="danger"
          >
            Resetear
          </Button>
        </>
      );
    },
    filterIcon: () => {
      return <SearchOutlined style={{ color: "white", fontSize: "20px" }}/>;
    },
    onFilter: (value, record) => {
      return record.marca.toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    title: 'Capacidad de Carga',
    dataIndex: 'capacidadCarga',
    key: 'capacidadCarga',
    width: 50,
    align: 'center'
  },
  {
    title: 'Placa',
    dataIndex: 'placa',
    key: 'placa',
    width: 70,
    align: 'center'
  },
  {
    title: 'Acciones',
    key: 'operation',
    width: 30,
    fixed: 'right',
    align: 'center',
    render: (record)=>{
      return <>
      <EditOutlined onClick={()=>handlerCarretaSelectedForm(record)} style={{color:"blue", marginLeft: 12}}/>

      <DeleteOutlined onClick={()=>handlerRemoveCarreta(record.id)} style={{color:"red", marginLeft: 12}} />
      </>
    }
  }
];

    return (
      <Table 
      className="styled-table custom-table-header"
      loading={loading} 
      columns={columns} 
      dataSource={dataSource}  
      scroll={{
        x: 1500,
        y: 1500,
      }}
      pagination={{
        pageSize: 10,
        total: totalPaginas * 10, // Multiplicar por el tamaño de página para obtener el total de elementos
        onChange: handlePageChange,
      }} 
      rowKey="id"
      />
  )
}
