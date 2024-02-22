import { useEffect, useState } from "react";
import { Table } from "antd";
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import { userAuth } from "../auth/pages/hooks/userAuth";
import { useConductores } from "./hook/useConductores";
export const ConductorList = () => {
    const {conductores,getConductores,handlerRemoveConductor, handlerConductorSelectedForm}= useConductores();
  
  const {contenido}=conductores|| { contenido: [] };
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const{login} = userAuth();

  useEffect(() => {
    setLoading(true)
    getConductores(0);
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
    title: 'Informacion de trabajador',
    children:[
        {
            title: 'ID',
            dataIndex: 'trabajador',
            key: 'trabajadorID',
            width: 150,
            render: (trabajador) => trabajador.id,
        },
        {
            title: 'N° Identidad',
            dataIndex: 'trabajador',
            key: 'trabajadorNumIdentidad',
            width: 150,
            render: (trabajador) => trabajador.numIdentidad,
        },
        {
            title: 'Nombres',
            dataIndex: 'trabajador',
            key: 'trabajadorNombres',
            width: 150,
            render: (trabajador) => trabajador.nombres,
        },
        {
            title: 'Apellidos',
            dataIndex: 'trabajador',
            key: 'trabajadorApellidos',
            width: 150,
            render: (trabajador) => trabajador.apellidos,
        },
    ]
  },
  
  {
    title: 'Datos de Camion',
    children:[
        {
            title: 'ID',
            dataIndex: 'camion',
            key: 'CamionID',
            width: 150,
            render: (camion) => camion.id,
        },
        {
            title: 'Placa',
            dataIndex: 'camion',
            key: 'camionPlaca',
            width: 150,
            render: (camion) => camion.placa,
        },
        {
            title: 'Marca',
            dataIndex: 'camion',
            key: 'camionMarca',
            width: 150,
            render: (camion) => camion.marca,
        },
    ]
  },
  {
    title: 'Tipo Licencia',
    dataIndex: 'tipoLicencia',
    key: 'tipoLicencia',
    render: (tipoLicencia) => tipoLicencia.tipoLicencia,
    width: 150,
  },
  {
    title:'Certificados',
    children:[
      {
        title: 'C. Conducir Camión',
        dataIndex: 'certConducirCamion',
        key: 'certConducirCamion',
        width: 200,
        render: (certConducirCamion) => (
          certConducirCamion ? <span style={{ color: 'green' }}>Activo</span> : <span style={{ color: 'red' }}>Inactivo</span>
        ),
      },
      {
        title: 'C. Psicofisico ',
        dataIndex: 'certPsicofisico',
        key: 'certPsicofisico',
        width: 150,
        render: (certPsicofisico) => (
          certPsicofisico ? <span style={{ color: 'green' }}>Activo</span> : <span style={{ color: 'red' }}>Inactivo</span>
        ),
      },
      {
        title: 'C. Mecánica',
        dataIndex: 'certMecanicaBasica',
        key: 'certMecanicaBasica',
        width: 150,
        render: (certMecanicaBasica) => (
          certMecanicaBasica ? <span style={{ color: 'green' }}>Activo</span> : <span style={{ color: 'red' }}>Inactivo</span>
        ),
      },
      {
        title: 'C. Primeros Auxilios',
        dataIndex: 'certPrimerosAuxilios',
        key: 'certPrimerosAuxilios',
        width: 150,
        render: (certPrimerosAuxilios) => (
          certPrimerosAuxilios ? <span style={{ color: 'green' }}>Activo</span> : <span style={{ color: 'red' }}>Inactivo</span>
        ),
      },
      {
        title: 'C. Seguridad Vial',
        dataIndex: 'certSeguridadVial',
        key: 'certSeguridadVial',
        width: 150,
        render: (certSeguridadVial) => (
          certSeguridadVial ? <span style={{ color: 'green' }}>Activo</span> : <span style={{ color: 'red' }}>Inactivo</span>
        ),
      },
    ]
  },
];
if (login.isAdmin) {
  columns.push(  {
    title: 'Actions',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: (record)=>{
      return <>
      <EditOutlined onClick={()=>handlerConductorSelectedForm(record)} style={{color:"blue", marginLeft: 12}}/>

      <DeleteOutlined onClick={()=>handlerRemoveConductor(record.id)} style={{color:"red", marginLeft: 12}} />
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
          getConductores(page);
        }
      }} 
      rowKey="id"
      />
  )
}
