import { useReducer } from "react";
import Swal from "sweetalert2";
import { loginReducer } from "../../reducers/loginReducer";
import { loginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const initialLogin =JSON.parse(sessionStorage.getItem('login')) || {
    isAuth: false,
    isAdmin: false,
    user: undefined,
  }
export const userAuth = () => {
    const [login, dispatch] = useReducer(loginReducer, initialLogin);
    const navigate = useNavigate();

    const handlerLogin = async ({username, password}) =>{
        
        try{
          const response = await loginUser({username, password})
          const token=response.data.jwt;
          const claims = JSON.parse(window.atob(token.split(".")[1])); //el token se separa por puntos cabezera, claims, firma./viene en base 64->atob nos permite decodificar un script en base 64
          const user = {username: response.data.username}

          dispatch({
            type: 'login',
            payload: {user, isAdmin: claims.isAdmin},
          });
          sessionStorage.setItem('login', JSON.stringify({
            isAuth: true,
            isAdmin: claims.idAdmin,
            user,
          }));
          sessionStorage.setItem('token', `Bearer ${token}`)
          navigate('/users')
      } catch(error){
        if(error.response?.status ==401){
          Swal.fire('Error Loign','username y password inválidos', 'error');
        }else if(error.response?.status ==403){
          Swal.fire('Error Loign','No tiene acceso al recurso o permisos!', 'error');
        } else {
          throw error;
        }
      }
      }
    
      const handlerLogout=()=>{
        dispatch({
          type: 'logout',
        });
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('login');
        sessionStorage.clear();
      }

  return {
    login,
    handlerLogin,
    handlerLogout
  }
}
