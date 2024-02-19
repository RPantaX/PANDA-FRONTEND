export const nacionalidadesBD=[
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
export const cargosBD=[
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
export const generosBD=[
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
export const estadoCivilBD=[
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
export const estadoBD=[
    {
        id:1,
        estado:'activo'
    },
    {
        id:2,
        estado:'inactivo'
    }
]
export const tipoLicenciaBD=[
    {
        id:1,
        tipoLicencia:'A3',
    },
    {
        id:2,
        tipoLicencia:'A4',
    },
    {
        id:3,
        tipoLicencia:'A5',
    },
    {
        id:4,
        tipoLicencia:'B1',
    },
    {
        id:5,
        tipoLicencia:'B2',
    },
    {
        id:6,
        tipoLicencia:'B3',
    },
    {
        id:7,
        tipoLicencia:'B4',
    },
    {
        id:8,
        tipoLicencia:'C1',
    },
    {
        id:9,
        tipoLicencia:'C2',
    },
    {
        id:10,
        tipoLicencia:'C3',
    },
    {
        id:11,
        tipoLicencia:'C4',
    },
    {
        id:12,
        tipoLicencia:'D1',
    },
    {
        id:13,
        tipoLicencia:'D2',
    },
    {
        id:14,
        tipoLicencia:'D3',
    },
    {
        id:15,
        tipoLicencia:'D4',
    },
]
// Función para formatear la fecha a YYYY-MM-DD
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }