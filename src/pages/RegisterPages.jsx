import { useContext, useEffect, useState } from 'react'
import { TrabajadorForm } from '../components/TrabajadorForm'
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export const RegisterPages = () => {
    const {trabajadores=[],initialTrabajadorForm}=useContext(UserContext);

    const [trabajadorSelected, setTrabajadorSelected] = useState(initialTrabajadorForm);

    const {id} = useParams();

    useEffect(() => {
        if(id){
            const trabajador=trabajadores.find(t=>t.id==id) || initialTrabajadorForm;
            setTrabajadorSelected(trabajador);
        }
    }, [id])
    
    return (
    <div className='container my-4'>
        <h4>{trabajadorSelected.id>0? 'Editar': 'Registrar'} Trabajador</h4>
        <div className='col'>
            <TrabajadorForm trabajadorSelected={trabajadorSelected}/>
            {/*Pasamos el trabajadorSelected porque tiene otro contexto dependiendo si viene del modal o del form independiente. */} 
        </div>
    </div>
  )
}
