import { useCamiones } from "../components/hook/useCamiones";
import { useCarretas } from "../components/hook/useCarretas";
import { useConductores } from "../components/hook/useConductores";
import { useTrabajadores } from "../components/hook/useTrabajadores";
import { useUser } from "../components/hook/useUser";
import { UserContext } from "./UserContext"

export const UserProvider = ({children}) => {
  const{
    trabajadores,
    trabajadorSelected,
    initialTrabajadorForm,
    visibleForm,
    errorsTrabajador,
    handlerAddTrabajador,
    handlerRemoveTrabajador,
    handlerTrabajadorSelectedForm,
    handlerOpenForm,
    handlerCloseForm,
    getTrabajadores,
} = useTrabajadores();
const {
  conductores,
  conductorSelected,
  initialConductorForm,
  visibleFormConductor,
  errorsConductor,
  handlerAddConductor,
  handlerRemoveConductor,
  handlerConductorSelectedForm,
  handlerOpenFormConductor,
  handlerCloseFormConductor,
  getConductores,
} = useConductores();
const {
        camiones,
        camionSelected,
        initialCamionForm,
        visibleFormCamion,
        errorsCamion,
        handlerAddCamion,
        handlerRemoveCamion,
        handlerCamionSelectedForm,
        handlerOpenFormCamion,
        handlerCloseFormCamion,
        getCamiones,
} = useCamiones();
const {
        carretas,
        carretaSelected,
        initialCarretaForm,
        visibleFormCarreta,
        errorsCarreta,
        handlerAddCarreta,
        handlerRemoveCarreta,
        handlerCarretaSelectedForm,
        handlerOpenFormCarreta,
        handlerCloseFormCarreta,
        getCarretas,
} = useCarretas();

const {
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
} = useUser();
  return (
    <UserContext.Provider value={
        {
            trabajadores,
            trabajadorSelected,
            initialTrabajadorForm,
            visibleForm,
            errorsTrabajador,
            handlerAddTrabajador,
            handlerRemoveTrabajador,
            handlerTrabajadorSelectedForm,
            handlerOpenForm,
            handlerCloseForm,
            getTrabajadores,

            conductores,
            conductorSelected,
            initialConductorForm,
            visibleFormConductor,
            errorsConductor,
            handlerAddConductor,
            handlerRemoveConductor,
            handlerConductorSelectedForm,
            handlerOpenFormConductor,
            handlerCloseFormConductor,
            getConductores,

            camiones,
            camionSelected,
            initialCamionForm,
            visibleFormCamion,
            errorsCamion,
            handlerAddCamion,
            handlerRemoveCamion,
            handlerCamionSelectedForm,
            handlerOpenFormCamion,
            handlerCloseFormCamion,
            getCamiones,

            carretas,
            carretaSelected,
            initialCarretaForm,
            visibleFormCarreta,
            errorsCarreta,
            handlerAddCarreta,
            handlerRemoveCarreta,
            handlerCarretaSelectedForm,
            handlerOpenFormCarreta,
            handlerCloseFormCarreta,
            getCarretas,

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
    }>
      {children}
    </UserContext.Provider>
  )
}
