import { Button } from "antd";
import { ConductorList } from "../components/conductores/ConductorList";
import { ConductorModalForm } from "../components/conductores/ConductorModalForm";
import { useEffect } from "react";
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
    return (
    <>
    {!visibleForm || 
        <ConductorModalForm/>
      }
      <div className="container my-4">
          <h2 style={{ textAlign:"center"}}>Registro de Conductores</h2>
          <div className="row">

              <div className="col"><Button style={{ marginBottom:10}} onClick={handlerOpenFormConductor}>
                Crear Conductor</Button>
                {
                    <ConductorList />
                }
              </div>
          </div>
      </div>
    </>
  );
}