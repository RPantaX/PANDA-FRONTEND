import { LoginPages } from './auth/pages/LoginPages';
import { Navigate, Route, Routes } from 'react-router-dom';
import { UserRoutes } from './routes/UserRoutes';
import { useSelector } from 'react-redux';
//rutas privadas si se autentica y rutas públicas para el login
export const AppRoutes = () => {
   //const{login} = userAuth(); 
    const {isAuth } =useSelector(state=>state.auth); //tambien podemos llamarlo de esta forma.
    return (
      <Routes>
        {
          
          isAuth
            ? (
              
                <Route path='/*' element={<UserRoutes/>}/>
              
            ) 
            : <>
                <Route path='login' element={<LoginPages/>}/>
                <Route path='/*'element={<Navigate to="login" />}/>
              </>
        }
        
      </Routes>
      
    )
}
