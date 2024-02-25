import Swal from "sweetalert2";
import { findAll,save } from "../../services/facturaService";
import { useNavigate } from "react-router-dom";
import { initialFacturaForm  } from "../../utilities/initialObjects";
import { useDispatch, useSelector } from "react-redux";
import { userAuth } from "../../auth/pages/hooks/userAuth";
import { addFactura, loadingError, loadingFactura, onFacturaSelectedForm } from "../../store/slices/facturas/facturaSlice";

export const useFacturas = () => {
    const {facturas, facturaSelected, errorsFactura} = useSelector(state => state.facturas);
    const dispatch = useDispatch();
    const{login, handlerLogout} = userAuth();
    const navigate=useNavigate();

    const getFacturas = async (page) =>{
      try {
        const result = await findAll(page);
        dispatch(loadingFactura(result.data));
      } catch (error) {
        if(error.response?.status == 401){
          handlerLogout();
        }
      }      
    }

    const handlerAddFactura=async(guia)=>{
      if(!login.isAdmin) return;
      let response;
      try {
          response= await save(guia);
          dispatch(addFactura(response.data))
          Swal.fire({
              title: "Registro Creado",
              text: "El Registro ha sido creado con éxito!",
              icon: "success"
            });
            navigate('/facturas')
      } catch (error) {
        if(error.response && error.response.status==400){
          dispatch(loadingError(error.response.data))
        }else if (error.response && error.response.status==500 && 
          error.response.data?.mensaje?.includes('esta')){
            if(error.response.data?.mensaje?.includes('remitente')){
              dispatch(loadingError({clienteRuc: error.response.data.mensaje}))
            }else if(error.response.data?.mensaje?.includes('guia')){
              dispatch(loadingError({numeroGuia: error.response.data.mensaje}))
            }
        } else if(error.response?.status == 401){
          handlerLogout();
        }
        else{
          throw error;
        }
      }
      }
      const handlerFacturaSelectedForm=(guia)=>{
        dispatch(onFacturaSelectedForm({...guia}));
      }
      return {
        facturas,
        facturaSelected,
        initialFacturaForm,
        errorsFactura,
        handlerAddFactura,
        handlerFacturaSelectedForm,
        getFacturas
      }
}