import { useContext, useReducer, useState } from "react";
import { trabajadoresReducers } from "../../reducers/trabajadoresReducers";
import { globalinitialObjects, initialConductorForm, initialErrorsConductor } from "../../utilities/initialObjects";
import { useNavigate } from "react-router-dom";
import { findAll, remove, save, update } from "../../services/conductorService";
import Swal from "sweetalert2";
import { AuthContext } from "../../auth/context/AuthContext";

export const useConductores = () => {
    const [conductores, dispatch] = useReducer(trabajadoresReducers, globalinitialObjects);
    const [conductorSelected, setConductorSelected] = useState(initialConductorForm);
    const [visibleFormConductor, setVisibleForm] = useState(false);
    const [errorsConductor, setErrors] = useState(initialErrorsConductor);
    const{login, handlerLogout} = useContext(AuthContext);
    const navigate=useNavigate();

    const getConductores = async (page) =>{
      try {
        const result = await findAll(page);
        dispatch({
        type: 'loadingTrabajadores',
        payload: result.data,
      });
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
        } else{
          response= await update(conductor);
        }
        dispatch({
            type: (conductor.id === 0) ? 'addTrabajador' : 'updateTrabajador',
            payload: response.data,
          });
          Swal.fire({
              title: "Conductor Creado",
              text: "El Conductor ha sido creado con éxito!",
              icon: "success"
            });
            handlerCloseFormConductor();
            navigate('/conductores')
      } catch (error) {
        if(error.response && error.response.status==400){
          setErrors(error.response.data);
        }else if (error.response && error.response.status==500 && 
          (error.response.data?.mensaje?.includes('asignado') || error.response.data?.mensaje?.includes('existe'))){
            if(error.response.data?.mensaje?.includes('trabajador')){
              setErrors({trabajador: error.response.data.mensaje})
            }
            if(error.response.data?.mensaje?.includes('camion')){
              setErrors({camion: error.response.data.mensaje})
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
                dispatch({
                    type:'removeTrabajador',
                    payload:id
                  });
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
        setVisibleForm(true);
        setConductorSelected({...conductor});      
      }
      const handlerOpenFormConductor=()=>{
        setVisibleForm(true);
      }
      const handlerCloseFormConductor=()=>{
        setVisibleForm(false);
        setConductorSelected(initialConductorForm);
        setErrors({});
      }
      return {
        conductores,
        conductorSelected,
        initialConductorForm,
        visibleFormConductor,
        errorsConductor,
        handlerAddConductor,
        handlerRemoveConductor,
        handlerConductorSelectedForm,
        handlerOpenFormConductor,
        handlerCloseFormConductor,
        getConductores,
      }
}
