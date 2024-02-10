import { useContext, useEffect, useState } from "react"
import Swal from "sweetalert2";
import { UserContext } from "../context/UserContext";
const nacionalidadesBD=[
    {
        id:1,
        nombreNacionalidad: 'Argentina'
    },
    {
        id:2,
        nombreNacionalidad: 'Brasileña'
    },
    {
        id:3,
        nombreNacionalidad: 'Chilena'
    },
    {
        id:4,
        nombreNacionalidad: 'Colombiana'
    },
    {
        id:5,
        nombreNacionalidad: 'Mexicana'
    },
    {
        id:6,
        nombreNacionalidad: 'Peruana'
    },
    {
        id:7,
        nombreNacionalidad: 'Española'
    },

    {
        id:8,
        nombreNacionalidad: 'Estadounidense'
    },
    {
        id:9,
        nombreNacionalidad : 'Otra'
    }
]
const cargosBD=[
    {
        id:1,
        nombreCargo: 'Conductor_de_Camion'
    },
    {
        id:2,
        nombreCargo: 'Coordinador_de_Logistica'
    },
    {
        id:3,
        nombreCargo: 'Mecanico_de_Vehiculos'
    },
    {
        id:4,
        nombreCargo: 'Gerente_de_Flota'
    },
    {
        id:5,
        nombreCargo: 'Especialista_en_Seguridad_del_Transporte'
    },
    {
        id:6,
        nombreCargo: 'Representante_de_Servicio_al_Cliente'
    },
    {
        id:7,
        nombreCargo: 'Ingeniero_de_Sistemas'
    },

    {
        id:8,
        nombreCargo: 'Gerente_de_Recursos_Humanos'
    },
    {
        id:9,
        nombreCargo: 'Representante_de_Ventas'
    },
    {
        id:10,
        nombreCargo: 'CEO_Director_Ejecutivo'
    }
]
const generosBD=[
    {
        id:1,
        nombreGenero: 'Masculino'
    },
    {
        id:2,
        nombreGenero: 'Femenino'
    },
    {
        id:3,
        nombreGenero: 'Otro'
    }
]
const estadosBD=[
    {
        id:1,
        nombreEstadoCivil: 'Soltero'
    },
    {
        id:2,
        nombreEstadoCivil: 'Casado'
    },
    {
        id:3,
        nombreEstadoCivil: 'Divorciado'
    },
    {
        id:4,
        nombreEstadoCivil: 'Viudo'
    }
]

export const TrabajadorForm = ({trabajadorSelected, handlerCloseForm}) => {
    const {handlerAddTrabajador, initialTrabajadorForm}= useContext(UserContext);
    const [trabajadorForm, setTrabajadorForm] = useState(initialTrabajadorForm)
    const {id, nombres, apellidos, numIdentidad, fechaNacimiento,genero,estadoCivil, nacionalidad, direccionResidencia,telefono, email, cargo, numCuentaBancaria, estado, idUser}=trabajadorForm;
    const [nacionalidades, setNacionalidades] = useState([]);
    const [cargos, setCargos] = useState([]);
    const [estados, setEstados] = useState([]);
    const [generos, setGeneros] = useState([]);
    
    useEffect(() => {
        setTrabajadorForm({
            ...trabajadorSelected});
    }, [trabajadorSelected])
    
    useEffect(() => {
        // Fetch de Nacionalidades
          setNacionalidades(nacionalidadesBD);
    
        // Fetch de Cargos
        setCargos(cargosBD);
        //fetch de Generos
        setEstados(estadosBD);
        //fetch de generos
        setGeneros(generosBD);
      }, []);

    const onInputChange = ({target})=>{
        const{name, value} = target;
        setTrabajadorForm({
            ...trabajadorForm,
            [name]: value
        })
    }
    const onSubmit=(event)=>{
        event.preventDefault() //previene que se refresque la página
        if(!nombres || (!apellidos && id===0) || !email){
            Swal.fire({
                title: "Error de validación",
                text: "Debe completar los campos del formulario",
                icon: "error"
              });
            return;
        }
        handlerAddTrabajador(trabajadorForm)
        setTrabajadorForm(initialTrabajadorForm);
    }
    const onCloseForm=()=>{
        handlerCloseForm();
        setTrabajadorForm(initialTrabajadorForm);
    }
    return (
    <form onSubmit={onSubmit}>
        <input 
            className="form-control my-3 w-75"
            placeholder="Nombres"
            name="nombres"
            value={nombres}
            onChange={onInputChange}
            />
        <input 
            className="form-control my-3 w-75"
            placeholder="Apellidos"
            type="apellidos"
            name="apellidos"
            value={apellidos}
            onChange={onInputChange}
            />
        
        <input 
            className="form-control my-3 w-75"
            placeholder="DNI/CEDULA"
            name="numIdentidad"
            value={numIdentidad}
            onChange={onInputChange}
            />
        <label >Fecha de nacimiento</label>
        <input 
            className="form-control my-3 w-75"
            name="fechaNacimiento"
            type="date"
            value={fechaNacimiento}
            onChange={onInputChange}
            />
        <select
            className="form-control my-3 w-75"
            name="genero"
            value={genero.id}
            onChange={onInputChange}
        >
            <option value="">Seleccione Género</option>
            {generos.map((gen) => (
            <option key={gen.id} value={gen.id}>
                {gen.nombreGenero}
            </option>
            ))}
        </select>
        <select
            className="form-control my-3 w-75"
            name="estadoCivil"
            value={estadoCivil.id}
            onChange={onInputChange}
        >
            <option value="">Seleccione estado civil</option>
            {estados.map((est) => (
            <option key={est.id} value={est.id}>
                {est.nombreEstadoCivil}
            </option>
            ))}
        </select>
        <select
            className="form-control my-3 w-75"
            name="nacionalidad"
            value={nacionalidad.id}
            onChange={onInputChange}
        >
            <option value="">Seleccione Nacionalidad</option>
            {nacionalidades.map((nac) => (
            <option key={nac.id} value={nac.id}>
                {nac.nombreNacionalidad}
            </option>
            ))}
        </select>
        <input 
            className="form-control my-3 w-75"
            placeholder="dirección"
            name="direccionResidencia"
            value={direccionResidencia}
            onChange={onInputChange}
            />
        <input 
            className="form-control my-3 w-75"
            placeholder="Teléfono"
            name="telefono"
            value={telefono}
            onChange={onInputChange}
            />
        <input 
            className="form-control my-3 w-75"
            placeholder="Example@gmail.com"
            name="email"
            value={email}
            onChange={onInputChange}
            />
        <select
            className="form-control my-3 w-75"
            name="cargo"
            value={cargo.id}
            onChange={onInputChange}
        >
            <option value="">Seleccione Cargo</option>
            {cargos.map((cargo) => (
            <option key={cargo.id} value={cargo.id}>
                {cargo.nombreCargo}
            </option>
            ))}
        </select>
        <input 
            className="form-control my-3 w-75"
            placeholder="123456789012345"
            name="numCuentaBancaria"
            value={numCuentaBancaria}
            onChange={onInputChange}
        />
        <select
            className="form-control my-3 w-75"
            name="estado"
            value={estado}
            onChange={onInputChange}
        >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
        </select>
        <input 
            className="form-control my-3 w-75"
            name="idUser"
            value={idUser}
            onChange={onInputChange}
        />
        
        <input type="hidden"
            name="id"
            value={id} />
            <button
                className="btn btn-primary"
                type="submit"
            >{id>0? 'Editar' : 'crear'}
            </button>
            {!handlerCloseForm || <button
              className="btn btn-primary mx-2"
              type="button"
              onClick={onCloseForm}>
                  Cerrar
            </button>}
    </form>
  )
}
