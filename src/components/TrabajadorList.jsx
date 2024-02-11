import { useContext } from "react"
import { TrabajadorRow } from "./TrabajadorRow"
import { UserContext } from "../context/UserContext";
import { Table } from "antd";
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
    width: 100,
    dataIndex: 'nombres',
    key: 'nombres',
    fixed: 'left',
  },
  {
    title: 'apellidos',
    dataIndex: 'apellidos',
    key: 'apellidos',
    width: 150,
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
    width: 150,
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
    width: 150,
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
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a>action</a>,
  },
];
/*<Table columns={columns} dataSource={contenido}  scroll={{
        x: 1500,
        y: 300,
      }} >*/
export const TrabajadorList = () => {

  const {trabajadores}= useContext(UserContext);
  
  const {contenido}=trabajadores|| { contenido: [] };
  console.log(contenido);
    return (
      <table className="table table-hover">
        <thead >
          <tr>
            <th>ID</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>DNI/CEDULA</th>
            <th>Nacionalidad</th>
            <th>Telefono</th>
            <th>Email</th>
            <th>Cargo</th>
            <th>Estado</th>
            <th>update</th>
            <th>update route</th>
            <th>remove</th>
          </tr>
        </thead>

        <tbody>
          {
            contenido.map((cont)=>(
                <TrabajadorRow 
                key={cont.id} 
                contenido={cont}/>
            ))
          }
        </tbody>
        </table>
  )
}