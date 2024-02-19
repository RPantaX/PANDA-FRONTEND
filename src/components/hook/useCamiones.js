import { useContext, useReducer, useState } from "react";
import { trabajadoresReducers } from "../../reducers/trabajadoresReducers";
import { globalinitialObjects, initialCamionForm, initialErrorsCamion } from "../../utilities/initialObjects";
import { useNavigate } from "react-router-dom";
import { findAll, remove, save, update } from "../../services/camionService";
import Swal from "sweetalert2";
import { AuthContext } from "../../auth/context/AuthContext";

export const useCamiones = () => {
    const [camiones, dispatch] = useReducer(trabajadoresReducers, globalinitialObjects);
    const [camionSelected, setCamionSelected] = useState(initialCamionForm);
    const [visibleFormCamion, setVisibleForm] = useState(false);
    const [errorsCamion, setErrors] = useState(initialErrorsCamion);
    const{login, handlerLogout} = useContext(AuthContext);
    const navigate=useNavigate();

    const getCamiones = async (page) =>{
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

    const handlerAddCamion=async(conductor)=>{
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
              title: "Registro Creado",
              text: "El Registro ha sido creado con éxito!",
              icon: "success"
            });
            handlerCloseFormCamion();
            navigate('/camiones')
      } catch (error) {
        if(error.response && error.response.status==400){
          setErrors(error.response.data);
        }else if (error.response && error.response.status==500 && 
          error.response.data?.mensaje?.includes('existe')){
            if(error.response.data?.mensaje?.includes('placa')){
              setErrors({placa: error.response.data.mensaje})
            }
            if(error.response.data?.mensaje?.includes('id')){
              setErrors({carreta: error.response.data.mensaje})
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
                remove(id);
                dispatch({
                    type:'removeTrabajador',
                    payload:id
                  });
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
              /* Read more about handling dismissals below */
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
        setVisibleForm(true);
        setCamionSelected({...camion});      
      }
      const handlerOpenFormCamion=()=>{
        setVisibleForm(true);
      }
      const handlerCloseFormCamion=()=>{
        setVisibleForm(false);
        setCamionSelected(initialCamionForm);
        setErrors({});
      }
      return {
        camiones,
        camionSelected,
        initialCamionForm,
        visibleFormCamion,
        errorsCamion,
        handlerAddCamion,
        handlerRemoveCamion,
        handlerCamionSelectedForm,
        handlerOpenFormCamion,
        handlerCloseFormCamion,
        getCamiones,
      }
}