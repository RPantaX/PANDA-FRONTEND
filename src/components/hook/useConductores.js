import { initialConductorForm } from "../../utilities/initialObjects";
import { useNavigate } from "react-router-dom";
import { findAll, remove, save, update } from "../../services/conductorService";
import Swal from "sweetalert2";
import { userAuth } from "../../auth/pages/hooks/userAuth";
import { useDispatch, useSelector } from "react-redux";
import { addConductor, loadingConductor, loadingError, onCloseForm, onConductorSelectedForm, onOpenForm, removeConductor, updateConductor } from "../../store/slices/conductor/conductorSlice";
export const useConductores = () => {
    const {conductores,conductorSelected, errorsConductor, visibleForm } = useSelector(state => state.conductores)
    const dispatch = useDispatch();
    const{login, handlerLogout} = userAuth();
    const navigate=useNavigate();

    const getConductores = async (page) =>{
      try {
        const result = await findAll(page);
        dispatch(loadingConductor(result.data));
      } catch (error) {
        if(error.response?.status == 401){
          handlerLogout();
        }
      }
    }
    const handlerAddConductor=async(conductor)=>{
      if(!login.isAdmin) return;
      let response;
      try {
        if(conductor.id===0){
          response= await save(conductor);
          dispatch(addConductor(response.data))
        } else{
          response= await update(conductor);
          dispatch(updateConductor(response.data))
        }
          Swal.fire({
              title: "Conductor Creado",
              text: "El Conductor ha sido creado con éxito!",
              icon: "success"
            });
            handlerCloseFormConductor();
            navigate('/conductores')
      } catch (error) {
        if(error.response && error.response.status==400){
          dispatch(loadingError(error.response.data));
        }else if (error.response && error.response.status==500 && 
          (error.response.data?.mensaje?.includes('asignado') || error.response.data?.mensaje?.includes('existe'))){
            if(error.response.data?.mensaje?.includes('trabajador')){
              dispatch(loadingError({trabajador: error.response.data.mensaje}));
            }
            if(error.response.data?.mensaje?.includes('camion')){
              dispatch(loadingError({camion: error.response.data.mensaje}))
            }
        }else if(error.response?.status == 401){
          handlerLogout();
        }
        else{
          throw error;
        }
      }
      }

      const handlerRemoveConductor=(id)=>{
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
          }).then(async(result) => {
            if (result.isConfirmed) {
              try {
                await remove(id);
                dispatch(removeConductor(id));
              swalWithBootstrapButtons.fire({
                title: "Conductor eliminado!",
                text: "El conductor ha sido eliminado con éxito.",
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
                text: "El conductor no se eliminó",
                icon: "error"
              });
            }
          });
      }
      const handlerConductorSelectedForm=(conductor)=>{
        dispatch(onConductorSelectedForm({...conductor}));
      }
      const handlerOpenFormConductor=()=>{
        dispatch(onOpenForm());
      }
      const handlerCloseFormConductor=()=>{
        dispatch(onCloseForm());
        dispatch(loadingError({}));
      }
      return {
        conductores,
        conductorSelected,
        initialConductorForm,
        visibleForm,
        errorsConductor,
        handlerAddConductor,
        handlerRemoveConductor,
        handlerConductorSelectedForm,
        handlerOpenFormConductor,
        handlerCloseFormConductor,
        getConductores,
      }
}
