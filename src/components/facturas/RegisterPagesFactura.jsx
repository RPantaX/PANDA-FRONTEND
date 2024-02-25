import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { userAuth } from '../../auth/pages/hooks/userAuth';
import { useFacturas } from '../hook/useFacturas';
import { FacturaForm } from './FacturaForm';

export const RegisterPagesFactura = () => {
    const {facturas={},initialFacturaForm}=useFacturas();
    const{login} = userAuth();
    const [facturaSelected, setFacturaSelected] = useState(initialFacturaForm); //use state para registerpages de trabajadores
    
    const {id} = useParams();

    useEffect(() => {
        if(id){
            const guia=facturas.contenido.find(t=>t.id==id) || initialFacturaForm;
            setFacturaSelected(guia);
        }
    }, [id])
    
    return (
    <>
            <FacturaForm facturaSelected={facturaSelected} user={login.id}/>
    </>
  )
}
