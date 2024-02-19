import { Button } from "antd";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { CarretaList } from "../components/CarretaList";
import { CarretaModalForm } from "../components/CarretaModalForm";
import { AuthContext } from "../auth/context/AuthContext";


export const CarretasPage = () => {
  const {
    visibleFormCarreta,
    handlerOpenFormCarreta,
    getCarretas,
  } = useContext(UserContext);

  useEffect(() => {
    getCarretas();
  }, []);
  const{login} = useContext(AuthContext);
    return (
    <>
    {!visibleFormCarreta || 
        <CarretaModalForm/>
      }
      <div className="container my-4">
          <h2 style={{ textAlign:"center"}}>Registro de Carretas</h2>
          <div className="row">

              <div className="col">
                {
                (visibleFormCarreta ||!login.isAdmin) || <Button style={{ marginBottom:10}} onClick={handlerOpenFormCarreta}>
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