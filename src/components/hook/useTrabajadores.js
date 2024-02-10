import { useReducer, useState } from "react";
import Swal from "sweetalert2";
import { trabajadoresReducers } from "../../reducers/trabajadoresReducers";
import { findAll } from "../../services/trabajadorService";

const initialTrabajadores = {};

const initialTrabajadorForm = {
        id: 0,
        nombres: '',
        apellidos: '',
        numIdentidad: '',
        fechaNacimiento: '',
        genero: {
            id: 0
        },
        estadoCivil: {
            id: 0
        },
        nacionalidad: {
            id: 0
        },
        direccionResidencia: '',
        telefono: '',
        email: '',
        cargo: {
            id: 0
        },
        fechaIngreso: '',
        numCuentaBancaria: '',
        estado:'',
        idUser:0
}

export const useTrabajadores = () => {
    const [trabajadores, dispatch] = useReducer(trabajadoresReducers, initialTrabajadores);
    const [trabajadorSelected, setTrabajadorSelected] = useState(initialTrabajadorForm);
    const [visibleForm, setVisibleForm] = useState(false);

    const getTrabajadores = async () =>{
      const result = await findAll();
      console.log(result.data);
      dispatch({
        type: 'loadingTrabajadores',
        payload: result.data
      });
    }

    const handlerAddTrabajador=(trabajador)=>{
        dispatch({
          type: trabajador.id === 0 ? 'addTrabajador' : 'updateTrabajador',
          payload: trabajador
        });
        Swal.fire({
            title: "Trabajador Creado",
            text: "El trabajador ha sido creado con éxito!",
            icon: "success"
          });
          handlerCloseForm();
      }

      const handlerRemoveTrabajador=(id)=>{
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
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch({
                    type:'removeTrabajador',
                    payload:id
                  });
              swalWithBootstrapButtons.fire({
                title: "Trabajador eliminado!",
                text: "El trabajador ha sido eliminado con éxito.",
                icon: "success"
              });
            } else if (
              /* Read more about handling dismissals below */
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
      }
      return {
        trabajadores,
        trabajadorSelected,
        initialTrabajadorForm,
        visibleForm,
        handlerAddTrabajador,
        handlerRemoveTrabajador,
        handlerTrabajadorSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getTrabajadores,
      }
}
