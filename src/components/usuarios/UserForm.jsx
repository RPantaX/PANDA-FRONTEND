import { useEffect, useState } from "react"
import { useUser } from "../hook/useUser";
export const UserForm = ({userSelected, handlerCloseFormUser}) => {
    const {handlerAddUser, initialUserForm, errorsUser}= useUser();
    const [userForm, setUserForm] = useState(initialUserForm); //estos estados son propios de redux, no es necesario cambiar nada.
    const [checked, setChecked] = useState(userForm.admin);
    const {id, numIdentidad, nombres, apellidos, username, email, telefono, password, admin}=userForm;
    useEffect(() => {
        setUserForm({
                ...userSelected
            });
    }, [userSelected])

    const onInputChange = ({target})=>{
        const{name, value} = target;
        setUserForm({
            ...userForm,
            [name]: value
        })
    }
    const onCheckboxChange = () => {
        setChecked(!checked);
        setUserForm({
            ...userForm,
            admin: checked,
        }
        );
    }
    const onSubmit=(event)=>{
        event.preventDefault(); //previene que se refresque la página
        handlerAddUser(userForm);
    }
    const onCloseForm=()=>{
        handlerCloseFormUser();
        setUserForm(initialUserForm);
    }
    return (
    <form onSubmit={onSubmit} style={{ margin: "auto", textAlign: "center" }}>
        
        <input
                className="form-control my-3 w-75"
                placeholder="Número de identidad"
                name="numIdentidad"
                value={ numIdentidad}
                onChange={onInputChange} />
        <p className="text-danger">{ errorsUser?.numIdentidad}</p>

        
        <input
                className="form-control my-3 w-75"
                placeholder="Nombres"
                name="nombres"
                value={ nombres}
                onChange={onInputChange} />
        <p className="text-danger">{ errorsUser?.nombres}</p>
        <input
                className="form-control my-3 w-75"
                placeholder="Apellidos"
                name="apellidos"
                value={ apellidos}
                onChange={onInputChange} />
        <p className="text-danger">{ errorsUser?.apellidos}</p>
        <input
                className="form-control my-3 w-75"
                placeholder="Username"
                name="username"
                value={ username}
                onChange={onInputChange} />
        <p className="text-danger">{ errorsUser?.username}</p>
        <input
                className="form-control my-3 w-75"
                placeholder="Email"
                name="email"
                value={email}
                onChange={onInputChange} />
        <p className="text-danger">{errorsUser?.email}</p>
        <input
                className="form-control my-3 w-75"
                placeholder="Telefono"
                name="telefono"
                value={telefono}
                onChange={onInputChange} />
        <p className="text-danger">{errorsUser?.telefono}</p>
        
        { id > 0 || <input
                className="form-control my-3 w-75"
                placeholder="Password"
                type="password"
                name="password"
                value={password}
                onChange={onInputChange} />}
        <p className="text-danger">{errorsUser?.password}</p>
        <div className="my-3 form-check">
                <input type="checkbox"
                    name="admin"
                    checked={admin}
                    className="form-check-input"
                    onChange={onCheckboxChange}
                />
                <label className="form-check-label">Admin</label>
            </div>
        
        <input type="hidden"
            name="id"
            value={id} />
            <button
                className="btn btn-primary my-1 mx-1"
                type="submit"
            >{id>0? 'Editar' : 'crear'}
            </button>
            {!handlerCloseFormUser || <button
              className="btn btn-danger my-1 mx-1"
              type="button"
              onClick={onCloseForm}>
                  Cerrar
            </button>}
    </form>
  )
}