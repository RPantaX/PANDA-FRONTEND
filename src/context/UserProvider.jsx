import { useTrabajadores } from "../components/hook/useTrabajadores";
import { UserContext } from "./UserContext"

export const UserProvider = ({children}) => {
  const{
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
} = useTrabajadores();
  return (
    <UserContext.Provider value={
        {
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
    }>
      {children}
    </UserContext.Provider>
  )
}
