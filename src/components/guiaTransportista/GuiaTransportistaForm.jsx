import {  useEffect, useState } from "react"
import { formatDate } from "../../utilities/ObjectsBD";
import { useGuiaTransportistas } from "../hook/useGuiaTransportista";
import pandaImage from "../../images/panda-small-icon.jpeg"
export const GuiaTransportistaForm = ({guiaTransportistaSelected, user}) => {

    const {handlerAddGuia, initialGuiaTransportistaForm, errorsGuiaTransportista}= useGuiaTransportistas();
    const [guiaForm, setGuiaForm] = useState(initialGuiaTransportistaForm)
    const { partida, llegada, fechaTraslado, remitenteRuc, destinatarioRuc, destinatarioRazonSocial, destinatarioDireccion, pesoCarga, numDocChofer, rucPagadorDelFlete, placaVehiculo } =guiaForm;
    useEffect(() => {
        if (guiaTransportistaSelected.fechaTraslado) {
            const updatedTrabajador = {
                ...guiaTransportistaSelected,
                fechaNacimiento: formatDate(guiaTransportistaSelected.fechaTraslado)
            };
            setGuiaForm(updatedTrabajador);
        }
    }, [guiaTransportistaSelected]);
    
    const onInputChange = ({target})=>{
        const{name, value} = target;
        setGuiaForm({
            ...guiaForm,
            [name]: value
        })
    }
    const onSubmit=(event)=>{

        
        const guia={
          ...guiaForm,
          idUser:user.idUser
        }
        console.log(guia);
        event.preventDefault() //previene que se refresque la página
        handlerAddGuia(guia)
    }
    
    return (
      <div className="container-lg">
    <form onSubmit={onSubmit}>
        <div className="card my-3">
            <div className="card-header" style={{ backgroundColor: '#001529', color: '#fff' }}>
                <h2 className="text-center mb-4 p-3" style={{ fontSize: '24px' }}>Guía de Remisión Electrónica Transportista</h2>
            </div>
            <div className="card-body" style={{ backgroundColor: '#001529', color: '#fff', alignItems:"center" }}>
                <div className="row" style={{ alignItems:"center" }}>
                    <div className="col-md-6" style={{textAlign:"center"}}>
                        <img src={pandaImage} alt="" style={{ width: "150px" }} />
                    </div>
                    <div className="col-md-6" style={{textAlign:"center"}}>
                        <div className="d-flex flex-column">
                            <p className="mb-0" style={{ fontSize: '22px' }}>PANDA EIRL</p>
                            <p className="mb-0" style={{ fontSize: '15px' }}>2060384724</p>
                            <p className="mb-0" style={{ fontSize: '13px' }}>AV MORALES DUAREZ MZ A LT</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-body">
            <div className="row my-3">
            <div className="col">
              <label htmlFor="fechaTraslado" style={{ fontSize: '15px' }}>Fecha de inicio de Traslado:</label>
              <input  className="form-control" type="date" name="fechaTraslado" value={fechaTraslado} onChange={onInputChange}/>
              <p className="text-danger">{errorsGuiaTransportista?.fechaTraslado}</p>  
            </div>
          </div>
          <div className="row my-3">
            <div className="col">
              <label htmlFor="partida" style={{ fontSize: '15px' }}>Punto de partida:</label>
              <input className="form-control mb-3" type="text" name="partida" value={partida} onChange={onInputChange}/>
              <p className="text-danger">{errorsGuiaTransportista?.partida}</p>  
            </div>
            <div className="col">
              <label htmlFor="llegada" style={{ fontSize: '15px' }}>Punto de llegada:</label>
              <input  className="form-control mb-3" type="text" name="llegada" value={llegada} onChange={onInputChange}/>
              <p className="text-danger">{errorsGuiaTransportista?.llegada}</p>  
            </div>
          </div>
          <div className="row my-3">
            <div className="col">
              <h3 style={{ fontSize: '20px', textAlign:"center", marginBottom:"30px"}}>Datos del remitente</h3>
              <label htmlFor="remitenteRuc" style={{ fontSize: '15px' }}>RUC del remitente:</label>
              <input  className="form-control mb-3" type="text" name="remitenteRuc" value={remitenteRuc} onChange={onInputChange}/>
              <p className="text-danger">{errorsGuiaTransportista?.remitenteRuc}</p>  
            </div>
            <div className="col">
              <h3 style={{ fontSize: '20px', textAlign:"center", marginBottom:"30px"}}>Datos del destinatario</h3>
              <label htmlFor="destinatarioRuc" style={{ fontSize: '15px' }}>RUC del destinatario:</label>
              <input  className="form-control mb-3" type="text" name="destinatarioRuc" value={destinatarioRuc} onChange={onInputChange}/>
              <p className="text-danger">{errorsGuiaTransportista?.destinatarioRuc}</p>  
              <label htmlFor="destinatarioRazonSocial" style={{ fontSize: '15px' }}>Razón social del destinatario:</label>
              <input  className="form-control mb-3" type="text" name="destinatarioRazonSocial" value={destinatarioRazonSocial} onChange={onInputChange}/>
              <p className="text-danger">{errorsGuiaTransportista?.destinatarioRazonSocial}</p>  
              <label htmlFor="destinatarioDireccion" style={{ fontSize: '15px' }}>Dirección del destinatario:</label>
              <input  className="form-control mb-3" type="text" name="destinatarioDireccion" value={destinatarioDireccion} onChange={onInputChange}/>
              <p className="text-danger">{errorsGuiaTransportista?.destinatarioDireccion}</p>  
            </div>
          </div>
          <div className="row my-3">
            <div className="col">
              <h3 style={{ fontSize: '20px', textAlign:"center", marginBottom:"30px" }}>Datos del viaje</h3>
              <label htmlFor="numDocChofer" style={{ fontSize: '15px' }}>Número de documento del chofer:</label>
              <input  className="form-control mb-3" type="text" name="numDocChofer" value={numDocChofer} onChange={onInputChange}/>
              <p className="text-danger">{errorsGuiaTransportista?.numDocChofer}</p> 
              <label htmlFor="placaVehiculo" style={{ fontSize: '15px' }}>Placa del vehículo:</label>
              <input  className="form-control mb-3" type="text" name="placaVehiculo" value={placaVehiculo} onChange={onInputChange}/>
              <p className="text-danger">{errorsGuiaTransportista?.placaVehiculo}</p> 
              <label htmlFor="pesoCarga" style={{ fontSize: '15px' }}>Peso de la carga:</label>
              <input  className="form-control mb-3" type="text" name="pesoCarga" value={pesoCarga} onChange={onInputChange}/>
              <p className="text-danger">{errorsGuiaTransportista?.pesoCarga}</p> 
              <label htmlFor="rucPagadorDelFlete" style={{ fontSize: '15px' }}>RUC del pagador del flete:</label>
              <input  className="form-control mb-3" type="text" name="rucPagadorDelFlete" value={rucPagadorDelFlete} onChange={onInputChange}/>
              <p className="text-danger">{errorsGuiaTransportista?.rucPagadorDelFlete}</p> 
            </div>
          </div>
            </div>

            <button
            className="btn btn-primary my-1 mx-1"
            type="submit"
        >
            Emitir
        </button>
        </div>
        
    </form>
</div>
  )
}
