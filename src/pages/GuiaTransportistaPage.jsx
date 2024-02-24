import { Button } from "antd";
import { NavLink } from "react-router-dom";
import { userAuth } from "../auth/pages/hooks/userAuth";
import { GuiaTransportistaList } from "../components/guiaTransportista/guiaTransportistaList";


export const GuiaTransportistaPage = () => {
  //const{login} = userAuth();
    return (
    <>
      <div className="container my-4">
          <h2 style={{ textAlign:"center"}}>Registro de Guias de transportista</h2>
          <div className="row">

              <div className="col">
                <NavLink to="/guia-transportista/register"><Button style={{ marginBottom:10}}>
                  Emitir Guia Transportista</Button>
                  </NavLink>
                {
                    <GuiaTransportistaList />
                }
                  
              </div>
          </div>
      </div>
    </>
  );
}