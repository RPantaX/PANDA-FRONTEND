import { Button } from "antd";
import { ConductorList } from "../components/ConductorList";
import { ConductorModalForm } from "../components/ConductorModalForm";
import { useEffect } from "react";
import { userAuth } from "../auth/pages/hooks/userAuth";
import { useConductores } from "../components/hook/useConductores";


export const ConductoresPages = () => {
  const {
    visibleForm,
    handlerOpenFormConductor,
    getConductores,
  } = useConductores();

  useEffect(() => {
    getConductores();
  }, []);
  const{login} = userAuth();
    return (
    <>
    {!visibleForm || 
        <ConductorModalForm/>
      }
      <div className="container my-4">
          <h2 style={{ textAlign:"center"}}>Registro de Conductores</h2>
          <div className="row">

              <div className="col">
                {(visibleForm ||!login.isAdmin) ||<Button style={{ marginBottom:10}} onClick={handlerOpenFormConductor}>
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