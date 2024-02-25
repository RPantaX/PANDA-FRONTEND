import Swal from "sweetalert2";
import { findAll,save, findById } from "../../services/guiaTransportista";
import { useNavigate } from "react-router-dom";
import { initialGuiaTransportistaForm,  } from "../../utilities/initialObjects";
import { useDispatch, useSelector } from "react-redux";
import { userAuth } from "../../auth/pages/hooks/userAuth";
import { addGuia, guiaById, loadingError, loadingGuia, onGuiaSelectedForm } from "../../store/slices/guiaTransportista/guiaTransportistaSlice";

export const useGuiaTransportistas = () => {
    const {guiaTransportista, guiaTransportistaSelected, errorsGuiaTransportista, guiaByIdFirst} = useSelector(state => state.guiaTransportista);
    const dispatch = useDispatch();
    const{login, handlerLogout} = userAuth();
    const navigate=useNavigate();

    const getguiaTransportistas = async (page) =>{
      try {
        const result = await findAll(page);
        dispatch(loadingGuia(result.data));
      } catch (error) {
        if(error.response?.status == 401){
          handlerLogout();
        }
      }      
    }

    const handlerAddGuia=async(guia)=>{
      if(!login.isAdmin) return;
      let response;
      try {
          response= await save(guia);
          dispatch(addGuia(response.data))
          Swal.fire({
              title: "Registro Creado",
              text: "El Registro ha sido creado con éxito!",
              icon: "success"
            });
            navigate('/guia-transportistas')
      } catch (error) {
        if(error.response && error.response.status==400){
          dispatch(loadingError(error.response.data))
        }else if (error.response && error.response.status==500 && 
          error.response.data?.mensaje?.includes('disponible')){
            if(error.response.data?.mensaje?.includes('remitente')){
              dispatch(loadingError({remitenteRuc: error.response.data.mensaje}))
            }
        } else if(error.response?.status == 401){
          handlerLogout();
        }
        else{
          throw error;
        }
      }
      }
      const handlerGetByIdGuia= async(id)=>{
        let response;
        try {
          response= await findById(id);
          dispatch(guiaById(response.data));
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
      const handlerGuiaSelectedForm=(guia)=>{
        dispatch(onGuiaSelectedForm({...guia}));
      }
      return {
        guiaTransportista,
        guiaTransportistaSelected,
        initialGuiaTransportistaForm,
        errorsGuiaTransportista,
        handlerAddGuia,
        handlerGuiaSelectedForm,
        getguiaTransportistas,
        handlerGetByIdGuia,
        guiaByIdFirst
      }
}