import { Button } from "antd";
import { useEffect } from "react";
import { CarretaList } from "../components/carretas/CarretaList";
import { CarretaModalForm } from "../components/carretas/CarretaModalForm";
import { userAuth } from "../auth/pages/hooks/userAuth";
import { useCarretas } from "../components/hook/useCarretas";

export const CarretasPage = () => {
  const {
    visibleForm,
    handlerOpenFormCarreta,
    getCarretas,
  } = useCarretas();

  useEffect(() => {
    getCarretas();
  }, []);
  const{login} = userAuth();
    return (
    <>
    {!visibleForm || 
        <CarretaModalForm/>
      }
      <div className="container my-4">
          <h2 style={{ textAlign:"center"}}>Registro de Carretas</h2>
          <div className="row">

              <div className="col">
                {
                (visibleForm ||!login.isAdmin) || <Button style={{ marginBottom:10}} onClick={handlerOpenFormCarreta}>
                Crear Carreta</Button>
                }
                {
                    <CarretaList />
                }
              </div>
          </div>
      </div>
    </>
  );
}