import {  useEffect, useState } from "react"
import { Button, Input, Table } from "antd";
import {FilePdfOutlined, SearchOutlined} from '@ant-design/icons'
import { NavLink } from "react-router-dom";
import { useGuiaTransportistas } from "../hook/useGuiaTransportista";
import '../ListStyle.css';

export const GuiaTransportistaList = () => {
  
  const {guiaTransportista,getguiaTransportistas}= useGuiaTransportistas();
  
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
  },
  {
    title: 'Serie',
    width: 200,
    dataIndex: 'serieGuia',
    key: 'serieGuia',
  },
  {
    title: 'N° Guia',
    dataIndex: 'numeroGuia',
    key: 'numeroGuia',
    width: 200,
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
      return record.numeroGuia.toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    title: 'Dirección Partida',
    dataIndex: 'partida',
    key: 'partida',
    width: 150,
  },
  {
    title: 'Dirección Llegada',
    dataIndex: 'llegada',
    key: 'llegada',
    width: 150,
  },
  {
    title: 'Fecha Traslado',
    dataIndex: 'fechaTraslado',
    key: 'fechaTraslado',
    width: 150,
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
  },
  {
    title: 'Ruc destinatario',
    dataIndex: 'destinatarioRuc',
    key: 'destinatarioRuc',
    width: 150,
  },
  {
    title: 'Peso de Carga',
    dataIndex: 'pesoCarga',
    key: 'pesoCarga',
    width: 150,
  },
  {
    title: 'N° Doc Chofer',
    dataIndex: 'numDocChofer',
    key: 'numDocChofer',
    width: 300,
  },
  {
    title: 'Nombre Chofer',
    dataIndex: 'nombreChofer',
    key: 'nombreChofer',
    width: 150,
  },
  {
    title: 'Placa Camión',
    dataIndex: 'placaVehiculo',
    key: 'placaVehiculo',
    width: 250,
  },
  {
    title: 'Ruc Pagador Flete',
    dataIndex: 'rucPagadorDelFlete',
    key: 'rucPagadorDelFlete',
    width: 150,
  },
  {
    title: 'Acciones',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: (record) => (
      <>
        <NavLink to={`/guia-transportista/${record.id}`}>
          <FilePdfOutlined />
        </NavLink>
      </>
    ),
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