import { Button } from "antd";
import { NavLink } from "react-router-dom";
import { FacturaList } from "../components/facturas/FacturaList";


export const FacturasPage = () => {
  //const{login} = userAuth();
    return (
    <>
      <div className="container my-4">
          <h2 style={{ textAlign:"center"}}>Registro de Facturas</h2>
          <div className="row">

              <div className="col">
                <NavLink to="/factura/register"><Button style={{ marginBottom:10}}>
                  Emitir Factura</Button>
                  </NavLink>
                {
                    <FacturaList />
                }
                  
              </div>
          </div>
      </div>
    </>
  );
}