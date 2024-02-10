import { useReducer } from "react";
import Swal from "sweetalert2";
import { loginReducer } from "../../reducers/loginReducer";
import { loginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const initialLogin =JSON.parse(sessionStorage.getItem('login')) || {
    isAuth: false,
    email: undefined,
  }
export const userAuth = () => {
    const [login, dispatch] = useReducer(loginReducer, initialLogin);
    const navigate = useNavigate();

    const handlerLogin = ({email, password}) =>{
        const isLogin = loginUser({email, password})
        if(isLogin){
          const email = {email: 'admin'}
          dispatch({
            type: 'login',
            payload: email,
          });
          sessionStorage.setItem('login', JSON.stringify({
            isAuth: true,
            email,
          }));
          navigate('/users')
      } else{
          Swal.fire('Error Loign','Email y password inválidos', 'error');
      }
      }
    
      const handlerLogout=()=>{
        dispatch({
          type: 'logout',
        });
        sessionStorage.removeItem('login');
      }

  return {
    login,
    handlerLogin,
    handlerLogout
  }
}
