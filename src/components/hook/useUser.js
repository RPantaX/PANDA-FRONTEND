import { useContext, useReducer, useState } from "react";
import { usersReducer } from "../../reducers/usersReducer";
import { UserinitialObject, initialUserForm, initialErrorsUser } from "../../utilities/initialObjects";
import { useNavigate } from "react-router-dom";
import { findAll, remove, save, update } from "../../services/userService";
import Swal from "sweetalert2";
import { AuthContext } from "../../auth/context/AuthContext";


export const useUser = () => {
    const [users, dispatch] = useReducer(usersReducer, UserinitialObject);
    const [userSelected, setUserSelected] = useState(initialUserForm);
    const [visibleFormUser, setVisibleForm] = useState(false);
    const [errorsUser, setErrors] = useState(initialErrorsUser);
    const{login, handlerLogout} = useContext(AuthContext);
    const navigate=useNavigate();

    const getUsers = async () =>{
      try {
        const result = await findAll();
        dispatch({
        type: 'loadingUsers',
        payload: result.data,
      });
      } catch (error) {
        if(error.response?.status == 401){
          handlerLogout();
        }
      }
      
    }

    const handlerAddUser=async(user)=>{
      if(!login.isAdmin) return;
      let response;
      try {
        if(user.id===0){
          response= await save(user);
        } else{
          response= await update(user);
        }
        dispatch({
            type: (user.id === 0) ? 'addUser' : 'updateUser',
            payload: response.data,
          });
          Swal.fire({
              title: "Usuario Creado",
              text: "El Usuario ha sido creado con éxito!",
              icon: "success"
            });
            handlerCloseFormUser();
            navigate('/usuarios')
      } catch (error) {
        if(error.response && error.response.status==400){
          setErrors(error.response.data);
        }else if (error.response && error.response.status==500 && 
          error.response.data?.mensaje?.includes('ya existe')){
            if(error.response.data?.mensaje?.includes('email')){
              setErrors({email: error.response.data.mensaje})
            }
            if(error.response.data?.mensaje?.includes('identidad')){
              setErrors({numIdentidad: error.response.data.mensaje})
            }
            if(error.response.data?.mensaje?.includes('usuario')){
                setErrors({username: error.response.data.mensaje})
              }
        } else if(error.response?.status == 401){
          handlerLogout();
        }
        else{
          throw error;
        }
      }
      }

      const handlerRemoveUser=(id)=>{
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
          }).then(async (result) => {
            if (result.isConfirmed) {
              try {
                remove(id);
                dispatch({
                    type:'removeUser',
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
      const handlerUserSelectedForm=(usuario)=>{
        setVisibleForm(true);
        setUserSelected({...usuario});      
      }
      const handlerOpenFormUser=()=>{
        setVisibleForm(true);
      }
      const handlerCloseFormUser=()=>{
        setVisibleForm(false);
        setUserSelected(initialUserForm);
        setErrors({});
      }
      return {
        users,
        userSelected,
        initialUserForm,
        visibleFormUser,
        errorsUser,
        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerOpenFormUser,
        handlerCloseFormUser,
        getUsers,
      }
}
