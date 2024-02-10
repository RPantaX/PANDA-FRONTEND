import { LoginPages } from './auth/pages/LoginPages';
import { Navigate, Route, Routes } from 'react-router-dom';
import { UserRoutes } from './routes/UserRoutes';
import { useContext } from 'react';
import { AuthContext } from './auth/context/AuthContext';
//rutas privadas si se autentica y rutas públicas para el login
function PandaApp() {
  const {login } =useContext(AuthContext);
  return (
    <Routes>
      {
        
        login.isAuth
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

export default PandaApp
