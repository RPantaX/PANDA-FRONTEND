import { initialCamionForm } from "../../utilities/initialObjects";
import { useNavigate } from "react-router-dom";
import { findAll, remove, save, update } from "../../services/camionService";
import Swal from "sweetalert2";
import { userAuth } from "../../auth/pages/hooks/userAuth";
import { useDispatch, useSelector } from "react-redux";
import { addCamion, loadingCamion, loadingError, onCamionSelectedForm, removeCamion, updateCamion, onCloseForm, onOpenForm } from "../../store/slices/camion/camionesSlice";
export const useCamiones = () => {
    const {camiones, camionSelected, visibleForm, errorsCamion} = useSelector(state => state.camiones);
    const dispatch = useDispatch();
    const{login, handlerLogout} = userAuth();
    const navigate=useNavigate();

    const getCamiones = async (page) =>{
      try {
        const result = await findAll(page);
      dispatch(loadingCamion(result.data));
      } catch (error) {
        if(error.response?.status == 401){
          handlerLogout();
        }
      }
      
    }

    const handlerAddCamion=async(conductor)=>{
      if(!login.isAdmin) return;
      let response;
      try {
        if(conductor.id===0){
          response= await save(conductor);
          dispatch(addCamion(response.data));
        } else{
          response= await update(conductor);
          dispatch(updateCamion(response.data));
        }
          Swal.fire({
              title: "Registro Creado",
              text: "El Registro ha sido creado con éxito!",
              icon: "success"
            });
            handlerCloseFormCamion();
            navigate('/camiones')
      } catch (error) {
        if(error.response && error.response.status==400){
          dispatch(loadingError(error.response.data));
        }else if (error.response && error.response.status==500 && 
          error.response.data?.mensaje?.includes('existe')){
            if(error.response.data?.mensaje?.includes('placa')){
              dispatch(loadingError({placa: error.response.data.mensaje}));
            }
            if(error.response.data?.mensaje?.includes('id')){
              dispatch(loadingError({carreta: error.response.data.mensaje}));
            }
        }else if(error.response?.status == 401){
          handlerLogout();
        }else{
          throw error;
        }
      }
      }

      const handlerRemoveCamion=(id)=>{
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
                dispatch(removeCamion(id));
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
      const handlerCamionSelectedForm=(camion)=>{
        dispatch(onCamionSelectedForm({...camion}))
      }
      const handlerOpenFormCamion=()=>{
        dispatch(onOpenForm());
      }
      const handlerCloseFormCamion=()=>{
        dispatch(onCloseForm())
        dispatch(loadingError({}))
      }
      return {
        camiones,
        camionSelected,
        initialCamionForm,
        visibleForm,
        errorsCamion,
        handlerAddCamion,
        handlerRemoveCamion,
        handlerCamionSelectedForm,
        handlerOpenFormCamion,
        handlerCloseFormCamion,
        getCamiones,
      }
}