import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useGuiaTransportistas } from '../hook/useGuiaTransportista';
import { GuiaTransportistaForm } from './GuiaTransportistaForm';
import { userAuth } from '../../auth/pages/hooks/userAuth';

export const RegisterPagesGuia = () => {
    const {guiaTransportista={},initialGuiaTransportistaForm}=useGuiaTransportistas();
    const{login} = userAuth();
    const [guiaSelected, setGuiaSelected] = useState(initialGuiaTransportistaForm); //use state para registerpages de trabajadores
    
    const {id} = useParams();

    useEffect(() => {
        if(id){
            const guia=guiaTransportista.contenido.find(t=>t.id==id) || initialGuiaTransportistaForm;
            setGuiaSelected(guia);
        }
    }, [id])
    
    return (
    <>
            <GuiaTransportistaForm guiaTransportistaSelected={guiaSelected} user={login.id}/>
    </>
  )
}
