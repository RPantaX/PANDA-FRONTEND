import { useContext } from "react";
import { TrabajadorForm } from "./TrabajadorForm";
import { UserContext } from "../context/UserContext";



export const TrabajadorModalForm = () => {

  const  {trabajadorSelected, handlerCloseForm}= useContext(UserContext);
  return (
    <div className="abrir-modal animacion fadeIn">
          <div className="modal" style={{display: "block"}} tabIndex="-1">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {trabajadorSelected.id>0 ? 'Editar':'Crear'} Modal Usuarios
                  </h5>
                </div>
                <div className="modal-body">
                  <TrabajadorForm 
                      trabajadorSelected={trabajadorSelected} 
                      handlerCloseForm={handlerCloseForm}
                  />  
                </div>
              </div>
            </div>
          </div>
        </div>
  );
}