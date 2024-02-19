import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { CarretaForm } from "./CarretaForm";

export const CarretaModalForm = () => {

    const  {carretaSelected, handlerCloseFormCarreta}= useContext(UserContext);
    return (
      <div className="abrir-modal animacion fadeIn">
            <div className="modal" style={{display: "block"}} tabIndex="-1">
              <div className="modal-dialog" role="document" style={{ margin: "auto", textAlign: "center" }}>
                <div className="modal-content">
                  <div className="modal-header" style={{ margin: "auto" }}>
                    <h5 className="modal-title">
                      {carretaSelected.id>0 ? 'Editar':'Crear'} carreta
                    </h5>
                  </div>
                  <div className="modal-body">
                    <CarretaForm
                        carretaSelected={carretaSelected} 
                        handlerCloseFormCarreta={handlerCloseFormCarreta}
                    />  
                  </div>
                </div>
              </div>
            </div>
          </div>
    );
  }