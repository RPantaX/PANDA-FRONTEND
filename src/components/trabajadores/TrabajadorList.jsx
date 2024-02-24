import {  useEffect, useState } from "react"
import { Button, Input,Table } from "antd";
import {EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons'
import { NavLink } from "react-router-dom";
import { useTrabajadores } from "../hook/useTrabajadores";
import '../ListStyle.css';
export const TrabajadorList = () => {
  
  const {trabajadores,getTrabajadores,handlerRemoveTrabajador}= useTrabajadores();
  
  const { contenido, totalPaginas } = trabajadores || { contenido: [], totalPaginas: 1 };

  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getTrabajadores(0);
      setLoading(false);
    };
    fetchData();
  }, []);
  useEffect(() => {
    setDataSource(contenido);
  }, [contenido]);
  const handlePageChange = (page) => {
    getTrabajadores(page - 1); // La paginación de Ant Design comienza desde 1, pero en mi servicio comienza desde 0
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
    title: 'Nombres',
    width: 200,
    dataIndex: 'nombres',
    key: 'nombres',
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
      return record.nombres.toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    title: 'apellidos',
    dataIndex: 'apellidos',
    key: 'apellidos',
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
      return record.apellidos.toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    title: 'N° de identidad',
    dataIndex: 'numIdentidad',
    key: 'numIdentidad',
    width: 150,
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
      return record.numIdentidad.toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    title: 'Fecha Nacimiento',
    dataIndex: 'fechaNacimiento',
    key: 'fechaNacimiento',
    width: 150,
    align: 'center',
    render: (fecha) => new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }),
  },
  {
    title: 'Género',
    dataIndex: 'genero',
    key: 'genero',
    width: 150,
    render: (genero) => genero.nombreGenero,
    align: 'center'
  },
  {
    title: 'Estado Civil',
    dataIndex: 'estadoCivil',
    key: 'estadoCivil',
    render: (estadoCivil) => estadoCivil.nombreEstadoCivil,
    width: 150,
    align: 'center'
  },
  {
    title: 'Nacionalidad',
    dataIndex: 'nacionalidad',
    key: 'nacionalidad',
    width: 150,
    render: (nacionalidad) => nacionalidad.nombreNacionalidad,
    align: 'center'
  },
  {
    title: 'Direc. Residencia',
    dataIndex: 'direccionResidencia',
    key: 'direccionResidencia',
    width: 300,
    align: 'center'
  },
  {
    title: 'Teléfono',
    dataIndex: 'telefono',
    key: 'telefono',
    width: 150,
    align: 'center'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    width: 250,
    align: 'center'
  },
  {
    title: 'Cargo',
    dataIndex: 'cargo',
    key: 'cargo',
    width: 150,
    render: (cargo) => cargo.nombreCargo,
    align: 'center'
  },
  {
    title: 'Fecha Ingreso',
    dataIndex: 'fechaIngreso',
    key: 'fechaIngreso',
    width: 150,
    render: (fecha) => new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }),
    align: 'center'
  },
  {
    title: 'N° Cuenta Bancaria',
    dataIndex: 'numCuentaBancaria',
    key: 'numCuentaBancaria',
    width: 160,
    align: 'center'
  },
  {
    title: 'Estado',
    dataIndex: 'estado',
    key: 'estado',
    width: 150,
    render: (estado) => (
      estado ? <span style={{ color: 'green' }}>Activo</span> : <span style={{ color: 'red' }}>Inactivo</span>
    ),
    align: 'center'
  },
  {
    title: 'Id Usuario',
    dataIndex: 'idUser',
    key: 'idUser',
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
        <NavLink to={`/trabajadores/edit/${record.id}`}>
          <EditOutlined />
        </NavLink>
        <DeleteOutlined onClick={() => handlerRemoveTrabajador(record.id)} style={{ color: "red", marginLeft: 12 }} />
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