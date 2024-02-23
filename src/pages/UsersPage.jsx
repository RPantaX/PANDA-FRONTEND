import { Button } from "antd";
import { useEffect } from "react";
import { UserList } from "../components/usuarios/UserList";
import { UserModalForm } from "../components/usuarios/UserModalForm";
import { useUser } from "../components/hook/useUser";


export const UsersPage = () => {
    const {
        visibleFormUser,
        handlerOpenFormUser,
        getUsers,
      } = useUser(); //obtenemos la data de redux con nuestro hook
    
      useEffect(() => {
        getUsers();
      }, []);
        return (
        <>
        {!visibleFormUser || 
            <UserModalForm/>
          }
          <div className="container my-4">
              <h2 style={{ textAlign:"center"}}>Registro de Usuarios</h2>
              <div className="row">
    
                  <div className="col">
                    {
                    visibleFormUser || <Button style={{ marginBottom:10}} onClick={handlerOpenFormUser}>
                    Crear Usuario</Button>
                    }
                    {
                        <UserList />
                    }
                  </div>
              </div>
          </div>
        </>
      );
}