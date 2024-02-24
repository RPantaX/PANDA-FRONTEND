import { useEffect, useState } from "react";
import { Button, Input, Table } from "antd";
import {EditOutlined, DeleteOutlined, SearchOutlined} from '@ant-design/icons'
import { useConductores } from "../hook/useConductores";
import '../ListStyle.css';
export const ConductorList = () => {
    const {conductores,getConductores,handlerRemoveConductor, handlerConductorSelectedForm}= useConductores();
  
  const {contenido, totalPaginas}=conductores|| { contenido: [], totalPaginas: 1 };
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getConductores(0);
      setLoading(false);
    };
    fetchData();
  }, []);
  useEffect(() => {
    setDataSource(contenido);
  }, [contenido]);
  const handlePageChange = (page) => {
    getConductores(page - 1); // La paginación de Ant Design comienza desde 1, pero en mi servicio comienza desde 0
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
    title: 'Informacion de trabajador',
    align: 'center',
    children:[
        {
            title: 'ID',
            dataIndex: 'trabajador',
            key: 'trabajadorID',
            width: 150,
            render: (trabajador) => trabajador.id,
            align: 'center'
        },
        {
            title: 'N° Identidad',
            dataIndex: 'trabajador',
            key: 'trabajadorNumIdentidad',
            width: 150,
            render: (trabajador) => trabajador.numIdentidad,
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
              return record.trabajador.numIdentidad.toLowerCase().includes(value.toLowerCase());
            },

        },
        {
            title: 'Nombres',
            dataIndex: 'trabajador',
            key: 'trabajadorNombres',
            width: 150,
            render: (trabajador) => trabajador.nombres,
            align: 'center'
        },
        {
            title: 'Apellidos',
            dataIndex: 'trabajador',
            key: 'trabajadorApellidos',
            width: 150,
            render: (trabajador) => trabajador.apellidos,
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
              return record.trabajador.apellidos.toLowerCase().includes(value.toLowerCase());
            },
        },
    ]
  },
  
  {
    title: 'Datos de Camion',
    align: 'center',
    children:[
        {
            title: 'ID',
            dataIndex: 'camion',
            key: 'CamionID',
            width: 150,
            render: (camion) => camion.id,
            align: 'center'
        },
        {
            title: 'Placa',
            dataIndex: 'camion',
            key: 'camionPlaca',
            width: 150,
            render: (camion) => camion.placa,
            align: 'center'
        },
        {
            title: 'Marca',
            dataIndex: 'camion',
            key: 'camionMarca',
            width: 150,
            render: (camion) => camion.marca,
            align: 'center'
        },
    ]
  },
  {
    title: 'Tipo Licencia',
    dataIndex: 'tipoLicencia',
    key: 'tipoLicencia',
    render: (tipoLicencia) => tipoLicencia.tipoLicencia,
    width: 150,
    align: 'center'
  },
  {
    title:'Certificados',
    align: 'center',
    children:[
      {
        title: 'C. Conducir Camión',
        dataIndex: 'certConducirCamion',
        key: 'certConducirCamion',
        width: 200,
        align: 'center',
        render: (certConducirCamion) => (
          certConducirCamion ? <span style={{ color: 'green' }}>Activo</span> : <span style={{ color: 'red' }}>Inactivo</span>
        ),
      },
      {
        title: 'C. Psicofisico ',
        dataIndex: 'certPsicofisico',
        key: 'certPsicofisico',
        width: 150,
        align: 'center',
        render: (certPsicofisico) => (
          certPsicofisico ? <span style={{ color: 'green' }}>Activo</span> : <span style={{ color: 'red' }}>Inactivo</span>
        ),
      },
      {
        title: 'C. Mecánica',
        dataIndex: 'certMecanicaBasica',
        key: 'certMecanicaBasica',
        width: 150,
        align: 'center',
        render: (certMecanicaBasica) => (
          certMecanicaBasica ? <span style={{ color: 'green' }}>Activo</span> : <span style={{ color: 'red' }}>Inactivo</span>
        ),
      },
      {
        title: 'C. Primeros Auxilios',
        dataIndex: 'certPrimerosAuxilios',
        key: 'certPrimerosAuxilios',
        width: 150,
        align: 'center',
        render: (certPrimerosAuxilios) => (
          certPrimerosAuxilios ? <span style={{ color: 'green' }}>Activo</span> : <span style={{ color: 'red' }}>Inactivo</span>
        ),
      },
      {
        title: 'C. Seguridad Vial',
        dataIndex: 'certSeguridadVial',
        key: 'certSeguridadVial',
        width: 150,
        align: 'center',
        render: (certSeguridadVial) => (
          certSeguridadVial ? <span style={{ color: 'green' }}>Activo</span> : <span style={{ color: 'red' }}>Inactivo</span>
        ),
      },
    ]
  },
  {
    title: 'Acciones',
    key: 'operation',
    fixed: 'right',
    width: 100,
    align: 'center',
    render: (record)=>{
      return <>
      <EditOutlined onClick={()=>handlerConductorSelectedForm(record)} style={{color:"blue", marginLeft: 12}}/>

      <DeleteOutlined onClick={()=>handlerRemoveConductor(record.id)} style={{color:"red", marginLeft: 12}} />
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
