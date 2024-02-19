import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext";
import { cargosBD, estadoBD, estadoCivilBD, formatDate, generosBD, nacionalidadesBD } from "../utilities/ObjectsBD";
import { Button, Form, Input, Select } from "antd";
import './formStyles.css';

export const TrabajadorForm = ({trabajadorSelected}) => {
    const {handlerAddTrabajador, initialTrabajadorForm, errorsTrabajador}= useContext(UserContext);
    const [trabajadorForm, setTrabajadorForm] = useState(initialTrabajadorForm)
    const {id, nombres, apellidos, numIdentidad, fechaNacimiento,genero,estadoCivil, nacionalidad, direccionResidencia,telefono, email, cargo, numCuentaBancaria, estado, idUser}=trabajadorForm;
    const [nacionalidades, setNacionalidades] = useState([]);
    const [cargos, setCargos] = useState([]);
    const [estadosCiviles, setEstadoCivil] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [status, setStatus] = useState([])
    useEffect(() => {
        //formateo de bd cuando actualizamos un registro
            if (trabajadorSelected.fechaNacimiento) {
                trabajadorSelected.fechaNacimiento = formatDate(trabajadorSelected.fechaNacimiento);
            }
            setTrabajadorForm({
                ...trabajadorSelected
            });
    }, [trabajadorSelected])
    
    useEffect(() => {
        // Fetch de Nacionalidades
        setNacionalidades(nacionalidadesBD);
        // Fetch de Cargos
        setCargos(cargosBD);
        //fetch de Generos
        setEstadoCivil(estadoCivilBD);
        //fetch de generos
        setGeneros(generosBD);
        setStatus(estadoBD);
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
        handlerAddTrabajador(trabajadorForm)
    }

    return (
        <div className="App">
            <header className="App-header">
            <Form autoComplete="off" labelCol={{span:"100%"}} wrapperCol={{span: "100%"}} onSubmitCapture={onSubmit}  layout={"vertical"} style={{maxWidth: "100%"}} >
                <div className="groupInput" >
                    <Form.Item 
                    label="Nombres" 
                    rules={[
                        {
                            required:true,
                            message:errorsTrabajador?.nombres,
                        },
                        {whitespace:true},
                        ]}
                         hasFeedback 
                     >
                        <Input
                        name="nombres"  
                        placeholder="Escriba el o los nombres"
                        onChange={onInputChange} 
                        value={nombres} 
                        />
                        <p className="text-danger">{errorsTrabajador?.nombres}</p>
                    </Form.Item>
                    <Form.Item 
                    label="Apellidos"
                    rules={[
                        {
                            required:true,
                            message:errorsTrabajador?.apellidos,
                        },
                        {whitespace:true},
                        ]}
                         hasFeedback 
                     > 
                        <Input
                        name="apellidos"   
                        placeholder="Escriba los apellidos" 
                        value={apellidos}
                        onChange={onInputChange}/>
                        <p className="text-danger">{errorsTrabajador?.apellidos}</p>
                    </Form.Item>
                </div>
                <div className="groupInput">
                <Form.Item 
                
                label="Número de identidad"
                rules={[
                    {
                        required:true,
                        message:errorsTrabajador?.numIdentidad,
                    },
                    {type:Number},
                    ]}
                     hasFeedback 
                 >
                    <Input
                    name="numIdentidad" 
                    placeholder="Escriba el número de identidad" 
                    value={numIdentidad}
                    onChange={onInputChange}
                    />
                    <p className="text-danger">{errorsTrabajador?.numIdentidad}</p>
                </Form.Item>
                <Form.Item label="Fecha de Nacimiento">
                <input 
                className="form-control my-0 w-1"
                style={{height:40,}}
                name="fechaNacimiento"
                type="date"
                value={fechaNacimiento}
                onChange={onInputChange}
                />
                <p className="text-danger">{errorsTrabajador?.fechaNacimiento}</p>
                </Form.Item>
                
                </div>
                <div className="groupInput">
                <Form.Item
                label="Género"
                name="genero"
                rules={[
                    {
                        required:true,
                        message:errorsTrabajador?.genero,
                    }
                    ]}
                     hasFeedback 
                >
                    <Select 
                    value={genero.id}
                    name="genero"
                    placeholder="Seleccione género"
                    onChange={(value) => onInputChange({ target: { name: "genero", value } })}
                    >
                        {generos.map((gen) => (
                        <Select.Option key={gen.id} value={gen.id}>
                            {gen.nombreGenero}
                        </Select.Option>
                    ))}
                    </Select>        
                </Form.Item>
                <Form.Item  
                name="estadoCivil"
                label="Estado Civil"
                rules={[
                    {
                        required:true,
                        message:errorsTrabajador?.estadoCivil,
                    }
                    ]}
                     hasFeedback 
                >
                    <Select 
                    name="estadoCivil"
                    value={estadoCivil.id}
                    placeholder="Seleccione Estado C."
                    onChange={(value) => onInputChange({ target: { name: "estadoCivil", value } })}
                    >
                        {estadosCiviles.map((est) => (
                        <Select.Option key={est.id} value={est.id}>
                            {est.nombreEstadoCivil}
                        </Select.Option>
                    ))}
                    </Select>        
                </Form.Item>
                <Form.Item  
                name="nacionalidad"
                label="Nacionalidad"
                rules={[
                    {
                        required:true,
                        message:errorsTrabajador?.nacionalidad,
                    }
                    ]}
                     hasFeedback 
                >
                    <Select 
                    name="nacionalidad"
                    value={nacionalidad.id}
                    placeholder="Seleccione N."
                    onChange={(value) => onInputChange({ target: { name: "nacionalidad", value } })}
                    >
                        {nacionalidades.map((nac) => (
                        <Select.Option key={nac.id} value={nac.id}>
                            {nac.nombreNacionalidad}
                        </Select.Option>
                    ))}
                    </Select>        
                </Form.Item>
                </div>
               <div className="groupInput">
               <Form.Item  
               
               label="Dirección de residencia" 
               rules={[
                {
                    required:true,
                    message:errorsTrabajador?.direccionResidencia,
                },
                {whitespace:true},
                ]}
                 hasFeedback 
               >
                    <Input
                    name="direccionResidencia"  
                    placeholder="Escriba la dirección"
                    value={direccionResidencia}
                    onChange={onInputChange}
                    />
                    <p className="text-danger">{errorsTrabajador?.direccionResidencia}</p>
                </Form.Item>
                <Form.Item  
                
                label="Número de teléfono o celular" 
                rules={[
                    {
                        required:true,
                        message:errorsTrabajador?.telefono,
                    },
                    {whitespace:true},
                    ]}
                     hasFeedback 
                >
                    <Input
                    name="telefono"  
                    placeholder="Digite el número"
                    value={telefono}
                    onChange={onInputChange}
                    />
                    <p className="text-danger">{errorsTrabajador?.telefono}</p>
                </Form.Item>              
               </div>
                <div className="groupInput">
                <Form.Item  
                
                label="Correo electrónico"
                rules={[
                    {
                        required:true,
                        message:errorsTrabajador?.email,
                    },
                    {type:email, message:"Por favor ingrese una dirección de correo electrónico válido"},
                    ]}
                     hasFeedback
                >
                    <Input
                    name="email"  
                    placeholder="Example@gmail.com"
                    value={email}
                    onChange={onInputChange}
                    />
                    <p className="text-danger">{errorsTrabajador?.email}</p>
                </Form.Item>
                <Form.Item  
                name="cargo"
                label="Cargo"
                rules={[
                    {
                        required:true,
                        message:errorsTrabajador?.cargo,
                    }
                    ]}
                     hasFeedback 
                >
                    <Select 
                    name="cargo"
                    value={cargo.id}
                    placeholder="Seleccione el cargo"
                    onChange={(value) => onInputChange({ target: { name: "cargo", value } })}
                    >
                        {cargos.map((cargos) => (
                        <Select.Option key={cargos.id} value={cargos.id}>
                            {cargos.nombreCargo}
                        </Select.Option>
                    ))}
                    </Select>        
                </Form.Item>         
                </div>
                
                <Form.Item  
                
                label="Número de cuenta bancaria BCP o CCI"
                rules={[
                    {
                        required:true,
                        message:errorsTrabajador?.numCuentaBancaria,
                    },
                    {whitespace:true},
                    ]}
                     hasFeedback  
                >
                    <Input
                    name="numCuentaBancaria"   
                    placeholder="123456789012345"
                    value={numCuentaBancaria}
                    onChange={onInputChange}
                    />
                    <p className="text-danger">{errorsTrabajador?.numCuentaBancaria}</p>
                </Form.Item>
                <div className="groupInput">
                <Form.Item  
                name="estado" 
                label="Estado del trabajador"
                rules={[
                    {
                        required:true,
                        message:errorsTrabajador?.estado,
                    }
                    ]}
                     hasFeedback 
                >
                    <Select 
                    name="estado"
                    value={estado}
                    placeholder="Seleccione estado de trabajador"
                    onChange={(value) => onInputChange({ target: { name: "estado", value } })}
                    >
                        {status.map((status) => (
                        <Select.Option key={status.id} value={status.estado}>
                            {status.estado}
                        </Select.Option>
                    ))}
                    </Select>        
                </Form.Item>
                <Form.Item  
                
                label="ID de usuario"
                >
                    <Input
                    name="idUser"
                    value={idUser}
                    placeholder="ID usuario"
                    onChange={onInputChange}
                    />
                    <p className="text-danger">{errorsTrabajador?.idUser}</p>
                </Form.Item>         
                </div>
                
                <Form.Item wrapperCol={{span: 24}}>
                    <Button block type="primary" htmlType="submit" style={{width:300}}>
                    {id>0? 'Editar' : 'Registrar'}
                    </Button>
                </Form.Item>
            </Form>
            </header>
        </div>
    
  )
}
