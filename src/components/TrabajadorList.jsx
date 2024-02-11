import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext";
import { Table } from "antd";
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import { NavLink } from "react-router-dom";

export const TrabajadorList = () => {
  
  const {trabajadores,getTrabajadores,handlerRemoveTrabajador}= useContext(UserContext);
  
  const {contenido}=trabajadores|| { contenido: [] };
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    getTrabajadores(0);
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
    title: 'Nombres',
    width: 200,
    dataIndex: 'nombres',
    key: 'nombres',
    fixed: 'left',
  },
  {
    title: 'apellidos',
    dataIndex: 'apellidos',
    key: 'apellidos',
    width: 200,
  },
  {
    title: 'N° de identidad',
    dataIndex: 'numIdentidad',
    key: 'numIdentidad',
    width: 150,
  },
  {
    title: 'Fecha Nacimiento',
    dataIndex: 'fechaNacimiento',
    key: 'fechaNacimiento',
    width: 150,
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
  },
  {
    title: 'Estado Civil',
    dataIndex: 'estadoCivil',
    key: 'estadoCivil',
    render: (estadoCivil) => estadoCivil.nombreEstadoCivil,
    width: 150,
  },
  {
    title: 'Nacionalidad',
    dataIndex: 'nacionalidad',
    key: 'nacionalidad',
    width: 150,
    render: (nacionalidad) => nacionalidad.nombreNacionalidad,
  },
  {
    title: 'Direc. Residencia',
    dataIndex: 'direccionResidencia',
    key: 'direccionResidencia',
    width: 300,
  },
  {
    title: 'Teléfono',
    dataIndex: 'telefono',
    key: 'telefono',
    width: 150,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    width: 250,
  },
  {
    title: 'Cargo',
    dataIndex: 'cargo',
    key: 'cargo',
    width: 150,
    render: (cargo) => cargo.nombreCargo,
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
  },
  {
    title: 'N° Cuenta Bancaria',
    dataIndex: 'numCuentaBancaria',
    key: 'numCuentaBancaria',
    width: 160,
  },
  {
    title: 'Estado',
    dataIndex: 'estado',
    key: 'estado',
    width: 150,
  },
  {
    title: 'Id Usuario',
    dataIndex: 'idUser',
    key: 'idUser',
    width: 150,
  },
  {
    title: 'Actions',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: (record)=>{
      return <>
      <NavLink to={`/trabajadores/edit/${record.id}`}>
      <EditOutlined />
      </NavLink>
      <DeleteOutlined onClick={()=>handlerRemoveTrabajador(record.id)} style={{color:"red", marginLeft: 12}} />
      </>
    }
  },
];
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
          getTrabajadores(page);
        }
      }} 
      rowKey="id"
      />
  )
}