
import { useContext, useEffect } from "react";
import { TrabajadorList } from "../components/TrabajadorList";
import { TrabajadorModalForm } from "../components/TrabajadorModalForm";
import { UserContext } from "../context/UserContext";


export const TrabajadoresPages = () => {

      const {
        trabajadores,
        visibleForm,
        handlerOpenForm,
        getTrabajadores,
      } = useContext(UserContext);

      useEffect(() => {
        getTrabajadores();
      }, []);
    return (
    <>
      {!visibleForm || 
        <TrabajadorModalForm/>
      }
      <div className="container my-4">
          <h2>UsersApp</h2>
          <div className="row">

              <div className="col">
                {
                visibleForm || <button
                    className="btn btn-primary my-2"
                    onClick={handlerOpenForm}>
                    Nuevo Usuario
                </button>
                }
                
                {
                    trabajadores.totalElementos === 0
                    ? <div className="alert alert-warning">No hay usuarios en el sistema!</div>
                    :<TrabajadorList />
                }
                  
              </div>
          </div>
      </div>
    </>
  );
}