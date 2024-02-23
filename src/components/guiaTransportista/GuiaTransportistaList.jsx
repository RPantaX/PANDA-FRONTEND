import {  useEffect, useState } from "react"
import { Table } from "antd";
import {EditOutlined} from '@ant-design/icons'
import { NavLink } from "react-router-dom";
import { userAuth } from "../../auth/pages/hooks/userAuth";
import { useGuiaTransportistas } from "../hook/useGuiaTransportista";
import '../ListStyle.css';
export const GuiaTransportistaList = () => {
  
  const {guiaTransportista,getguiaTransportistas}= useGuiaTransportistas();
  
  const {contenido}=guiaTransportista|| { contenido: [] };
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const{login} = userAuth();
  useEffect(() => {
    setLoading(true)
    getguiaTransportistas(0);
    setLoading(false);
  }, []);

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
];
if (login.isAdmin) {
  columns.push({
    title: 'Actions',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: (record) => (
      <>
        <NavLink to={`/guia-transportista/${record.id}`}>
          <EditOutlined />
        </NavLink>
      </>
    ),
  });
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
            getguiaTransportistas(page);
        }
      }} 
      rowKey="id"
      />
  )
}