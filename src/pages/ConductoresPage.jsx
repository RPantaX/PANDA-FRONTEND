import { Button } from "antd";
import { ConductorList } from "../components/ConductorList";
import { ConductorModalForm } from "../components/ConductorModalForm";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { AuthContext } from "../auth/context/AuthContext";


export const ConductoresPages = () => {
  const {
    visibleFormConductor,
    handlerOpenFormConductor,
    getConductores,
  } = useContext(UserContext);

  useEffect(() => {
    getConductores();
  }, []);
  const{login} = useContext(AuthContext);
    return (
    <>
    {!visibleFormConductor || 
        <ConductorModalForm/>
      }
      <div className="container my-4">
          <h2 style={{ textAlign:"center"}}>Registro de Conductores</h2>
          <div className="row">

              <div className="col">
                {(visibleFormConductor ||!login.isAdmin) ||<Button style={{ marginBottom:10}} onClick={handlerOpenFormConductor}>
                Crear Conductor</Button>
                }
                {
                    <ConductorList />
                }
              </div>
          </div>
      </div>
    </>
  );
}