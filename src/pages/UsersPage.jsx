import { Button } from "antd";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { UserList } from "../components/UserList";
import { UserModalForm } from "../components/UserModalForm";


export const UsersPage = () => {
    const {
        visibleFormUser,
        handlerOpenFormUser,
        getUsers,
      } = useContext(UserContext);
    
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