import Swal from "sweetalert2";
import { findAll, remove, save, update } from "../../services/trabajadorService";
import { useNavigate } from "react-router-dom";
import { initialTrabajadorForm,  } from "../../utilities/initialObjects";
import { useDispatch, useSelector } from "react-redux";
import { addTrabajador, loadingTrabajadores, onTrabajadorSelectedForm, removeTrabajador, updateTrabajador, loadingError } from "../../store/slices/trabajador/trabajadorSlice";
import { userAuth } from "../../auth/pages/hooks/userAuth";

export const useTrabajadores = () => {
    const {trabajadores, trabajadorSelected, errorsTrabajador} = useSelector(state => state.trabajadores);
    const dispatch = useDispatch();
    const{login, handlerLogout} = userAuth();
    const navigate=useNavigate();

    const getTrabajadores = async (page) =>{
      try {
        const result = await findAll(page);
        dispatch(loadingTrabajadores(result.data));
      } catch (error) {
        if(error.response?.status == 401){
          handlerLogout();
        }
      }
      
    }

    const handlerAddTrabajador=async(trabajador)=>{
      if(!login.isAdmin) return;
      let response;
      try {
        if(trabajador.id===0){
          response= await save(trabajador);
          dispatch(addTrabajador(response.data))
        } else{
          response= await update(trabajador);
          dispatch(updateTrabajador(response.data));
        }
          Swal.fire({
              title: "Trabajador Creado",
              text: "El trabajador ha sido creado con éxito!",
              icon: "success"
            });
            navigate('/trabajadores')
      } catch (error) {
        if(error.response && error.response.status==400){
          dispatch(loadingError(error.response.data))
        }else if (error.response && error.response.status==500 && 
          error.response.data?.mensaje?.includes('ya existe')){
            if(error.response.data?.mensaje?.includes('identidad')){
              dispatch(loadingError({numIdentidad: error.response.data.mensaje}))
            }
            if(error.response.data?.mensaje?.includes('bancaria')){
              dispatch(loadingError({numCuentaBancaria: error.response.data.mensaje}))
            }
            if(error.response.data?.mensaje?.includes('email')){
              dispatch(loadingError({email: error.response.data.mensaje}))
            }
        } else if(error.response?.status == 401){
          handlerLogout();
        }
        else{
          throw error;
        }
      }
      }

      const handlerRemoveTrabajador=(id)=>{
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
            text: "Cuidado, el trabajador será eliminado!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "sí, eliminar!",
            cancelButtonText: "No, cancelar!",
            reverseButtons: true
          }).then(async (result) => {
            if (result.isConfirmed) {
              try {
                await remove(id);
                dispatch(removeTrabajador(id));
              swalWithBootstrapButtons.fire({
                title: "Trabajador eliminado!",
                text: "El trabajador ha sido eliminado con éxito.",
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
                text: "El trabajador no se eliminó",
                icon: "error"
              });
            }
          });
      }
      const handlerTrabajadorSelectedForm=(trabajador)=>{
        dispatch(onTrabajadorSelectedForm({...trabajador}));
      }
      return {
        trabajadores,
        trabajadorSelected,
        initialTrabajadorForm,
        errorsTrabajador,
        handlerAddTrabajador,
        handlerRemoveTrabajador,
        handlerTrabajadorSelectedForm,
        getTrabajadores,
      }
}
