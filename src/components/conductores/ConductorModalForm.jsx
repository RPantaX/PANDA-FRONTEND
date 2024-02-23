import { ConductorForm } from "./ConductorForm";
import { useConductores } from "../hook/useConductores";

export const ConductorModalForm = () => {

    const  {conductorSelected, handlerCloseFormConductor}= useConductores();
    return (
      <div className="abrir-modal animacion fadeIn">
            <div className="modal" style={{display: "block"}} tabIndex="-1">
              <div className="modal-dialog" role="document" style={{ margin: "auto", textAlign: "center" }}>
                <div className="modal-content">
                  <div className="modal-header" style={{ margin: "auto" }}>
                    <h5 className="modal-title">
                      {conductorSelected.id>0 ? 'Editar':'Crear'} conductor
                    </h5>
                  </div>
                  <div className="modal-body">
                    <ConductorForm 
                        conductorSelected={conductorSelected} 
                        handlerCloseFormConductor={handlerCloseFormConductor}
                    />  
                  </div>
                </div>
              </div>
            </div>
          </div>
    );
  }