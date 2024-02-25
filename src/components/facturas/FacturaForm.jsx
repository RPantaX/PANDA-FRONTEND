import {  useEffect, useState } from "react"
import pandaImage from "../../images/panda-small-icon.jpeg"
import { userAuth } from "../../auth/pages/hooks/userAuth";
import { useFacturas } from "../hook/useFacturas";
import { ListItemsView } from "./ListItemsView";
import { TotalView } from "./TotalView";
import { FormItemsView } from "./FormItemsViwe";

const calculateTotal = (items = []) => {
    return items
        .map(item => item.precioUnitario * item.cantidad)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}
export const FacturaForm = ({facturaSelected, user}) => {
    const{login} = userAuth();
    const {handlerAddFactura, initialFacturaForm, errorsFactura}= useFacturas();
    const [facForm, setFacForm] = useState(initialFacturaForm)
    const { clienteRuc, observacion, seguieGuia, numeroGuia} =facForm;

    //para la factura
    const [activeForm, setActiveForm] = useState(false);

    const [total, setTotal] = useState(0);
    const [items, setItems] = useState([]);
    const [counter, setCounter] = useState(1);
    useEffect(() => {
            setFacForm({
                ...facturaSelected});
            setItems(items);
    }, []);
    useEffect(() => {
        // console.log('el counter cambio!')
    }, [counter]);
    useEffect(() => {
        setTotal(calculateTotal(items));
        // console.log('el items cambio!')
    }, [items]);

    const handlerAddItems = ({ descripcion, cantidad, precioUnitario}) => {
        setItems([...items, {
            id: counter,
            descripcion: descripcion.trim(),
            precioUnitario: +precioUnitario.trim(),
            cantidad: parseInt(cantidad.trim(), 10)
        }]);
        console.log(items);
        setCounter(counter + 1);
    };

    const handlerDeleteItem = (id) => {
        setItems(items.filter(item => item.id !== id ))
    }


    const onActiveForm = () => {
        setActiveForm(!activeForm);
    }

    const onInputChange = ({target})=>{
        const { name, value } = target;
        setFacForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const onSubmit=(event)=>{
        event.preventDefault();

    // Crear una nueva lista de ítems sin el campo 'id'
        const itemsToSend = items.map(({ id, ...rest }) => rest);

     const fac = {
        ...facForm,
        idUser: user.idUser,
        items: itemsToSend // Utilizar la nueva lista sin el campo 'id'
    };

    console.log(fac);
    handlerAddFactura(fac);
    }
    
    return (
    <div className="container-lg w-50" style={{ backgroundColor: '#001529', color: '#fff' }}>
        <div className="card my-3" style={{ backgroundColor: '#001529', color: '#fff' }}>
         <form onSubmit={onSubmit} style={{ backgroundColor: '#001529', color: '#fff' }}>
                <div style={{ backgroundColor: '#001529', color: '#fff' }}>   
                <div className="card-header" style={{ backgroundColor: '#001529', color: '#fff' }}>
                    <h2 className="text-center mb-4 p-3" style={{ fontSize: '24px' }}>Factura Electrónica</h2>
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
                </div>
                
                <div className="card-body">
                    <div className="row my-3">
                        <div className="col">
                            <h3 style={{ fontSize: '20px', textAlign:"center", marginBottom:"30px"}}>Datos del remitente</h3>
                            <label htmlFor="clienteRuc" style={{ fontSize: '15px' }}>RUC del cliente:</label>
                            <input  className="form-control mb-3" type="text" name="clienteRuc" value={clienteRuc} onChange={onInputChange}/>
                            <p className="text-danger">{errorsFactura?.clienteRuc}</p>  
                        </div>
                        <div className="col">
                            <h3 style={{ fontSize: '20px', textAlign:"center", marginBottom:"30px"}}>Datos Guia Transporte</h3>
                            <label htmlFor="seguieGuia" style={{ fontSize: '15px' }}>Serie:</label>
                            <input  className="form-control mb-3" type="text" name="seguieGuia" value={seguieGuia} onChange={onInputChange}/>
                            <p className="text-danger">{errorsFactura?.seguieGuia}</p>  
                            <label htmlFor="numeroGuia" style={{ fontSize: '15px' }}>Número:</label>
                            <input  className="form-control mb-3" type="text" name="numeroGuia" value={numeroGuia} onChange={onInputChange}/>
                            <p className="text-danger">{errorsFactura?.numeroGuia}</p>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="col">
                            <h3 style={{ fontSize: '20px', textAlign:"center", marginBottom:"30px" }}>Datos del viaje</h3>
                            <label htmlFor="observacion" style={{ fontSize: '15px' }}>Observaciones:</label>
                            <input  className="form-control mb-3" type="text" name="observacion" value={observacion} onChange={onInputChange}/>
                            <p className="text-danger">{errorsFactura?.observacion}</p> 
                        </div>
                    </div>
                </div>
                    {
                    login.isAdmin? <button
                    className="btn btn-primary my-1 mx-1"
                    type="submit"
                >
                    Emitir Factura
                </button> : <p style={{textAlign:"center", color:"red"}}>Esta es una muestra, solo los Administradores pueden gestionar los registros</p>
                    }
            
            
            </form>
            <div className="card-body">
                <div className="row my-3">
              <ListItemsView title="Servicios de la factura" items={items} handlerDeleteItem={id => handlerDeleteItem(id)} />
                        <TotalView total={total} />
                        
                        <div className="col" style={{textAlign:"center"}}>

                        <button className="btn btn-secondary"
                            onClick={onActiveForm}>{!activeForm ? 'Agregar Item': 'Cerrar Form'}</button>
                        </div>
                        { !activeForm || <FormItemsView handler={handlerAddItems} /> }

                </div>
            </div>
            </div>
    </div>
  )
}
