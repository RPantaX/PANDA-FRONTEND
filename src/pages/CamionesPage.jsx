import { Button } from "antd";
import { useEffect } from "react";
import { CamionList } from "../components/CamionList";
import { CamionModalForm } from "../components/CamionModalForm";
import { userAuth } from "../auth/pages/hooks/userAuth";
import { useCamiones } from "../components/hook/useCamiones";


export const CamionesPage = () => {
  const {
    visibleForm,
    handlerOpenFormCamion,
    getCamiones,
  } = useCamiones();

  useEffect(() => {
    getCamiones();
  }, []);
  const{login} = userAuth();

    return (
    <>
    {!visibleForm || 
        <CamionModalForm/>
      }
      <div className="container my-4">
          <h2 style={{ textAlign:"center"}}>Registro de Camiones</h2>
          <div className="row">

              <div className="col">
                {
                (visibleForm ||!login.isAdmin) || <Button style={{ marginBottom:10}} onClick={handlerOpenFormCamion}>
                Crear Camion</Button>
                }
                {
                    <CamionList />
                }
              </div>
          </div>
      </div>
    </>
  );
}