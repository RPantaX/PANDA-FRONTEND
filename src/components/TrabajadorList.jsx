import { useContext } from "react"
import { TrabajadorRow } from "./TrabajadorRow"
import { UserContext } from "../context/UserContext";

export const TrabajadorList = () => {

  const {trabajadores}= useContext(UserContext);
  //console.log(trabajadores);
  const {contenido}=trabajadores;
    return (
      <table className="table table-hover table-striped">
        <thead>
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