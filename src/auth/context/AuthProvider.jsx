import { userAuth } from "../pages/hooks/userAuth";
import { AuthContext } from "./AuthContext"

export const AuthProvider = ({children}) => {
    const {login, handlerLogin, handlerLogout } = userAuth();
  return (
    <AuthContext.Provider value={
        {
            login,
            handlerLogin,
            handlerLogout
        }
    }>
        {children}
    </AuthContext.Provider>
  )
}
