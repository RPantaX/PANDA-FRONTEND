import { useEffect, useState } from "react"
import { tipoLicenciaBD } from "../utilities/ObjectsBD";
import { useConductores } from "./hook/useConductores";

export const ConductorForm = ({conductorSelected, handlerCloseFormConductor}) => {
    const {handlerAddConductor, initialConductorForm, errorsConductor}= useConductores();
    const [conductorForm, setConductorForm] = useState(initialConductorForm)
    const {id, trabajador, tipoLicencia, camion, certConducirCamion, certPsicofisico, certMecanicaBasica, certPrimerosAuxilios, certSeguridadVial}=conductorForm;
    const [licencias, setLicencias] = useState([]);
    useEffect(() => {
        setConductorForm({
                ...conductorSelected
            });
    }, [conductorSelected])
    
    useEffect(() => {
        setLicencias(tipoLicenciaBD);
      }, []);

    const onInputChange = ({target})=>{
        const{name, value} = target;
        setConductorForm({
            ...conductorForm,
            [name]: value
        })
    }
    const onSubmit=(event)=>{
        event.preventDefault() //previene que se refresque la página
        handlerAddConductor(conductorForm)
    }
    const onCloseForm=()=>{
        handlerCloseFormConductor();
        setConductorForm(initialConductorForm);
    }
    return (
    <form onSubmit={onSubmit} style={{ margin: "auto", textAlign: "center" }}>
        <label >ID trabajador</label>
        <input 
            className="form-control my-3 w-75"
            placeholder="ID trabajador"
            name="trabajador"
            value={trabajador.id}
            onChange={onInputChange}
            />
        <p className="text-danger">{errorsConductor?.trabajador}</p>
        
        <select
            className="form-control my-3 w-75"
            name="tipoLicencia"
            value={tipoLicencia.id}
            onChange={onInputChange}
        >
            <option value="">Seleccione Licencia</option>
            {licencias.map((l) => (
            <option key={l.id} value={l.id}>
                {l.tipoLicencia}
            </option>
            ))}
        </select>
        <p className="text-danger">{errorsConductor?.tipoLicencia}</p>
        <label >ID Camión</label>
        <input 
            className="form-control my-3 w-75"
            placeholder="ID Camion"
            name="camion"
            value={camion.id}
            onChange={onInputChange}
            />
        <p className="text-danger">{errorsConductor?.camion}</p>
        <select
            className="form-control my-3 w-75"
            name="certConducirCamion"
            value={certConducirCamion}
            onChange={onInputChange}
        >
            <option value="">Certificado Conducir Camión</option>
            <option key={1} value={true}>activo</option>
            <option key={2} value={false}>inactivo</option>
        </select>
        <p className="text-danger">{errorsConductor?.certConducirCamion}</p>
        <select
            className="form-control my-3 w-75"
            name="certPsicofisico"
            value={certPsicofisico}
            onChange={onInputChange}
        >
            <option value="">Certificado Psicofisico</option>
            <option key={1} value={true}>activo</option>
            <option key={2} value={false}>inactivo</option>
        </select>
        <p className="text-danger">{errorsConductor?.certPsicofisico}</p>
        <select
            className="form-control my-3 w-75"
            name="certMecanicaBasica"
            value={certMecanicaBasica}
            onChange={onInputChange}
        >
            <option value="">Certificado Mecánica Básica</option>
            <option key={1} value={true}>activo</option>
            <option key={2} value={false}>inactivo</option>
        </select>
        <p className="text-danger">{errorsConductor?.certMecanicaBasica}</p>
        <select
            className="form-control my-3 w-75"
            name="certPrimerosAuxilios"
            value={certPrimerosAuxilios}
            onChange={onInputChange}
        >
            <option value="">Certificado Primeros Auxilios</option>
            <option key={1} value={true}>activo</option>
            <option key={2} value={false}>inactivo</option>
        </select>
        <p className="text-danger">{errorsConductor?.certPrimerosAuxilios}</p>
        <select
            className="form-control my-3 w-75"
            name="certSeguridadVial"
            value={certSeguridadVial}
            onChange={onInputChange}
        >
            <option value="">Certificado Seguridad Vial</option>
            <option key={1} value={true}>activo</option>
            <option key={2} value={false}>inactivo</option>
        </select>
        <p className="text-danger">{errorsConductor?.certSeguridadVial}</p>
        <input type="hidden"
            name="id"
            value={id} />
            <button
                className="btn btn-primary my-1 mx-1"
                type="submit"
            >{id>0? 'Editar' : 'crear'}
            </button>
            {!handlerCloseFormConductor || <button
              className="btn btn-danger my-1 mx-1"
              type="button"
              onClick={onCloseForm}>
                  Cerrar
            </button>}
    </form>
  )
}