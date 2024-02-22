import { useEffect, useState } from 'react'
import { TrabajadorForm } from '../components/TrabajadorForm'
import { useParams } from 'react-router-dom';
import { useTrabajadores } from '../components/hook/useTrabajadores';

export const RegisterPages = () => {
    const {trabajadores={},initialTrabajadorForm}=useTrabajadores();

    const [trabajadorSelected, setTrabajadorSelected] = useState(initialTrabajadorForm); //use state para registerpages de trabajadores
    
    const {id} = useParams();

    useEffect(() => {
        if(id){
            const trabajador=trabajadores.contenido.find(t=>t.id==id) || initialTrabajadorForm;
            setTrabajadorSelected(trabajador);
        }
    }, [id])
    
    return (
    <div className='container my-4'>
        <h4 style={{textAlign: 'center', marginBottom:30}}>{trabajadorSelected.id>0? 'Editar': 'Registrar'} Trabajador</h4>
            <TrabajadorForm trabajadorSelected={trabajadorSelected}/>
            {/*Pasamos el trabajadorSelected porque tiene otro contexto dependiendo si viene del modal o del form independiente. */} 
    </div>
  )
}
