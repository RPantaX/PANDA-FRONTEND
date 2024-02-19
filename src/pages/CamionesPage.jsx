import { Button } from "antd";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { CamionList } from "../components/CamionList";
import { CamionModalForm } from "../components/CamionModalForm";
import { AuthContext } from "../auth/context/AuthContext";


export const CamionesPage = () => {
  const {
    visibleFormCamion,
    handlerOpenFormCamion,
    getCamiones,
  } = useContext(UserContext);

  useEffect(() => {
    getCamiones();
  }, []);
  const{login} = useContext(AuthContext);

    return (
    <>
    {!visibleFormCamion || 
        <CamionModalForm/>
      }
      <div className="container my-4">
          <h2 style={{ textAlign:"center"}}>Registro de Camiones</h2>
          <div className="row">

              <div className="col">
                {
                (visibleFormCamion ||!login.isAdmin) || <Button style={{ marginBottom:10}} onClick={handlerOpenFormCamion}>
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