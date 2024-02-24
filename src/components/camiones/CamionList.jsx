import { useEffect, useState } from "react";
import { Button, Input, Table } from "antd";
import {EditOutlined, DeleteOutlined, SearchOutlined} from '@ant-design/icons'
import { useCamiones } from "../hook/useCamiones";
import '../ListStyle.css';
export const CamionList = () => {
    const {camiones,getCamiones,handlerRemoveCamion, handlerCamionSelectedForm}= useCamiones();
  
  const {contenido, totalPaginas}=camiones|| { contenido: [] , totalPaginas: 1};
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getCamiones(0);
      setLoading(false);
    };
    fetchData();
  }, []);
  useEffect(() => {
    setDataSource(contenido);
  }, [contenido]);
  const handlePageChange = (page) => {
    getCamiones(page - 1); // La paginación de Ant Design comienza desde 1, pero en mi servicio comienza desde 0
  };
  const columns = [
  {
    title: 'ID',
    width: 50,
    dataIndex: 'id',
    key: 'id',
    fixed: 'left',
    align: 'center'
  },
  {
    title: 'Marca',
    width: 100,
    dataIndex: 'marca',
    key: 'marca',
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
    title: 'Modelo',
    width: 100,
    dataIndex: 'modelo',
    key: 'modelo',
    align: 'center'
  },
  {
    title: 'Año Fabricación',
    width: 100,
    dataIndex: 'anoFabricacion',
    key: 'anoFabricacion',
    align: 'center'
  },
  {
    title: 'Placa',
    width: 100,
    dataIndex: 'placa',
    key: 'placa',
    align: 'center'
  },
  {
    title: 'Informacion de carreta',
    children:[
      {
        title: 'ID',
        dataIndex: 'carreta',
        key: 'carretaID',
        width: 150,
        align: 'center',
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
        align: 'center',
        render: (carreta) => (
            <span style={{ color: carreta && carreta.placa !== null ? 'black' : 'red' }}>
                {carreta && carreta.placa !== null ? carreta.placa : 'No existe'}
            </span>
        ),
    },
    ]
  },
  {
    title: 'Acciones',
    key: 'operation',
    fixed: 'right',
    align: 'center',
    width: 70,
    render: (record)=>{
      return <>
      <EditOutlined onClick={()=>handlerCamionSelectedForm(record)} style={{color:"blue", marginLeft: 12}}/>

      <DeleteOutlined onClick={()=>handlerRemoveCamion(record.id)} style={{color:"red", marginLeft: 12}} />
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
