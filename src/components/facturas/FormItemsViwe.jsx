import { useEffect, useState } from "react";

export const FormItemsView = ({ handler }) => {

    const [formItemsState, setFormItemsState] = useState({
        descripcion: '',
        cantidad: '',
        precioUnitario: '',
    });
    const [errors, setErrors] = useState({
        descripcion:'',
        precioUnitario:'',
        cantidad:''
    })
    const { descripcion, cantidad, precioUnitario } = formItemsState;


    useEffect(() => {
        // console.log('el precio cambio!')
    }, [precioUnitario]);

    useEffect(() => {
        // console.log('el formItemsState cambio!')
    }, [formItemsState]);


    const onInputChange = ({ target: { name, value } }) => {
        // console.log(name);
        // console.log(value);
        setFormItemsState( prevState =>({
            ...prevState,
            [name]: value
        }));
    }

    const onInvoiceItemsSubmit = (event) => {
        event.preventDefault();

        if (descripcion.trim().length <= 1){
            setErrors({descripcion:'Error: la descripción no puede estar vacia'})
            return;
        } 

        if (precioUnitario.trim().length <= 1){
            setErrors({precioUnitario:'Error: la precio está vacio'})
            return;
        } 
        if (isNaN(precioUnitario.trim())) {
            setErrors({precioUnitario:'Error: la precio no es un numero'})
            return;
        }
        if (cantidad.trim().length < 1) {
            setErrors({cantidad:'Error: la cantidad tiene que ser mayor a 0'})
            return;
        }
        if (isNaN(cantidad.trim())) {
            setErrors({cantidad:'Error: la cantidad no es un numero'})
            return;
        }
        console.log(formItemsState);
        handler(formItemsState);

        setFormItemsState({
            descripcion: '',
            precioUnitario: '',
            cantidad: '',
        });
        setErrors({
            descripcion:'',
            precioUnitario:'',
            cantidad:''
        })
    }

    return (<>

        <form onSubmit={onInvoiceItemsSubmit} style={{textAlign:"center", alignItems:"center", marginLeft:"0"}}>
            <input
                type="text"
                name="descripcion"
                value={descripcion}
                placeholder="Descripcion"
                className="form-control m-3"
                onChange={onInputChange} />
            <p className="text-danger">{errors?.descripcion}</p>  
            <input
                type="text"
                name="precioUnitario"
                value={precioUnitario}
                placeholder="Precio"
                className="form-control m-3"
                onChange={onInputChange} />
            <p className="text-danger">{errors?.precioUnitario}</p>  
            <input
            
                type="text"
                name="cantidad"
                value={cantidad}
                placeholder="Cantidad"
                className="form-control m-3"
                onChange={onInputChange} />
            <p className="text-danger">{errors?.cantidad}</p>  
            <button
                type="submit"
                className="btn btn-primary m-3">
                Nuevo Item
            </button>
        </form>

    </>)
}