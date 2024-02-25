import {  useEffect, useState } from "react"
import { Button, Input, Table } from "antd";
import {FilePdfOutlined, SearchOutlined} from '@ant-design/icons'
import { NavLink } from "react-router-dom";
import { useFacturas } from "../hook/useFacturas";
import '../ListStyle.css';


export const FacturaList = () => {
  
  const {facturas,getFacturas}= useFacturas();
  
  const {contenido, totalPaginas}=facturas|| { contenido: []  , totalPaginas: 1};
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getFacturas(0);
      setLoading(false);
    };
    fetchData();
  }, []);
  useEffect(() => {
    setDataSource(contenido);
  }, [contenido]);
  const handlePageChange = (page) => {
    getFacturas(page - 1); // La paginación de Ant Design comienza desde 1, pero en mi servicio comienza desde 0
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
    dataIndex: 'serieFactura',
    key: 'serieFactura',
    align: 'center'
  },
  {
    title: 'N° Factura',
    dataIndex: 'numeroFactura',
    key: 'numeroFactura',
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
      return record.numeroFactura==value;
    },
  },
  {
    title: 'Fecha De emisión',
    dataIndex: 'fechaEmision',
    key: 'fechaEmision',
    width: 150,
    align: 'center',
    render: (fecha) => new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }),
  },
  {
    title: 'Monto total',
    dataIndex: 'montoTotal',
    key: 'montoTotal',
    width: 150,
    align: 'center'
  },
  {
    title: 'Información Cliente',
    align: 'center',
    children:[
        {
            title: 'Ruc',
            dataIndex: 'clienteRuc',
            key: 'clienteRuc',
            width: 150,
            align: 'center'
        },
        {
            title: 'Razón social',
            dataIndex: 'clienteRazonSocial',
            key: 'clienteRazonSocial',
            width: 150,
            align: 'center'
        },
        {
            title: 'Dirección',
            dataIndex: 'clienteDireccion',
            key: 'clienteDireccion',
            width: 300,
            align: 'center'
        },
    ]
  },
  {
    title: 'Guia de Transportista',
    align: 'center',
    children:[
        {
            title: 'Serie',
            dataIndex: 'serieGuia',
            key: 'serieGuia',
            width: 150,
            align: 'center'
        },
        {
            title: 'Número',
            dataIndex: 'numeroGuia',
            key: 'numeroGuia',
            width: 150,
            align: 'center'
        },
    ]
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