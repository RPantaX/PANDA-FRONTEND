import {  useEffect, useState } from "react"
import { Button, Input, Table } from "antd";
import {FilePdfOutlined, SearchOutlined} from '@ant-design/icons'
import { NavLink } from "react-router-dom";
import { useGuiaTransportistas } from "../hook/useGuiaTransportista";
import '../ListStyle.css';

export const GuiaTransportistaList = () => {
  
  const {guiaTransportista,getguiaTransportistas, isLoading}= useGuiaTransportistas();
  
  const {contenido, totalPaginas}=guiaTransportista|| { contenido: []  , totalPaginas: 1};
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getguiaTransportistas(0);
      setLoading(false);
    };
    fetchData();
  }, []);
  useEffect(() => {
    setDataSource(contenido);
  }, [contenido]);
  const handlePageChange = (page) => {
    getguiaTransportistas(page - 1); // La paginación de Ant Design comienza desde 1, pero en mi servicio comienza desde 0
  };

  const columns = [
  {
    title: 'ID',
    width: 100,
    dataIndex: 'id',
    key: 'id',
    fixed: 'left',
    align: 'center'
  },
  {
    title: 'Serie',
    width: 200,
    dataIndex: 'serieGuia',
    key: 'serieGuia',
    align: 'center'
  },
  {
    title: 'N° Guia',
    dataIndex: 'numeroGuia',
    key: 'numeroGuia',
    width: 200,
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
      return record.numeroGuia==value;
    },
  },
  {
    title: 'Dirección Partida',
    dataIndex: 'partida',
    key: 'partida',
    width: 150,
    align: 'center'
  },
  {
    title: 'Dirección Llegada',
    dataIndex: 'llegada',
    key: 'llegada',
    width: 150,
    align: 'center'
  },
  {
    title: 'Fecha Traslado',
    dataIndex: 'fechaTraslado',
    key: 'fechaTraslado',
    width: 150,
    align: 'center',
    render: (fecha) => new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }),
  },
  {
    title: 'Ruc Remitente',
    dataIndex: 'remitenteRuc',
    key: 'remitenteRuc',
    width: 150,
    align: 'center'
  },
  {
    title: 'Ruc destinatario',
    dataIndex: 'destinatarioRuc',
    key: 'destinatarioRuc',
    width: 150,
    align: 'center'
  },
  {
    title: 'Peso de Carga',
    dataIndex: 'pesoCarga',
    key: 'pesoCarga',
    width: 150,
    align: 'center'
  },
  {
    title: 'N° Doc Chofer',
    dataIndex: 'numDocChofer',
    key: 'numDocChofer',
    width: 300,
    align: 'center'
  },
  {
    title: 'Nombre Chofer',
    dataIndex: 'nombreChofer',
    key: 'nombreChofer',
    width: 150,
    align: 'center'
  },
  {
    title: 'Placa Camión',
    dataIndex: 'placaVehiculo',
    key: 'placaVehiculo',
    width: 250,
    align: 'center'
  },
  {
    title: 'Ruc Pagador Flete',
    dataIndex: 'rucPagadorDelFlete',
    key: 'rucPagadorDelFlete',
    width: 150,
    align: 'center'
  },
  {
    title: 'Acciones',
    key: 'operation',
    fixed: 'right',
    width: 100,
    align: 'center',
    render: (record) => (
      <>
        <NavLink to={`/guia-transportista/${record.id}`}>
          <FilePdfOutlined />
        </NavLink>
      </>
    ),
  }
];
if(isLoading){
  return (
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Cargando...</span>
    </div>
  )
}
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