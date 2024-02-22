import { useNavigate } from "react-router-dom";
import { findAll, remove, save, update } from "../../services/userService";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {loadingUsers,addUser,removeUser, updateUser , onUserSelectedForm, onOpenFormUser, onCloseFormUser, loadingError } from "../../store/slices/users/usersSlice";
import { userAuth } from "../../auth/pages/hooks/userAuth";
import { initialUserForm } from "../../utilities/initialObjects";
//con esto manipulamos y modificamos los datos

export const useUser = () => {
    const {users, userSelected, visibleFormUser, errorsUser} = useSelector(state => state.users); //data modificada.
    const dispatch = useDispatch();
    const{login, handlerLogout} = userAuth();
    const navigate=useNavigate();

    const getUsers = async () =>{
      try {
        const result = await findAll();
        dispatch(loadingUsers(result.data));
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
          dispatch(addUser(response.data));
        } else{
          response= await update(user);
          dispatch(updateUser(response.data));
        }
          Swal.fire({
              title: "Usuario Creado",
              text: "El Usuario ha sido creado con éxito!",
              icon: "success"
            });
            handlerCloseFormUser();
            navigate('/usuarios')
      } catch (error) {
        if(error.response && error.response.status==400){
          dispatch(loadingError(error.response.data));
        }else if (error.response && error.response.status==500 && 
          error.response.data?.mensaje?.includes('ya existe')){
            if(error.response.data?.mensaje?.includes('email')){
              dispatch(loadingError({email: error.response.data.mensaje}));
            }
            if(error.response.data?.mensaje?.includes('identidad')){
              dispatch(loadingError({numIdentidad: error.response.data.mensaje}));
            }
            if(error.response.data?.mensaje?.includes('usuario')){
              dispatch(loadingError({username: error.response.data.mensaje}));
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
                await remove(id);
                dispatch(removeUser(id));
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
      const handlerUserSelectedForm=(user)=>{
        dispatch(onUserSelectedForm({...user}))      
      }
      const handlerOpenFormUser=()=>{
        dispatch(onOpenFormUser());
      }
      const handlerCloseFormUser=()=>{
        dispatch(onCloseFormUser());
        dispatch(loadingError({}));
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
