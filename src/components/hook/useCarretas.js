import { initialCarretaForm } from "../../utilities/initialObjects";
import { useNavigate } from "react-router-dom";
import { findAll, remove, save, update } from "../../services/carretaService";
import Swal from "sweetalert2";
import { userAuth } from "../../auth/pages/hooks/userAuth";
import { useDispatch, useSelector } from "react-redux";
import { addCarreta, loadingCarreta, loadingError, onCarretaSelectedForm, onCloseForm, removeCarreta, updateCarreta, onOpenForm } from "../../store/slices/carreta/carretaSlice";

export const useCarretas = () => {
    const {carretas,carretaSelected, visibleForm, errorsCarreta } = useSelector(state => state.carretas);
    const dispatch = useDispatch();
    const{login, handlerLogout} = userAuth();
    const navigate=useNavigate();

    const getCarretas = async (page) =>{
      try {
        const result = await findAll(page);
        dispatch(loadingCarreta(result.data));
      } catch (error) {
        if(error.response?.status == 401){
          handlerLogout();
        }
      }
      
    }

    const handlerAddCarreta=async(conductor)=>{
      if(!login.isAdmin) return;
      let response;
      try {
        if(conductor.id===0){
          response= await save(conductor);
          dispatch(addCarreta(response.data));
        } else{
          response= await update(conductor);
          dispatch(updateCarreta(response.data));
        }
          Swal.fire({
              title: "Registro Creado",
              text: "El Registro ha sido creado con éxito!",
              icon: "success"
            });
            handlerCloseFormCarreta();
            navigate('/carretas')
      } catch (error) {
        if(error.response && error.response.status==400){
          dispatch(loadingError(error.response.data));
        }else if (error.response && error.response.status==500 && 
          error.response.data?.mensaje?.includes('registrada')){
            if(error.response.data?.mensaje?.includes('placa')){
              dispatch(loadingError({placa: error.response.data.mensaje}));
            }
        }else if(error.response?.status == 401){
          handlerLogout();
        }else{
          throw error;
        }
      }
      }

      const handlerRemoveCarreta=(id)=>{
        if(!login.isAdmin) return;
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
          });
          swalWithBootstrapButtons.fire({
            title: "Está seguro que desea eliminar?",
            text: "Cuidado, el registro será eliminado!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "sí, eliminar!",
            cancelButtonText: "No, cancelar!",
            reverseButtons: true
          }).then(async(result) => {
            if (result.isConfirmed) {
              try {
                await remove(id);
                dispatch(removeCarreta(id));
              swalWithBootstrapButtons.fire({
                title: "Registro eliminado!",
                text: "El registro ha sido eliminado con éxito.",
                icon: "success"
              });
                
              } catch (error) {
                if(error.response?.status == 401){
                  handlerLogout();
                }
              }
              
            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire({
                title: "Cancelado",
                text: "El registro no se eliminó",
                icon: "error"
              });
            }
          });
      }
      const handlerCarretaSelectedForm=(carreta)=>{
        dispatch(onCarretaSelectedForm({...carreta}));
      }
      const handlerOpenFormCarreta=()=>{
        dispatch(onOpenForm());
      }
      const handlerCloseFormCarreta=()=>{
        dispatch(onCloseForm())
        dispatch(loadingError())
      }
      return {
        carretas,
        carretaSelected,
        initialCarretaForm,
        visibleForm,
        errorsCarreta,
        handlerAddCarreta,
        handlerRemoveCarreta,
        handlerCarretaSelectedForm,
        handlerOpenFormCarreta,
        handlerCloseFormCarreta,
        getCarretas,
      }
}