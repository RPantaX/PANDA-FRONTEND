import { TrabajadorList } from "../components/TrabajadorList";
import { Button } from "antd";
import { NavLink } from "react-router-dom";


export const TrabajadoresPages = () => {
    return (
    <>
      <div className="container my-4">
          <h2 style={{ textAlign:"center"}}>Registro de Trabajadores</h2>
          <div className="row">

              <div className="col">
                {
                  <NavLink to="/trabajadores/register"><Button style={{ marginBottom:10}}>
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