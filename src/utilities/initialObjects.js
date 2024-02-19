export const globalinitialObjects = {
    contenido: [],
    numeroPagina: 0,
    medidaPagina: 0,
    totalElementos: 0,
    totalPaginas: 0,
    ultima: true
  };

export  const initialTrabajadorForm = {
          id: 0,
          nombres: '',
          apellidos: '',
          numIdentidad: '',
          fechaNacimiento: '',
          genero: {
              id: 0
          },
          estadoCivil: {
              id: 0
          },
          nacionalidad: {
              id: 0
          },
          direccionResidencia: '',
          telefono: '',
          email: '',
          cargo: {
              id: 0
          },
          fechaIngreso: '',
          numCuentaBancaria: '',
          estado:'',
          idUser:0
  }
export  const initialErrorsTrabajador = {
    id: '',
    nombres: '',
    apellidos: '',
    numIdentidad: '',
    fechaNacimiento: '',
    genero: '',
    estadoCivil: '',
    nacionalidad: '',
    direccionResidencia: '',
    telefono: '',
    email: '',
    cargo: '',
    fechaIngreso: '',
    numCuentaBancaria: '',
    estado:''
  }
  export  const initialConductorForm = {
    id: 0,
    trabajador: {
        id:0
    },
    tipoLicencia:{
        id:0
    },
    camion: {
        id:0
    },
    certConducirCamion: false,
    certPsicofisico: false,
    certMecanicaBasica: false,
    certPrimerosAuxilios: false,
    certSeguridadVial: false,
}
export  const initialErrorsConductor = {
    id: '',
    trabajador: '',
    tipoLicencia: '',
    camion: '',
    certConducirCamion: '',
    certPsicofisico: '',
    certMecanicaBasica: '',
    certPrimerosAuxilios: '',
    certSeguridadVial: '',
  }
export const initialCamionForm ={
    id:0,
    marca: '',
    modelo: '',
    anoFabricacion: 0,
    placa: '',
    carreta:{
        id:0
    },
}
export  const initialErrorsCamion = {
    id:'',
    marca: '',
    modelo: '',
    anoFabricacion: '',
    placa: '',
    carreta:''
  }
  export const initialCarretaForm ={
    id:0,
    marca: '',
    capacidadCarga: 0,
    placa: '',
    anoFabricacion:0
}
export  const initialErrorsCarreta = {
    id:'',
    marca: '',
    capacidadCarga: '',
    placa: '',
    anoFabricacion:''
  }
export const UserinitialObject=[]

export const initialUserForm={
    id:0,
    numIdentidad:'',
    nombres: '',
    apellidos: '',
    username:'',
    email:'',
    telefono:'',
    password:'',
    admin:false
}
export const initialErrorsUser={
    numIdentidad:'',
    nombres: '',
    apellidos: '',
    username:'',
    email:'',
    telefono:'',
    password:'',
    admin:''
}