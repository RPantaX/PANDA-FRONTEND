import pandaImg from '../../images/panda-icon.png';
import usuariolIcon from '../../images/usuario-icon.png';
import passwordlIcon from '../../images/password-icon.png';
import './login.css'
import Swal from 'sweetalert2';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const initialLoginForm={
    email: '',
    password: ''
}
export const LoginPages = () => {
    //login
    const {handlerLogin}= useContext(AuthContext)
    const [loginForm, setLoginForm] = useState(initialLoginForm);
    const {email, password}= loginForm;

    const onInputChange = ({target}) =>{
        const {name, value}= target;
        setLoginForm({
            ...loginForm,
            [name] : value,
        })
    }
    const onSubmit = (event) =>{
        event.preventDefault();
        if(!email || !password){
            Swal.fire('Error de validación', 'Email y password requeridos', 'error')
        }
        handlerLogin({email, password});
        setLoginForm(initialLoginForm);
    }
  return (
    <>
    <div className='login'>
        <div className='panda'>
            <img src={pandaImg}  alt="" />
            <h1>PANDA</h1>
        </div>
        <form onSubmit={onSubmit}>
            <legend><strong>INICIAR SESIÓN</strong></legend>
            <div className='email'>
                <img className="icon" src={usuariolIcon} alt="usuario-icon" />
                <input 
                    type="text" 
                    name="email"
                    placeholder="email"
                    value={email}
                    onChange={onInputChange} />
            </div>
            
            <div className='password'>
                <img className="icon"  src={passwordlIcon} alt="" />
                <input 
                    type="password"
                    name="password"
                    placeholder="contraseña"
                    value = {password}
                    onChange={onInputChange} />
            </div>
            <div className='invitado'><p> <strong>Ingresar como invitado</strong></p></div>
            <div>
                <button type='submit'>Iniciar Sesión</button>
            </div>
        </form>
    </div>
    </>
    
  );
}
