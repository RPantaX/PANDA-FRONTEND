import { useContext, useReducer, useState } from "react";
import Swal from "sweetalert2";
import { trabajadoresReducers } from "../../reducers/trabajadoresReducers";
import { findAll, remove, save, update } from "../../services/trabajadorService";
import { useNavigate } from "react-router-dom";
import { initialErrorsTrabajador, initialTrabajadorForm, globalinitialObjects } from "../../utilities/initialObjects";
import { AuthContext } from "../../auth/context/AuthContext";

export const useTrabajadores = () => {
    const [trabajadores, dispatch] = useReducer(trabajadoresReducers, globalinitialObjects);
    const [trabajadorSelected, setTrabajadorSelected] = useState(initialTrabajadorForm);
    const [visibleForm, setVisibleForm] = useState(false);
    const [errorsTrabajador, setErrors] = useState(initialErrorsTrabajador);
    const{login, handlerLogout} = useContext(AuthContext);
    const navigate=useNavigate();

    const getTrabajadores = async (page) =>{
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

    const handlerAddTrabajador=async(trabajador)=>{
      if(!login.isAdmin) return;
      let response;
      try {
        if(trabajador.id===0){
          response= await save(trabajador);
        } else{
          response= await update(trabajador);
        }
        dispatch({
            type: (trabajador.id === 0) ? 'addTrabajador' : 'updateTrabajador',
            payload: response.data,
          });
          Swal.fire({
              title: "Trabajador Creado",
              text: "El trabajador ha sido creado con éxito!",
              icon: "success"
            });
            handlerCloseForm();
            navigate('/trabajadores')
      } catch (error) {
        if(error.response && error.response.status==400){
          setErrors(error.response.data);
        }else if (error.response && error.response.status==500 && 
          error.response.data?.mensaje?.includes('ya existe')){
            if(error.response.data?.mensaje?.includes('identidad')){
              setErrors({numIdentidad: error.response.data.mensaje})
            }
            if(error.response.data?.mensaje?.includes('bancaria')){
              setErrors({numCuentaBancaria: error.response.data.mensaje})
            }
            if(error.response.data?.mensaje?.includes('email')){
              setErrors({email: error.response.data.mensaje})
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
                dispatch({
                    type:'removeTrabajador',
                    payload:id
                  });
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
        setVisibleForm(true);
        setTrabajadorSelected({...trabajador});      
      }
      const handlerOpenForm=()=>{
        setVisibleForm(true);
      }
      const handlerCloseForm=()=>{
        setVisibleForm(false);
        setTrabajadorSelected(initialTrabajadorForm);
        setErrors({});
      }
      return {
        trabajadores,
        trabajadorSelected,
        initialTrabajadorForm,
        visibleForm,
        errorsTrabajador,
        handlerAddTrabajador,
        handlerRemoveTrabajador,
        handlerTrabajadorSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getTrabajadores,
      }
}
