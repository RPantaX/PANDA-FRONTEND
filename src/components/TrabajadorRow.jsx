import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { UserContext } from "../context/UserContext"

export const TrabajadorRow = ({contenido}) => {
  const {handlerRemoveTrabajador, handlerTrabajadorSelectedForm}= useContext(UserContext);
    return (
      <>
          <tr key={contenido.id}>
                  <td>{contenido.id}</td>
                  <td>{contenido.nombres}</td>
                  <td>{contenido.apellidos}</td>
                  <td>{contenido.numIdentidad}</td>
                  <td>{contenido.nacionalidad.nombreNacionalidad}</td>
                  <td>{contenido.telefono}</td>
                  <td>{contenido.email}</td>
                  <td>{contenido.cargo.nombreCargo}</td>
                  <td>{contenido.estado}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={()=>handlerTrabajadorSelectedForm(contenido)}
                    >update</button>
                  </td>
                  <td>
                    <NavLink className={"btn btn-secondary btn-sm"}
                      to={'/trabajadores/edit/'+contenido.id}>
                      update route
                    </NavLink>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={()=>handlerRemoveTrabajador(contenido.id)}
                    >remove</button>
                  </td>
                </tr>
      </>
    )
  }