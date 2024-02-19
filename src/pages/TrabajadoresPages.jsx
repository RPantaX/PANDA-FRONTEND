import { TrabajadorList } from "../components/TrabajadorList";
import { Button } from "antd";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../auth/context/AuthContext";


export const TrabajadoresPages = () => {
  const{login} = useContext(AuthContext);
    return (
    <>
      <div className="container my-4">
          <h2 style={{ textAlign:"center"}}>Registro de Trabajadores</h2>
          <div className="row">

              <div className="col">
                {
                  !login.isAdmin || <NavLink to="/trabajadores/register"><Button style={{ marginBottom:10}}>
                  Crear Trabajador</Button>
                  </NavLink>
                }
                
                {
                    <TrabajadorList />
                }
                  
              </div>
          </div>
      </div>
    </>
  );
}