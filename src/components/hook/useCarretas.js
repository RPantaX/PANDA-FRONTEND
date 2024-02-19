import { useContext, useReducer, useState } from "react";
import { trabajadoresReducers } from "../../reducers/trabajadoresReducers";
import { globalinitialObjects, initialCarretaForm, initialErrorsCarreta } from "../../utilities/initialObjects";
import { useNavigate } from "react-router-dom";
import { findAll, remove, save, update } from "../../services/carretaService";
import Swal from "sweetalert2";
import { AuthContext } from "../../auth/context/AuthContext";

export const useCarretas = () => {
    const [carretas, dispatch] = useReducer(trabajadoresReducers, globalinitialObjects);
    const [carretaSelected, setCarretaSelected] = useState(initialCarretaForm);
    const [visibleFormCarreta, setVisibleForm] = useState(false);
    const [errorsCarreta, setErrors] = useState(initialErrorsCarreta);
    const{login, handlerLogout} = useContext(AuthContext);
    const navigate=useNavigate();

    const getCarretas = async (page) =>{
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

    const handlerAddCarreta=async(conductor)=>{
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
            handlerCloseFormCarreta();
            navigate('/carretas')
      } catch (error) {
        if(error.response && error.response.status==400){
          setErrors(error.response.data);
        }else if (error.response && error.response.status==500 && 
          error.response.data?.mensaje?.includes('registrada')){
            if(error.response.data?.mensaje?.includes('placa')){
              setErrors({placa: error.response.data.mensaje});
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
        setVisibleForm(true);
        setCarretaSelected({...carreta});      
      }
      const handlerOpenFormCarreta=()=>{
        setVisibleForm(true);
      }
      const handlerCloseFormCarreta=()=>{
        setVisibleForm(false);
        setCarretaSelected(initialCarretaForm);
        setErrors({});
      }
      return {
        carretas,
        carretaSelected,
        initialCarretaForm,
        visibleFormCarreta,
        errorsCarreta,
        handlerAddCarreta,
        handlerRemoveCarreta,
        handlerCarretaSelectedForm,
        handlerOpenFormCarreta,
        handlerCloseFormCarreta,
        getCarretas,
      }
}