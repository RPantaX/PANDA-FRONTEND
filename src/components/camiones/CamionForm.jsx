import { useEffect, useState } from "react"
import { useCamiones } from "../hook/useCamiones";
import { userAuth } from "../../auth/pages/hooks/userAuth";
export const CamionForm = ({camionSelected, handlerCloseFormCamion}) => {
    const{login} = userAuth();
    const {handlerAddCamion, initialCamionForm, errorsCamion}= useCamiones();
    const [camionForm, setCamionForm] = useState(initialCamionForm)
    const {id, marca, modelo, anoFabricacion, placa, carreta}=camionForm;
    useEffect(() => {
        setCamionForm({
                ...camionSelected
            });
    }, [camionSelected])
    

    const onInputChange = ({target})=>{
        const{name, value} = target;
        setCamionForm({
            ...camionForm,
            [name]: value
        })
    }
    const onSubmit=(event)=>{
        event.preventDefault() //previene que se refresque la página
        handlerAddCamion(camionForm)
    }
    const onCloseForm=()=>{
        handlerCloseFormCamion();
        setCamionForm(initialCamionForm);
    }
    return (
    <form onSubmit={onSubmit} style={{ margin: "auto", textAlign: "center" }}>
        <input 
            className="form-control my-3 w-75"
            placeholder="Marca"
            name="marca"
            value={marca}
            onChange={onInputChange}
            />
        <p className="text-danger">{errorsCamion?.marca}</p>
            <input 
            className="form-control my-3 w-75"
            placeholder="Modelo"
            name="modelo"
            value={modelo}
            onChange={onInputChange}
            />
        <p className="text-danger">{errorsCamion?.modelo}</p>
        <label >Año de fabricación</label>
            <input 
                className="form-control my-3 w-75"
                name="anoFabricacion"
                value={anoFabricacion}
                onChange={onInputChange}
                />
        <p className="text-danger">{errorsCamion?.anoFabricacion}</p>

            <input 
            className="form-control my-3 w-75"
            placeholder="Placa"
            name="placa"
            value={placa}
            onChange={onInputChange}
            />
        <p className="text-danger">{errorsCamion?.placa}</p>
        <label >ID Carreta</label>
        <input 
            className="form-control my-3 w-75"
            placeholder="ID Carreta"
            name="carreta"
            value={carreta && carreta.id !== null ? carreta.id : 0}
            onChange={onInputChange}
        />
        <p className="text-danger">{errorsCamion?.carreta}</p>
        <input type="hidden"
            name="id"
            value={id} />


        {
            login.isAdmin?
            <>
            <button className="btn btn-primary my-1 mx-1" type="submit">
                {id > 0 ? 'Editar' : 'Crear'}
            </button>
            {!handlerCloseFormCamion || (
                <button className="btn btn-danger my-1 mx-1" type="button" onClick={onCloseForm}>
                    Cerrar
                </button>
            )}
            </>
            :
            <>
            {!handlerCloseFormCamion} <button
              className="btn btn-danger my-1 mx-1"
              type="button"
              onClick={onCloseForm}>
                  Cerrar
                </button>
                <p style={{textAlign:"center", color:"red"}}>Esta es una muestra, solo los Administradores pueden gestionar los registros</p>

            </>
        }
    </form>
  )
}