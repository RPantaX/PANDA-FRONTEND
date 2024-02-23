import { useEffect, useState } from "react"
import { useCarretas } from "../hook/useCarretas";

export const CarretaForm = ({carretaSelected, handlerCloseFormCarreta}) => {
    const {handlerAddCarreta, initialCarretaForm, errorsCarreta}= useCarretas();
    const [carretaForm, setCarretaForm] = useState(initialCarretaForm)
    const {id, marca, capacidadCarga, placa, anoFabricacion}=carretaForm;
    useEffect(() => {
        setCarretaForm({
                ...carretaSelected
            });
    }, [carretaSelected])
    

    const onInputChange = ({target})=>{
        const{name, value} = target;
        setCarretaForm({
            ...carretaForm,
            [name]: value
        })
    }
    const onSubmit=(event)=>{
        event.preventDefault() //previene que se refresque la página
        handlerAddCarreta(carretaForm)
    }
    const onCloseForm=()=>{
        handlerCloseFormCarreta();
        setCarretaForm(initialCarretaForm);
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
        <p className="text-danger">{errorsCarreta?.marca}</p>
        <label >Capacidad de Carga en Kg</label>
            <input 
            className="form-control my-3 w-75"
            placeholder="Capacidad de Carga"
            name="capacidadCarga"
            value={capacidadCarga}
            onChange={onInputChange}
            />
        <p className="text-danger">{errorsCarreta?.capacidadCarga}</p>
        <label >Año de fabricación</label>
            <input 
                className="form-control my-3 w-75"
                name="anoFabricacion"
                value={anoFabricacion}
                onChange={onInputChange}
                />
        <p className="text-danger">{errorsCarreta?.anoFabricacion}</p>

            <input 
            className="form-control my-3 w-75"
            placeholder="Placa"
            name="placa"
            value={placa}
            onChange={onInputChange}
            />
        <p className="text-danger">{errorsCarreta?.placa}</p>

        <input type="hidden"
            name="id"
            value={id} />
            <button
                className="btn btn-primary my-1 mx-1"
                type="submit"
            >{id>0? 'Editar' : 'crear'}
            </button>
            {!handlerCloseFormCarreta || <button
              className="btn btn-danger my-1 mx-1"
              type="button"
              onClick={onCloseForm}>
                  Cerrar
            </button>}
    </form>
  )
}