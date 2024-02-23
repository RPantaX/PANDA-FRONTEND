import logo from '../../images/panda-small-icon.jpeg';
import {useEffect, useState} from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useParams } from 'react-router-dom';
import './pdfStyle.css';
import { useGuiaTransportistas } from '../hook/useGuiaTransportista';
export const GuiaPdf = () => {
    const [loader, setLoader] = useState(false);
    const{handlerGetByIdGuia, guiaByIdFirst} = useGuiaTransportistas();
    const {id} = useParams();
    
    useEffect(() => {
        if(id){
            handlerGetByIdGuia(id);
        }
    }, [id])
    const downloadPDF = () =>{
      const capture = document.querySelector('.actual-receipt');
      setLoader(true);
      html2canvas(capture).then((canvas)=>{
        const imgData = canvas.toDataURL('img/png');
        const doc = new jsPDF('p', 'mm', 'a4');
        const componentWidth = doc.internal.pageSize.getWidth();
        const componentHeight = doc.internal.pageSize.getHeight();
        doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
        setLoader(false);
        doc.save('receipt.pdf');
      })
    }
    
    return (
        <div className="wrapper">
        <div className="receipt-box">
            {/* actual receipt */}
            <div className="actual-receipt">
                {/* organization logo */}
                <div className="receipt-organization-logo">
                    <img alt="logo" src={logo} />
                </div>
                {/* organization name */}
                <h2 className="organization-name">PANDA EIRL</h2>
                {/* RUC */}
                <p className="ruc">RUC N°20602339573</p>
                {/* Guía de Remisión */}
                <h3 className="document-title">GUÍA DE REMISIÓN ELECTRÓNICA TRANSPORTISTA</h3>
                {/* Fecha de creación */}
                <div className="section">
                    <h4 className="section-title">Fecha de Creación</h4>
                    <p className="section-content">{new Date(guiaByIdFirst.fechaEmision).toLocaleString()}</p>
                </div>
                {/* Salida y Partida */}
                <div className="section">
                    <h4 className="section-title">Salida y Partida</h4>
                    <p className="section-content">Salida: {guiaByIdFirst.salida}</p>
                    <p className="section-content">Partida: {guiaByIdFirst.partida}</p>
                </div>
                {/* Fecha de inicio de traslado */}
                <div className="section">
                    <h4 className="section-title">Fecha de Inicio de Traslado</h4>
                    <p className="section-content">{new Date(guiaByIdFirst.fechaTraslado).toLocaleDateString()}</p>
                </div>
                {/* Datos del Remitente */}
                <div className="section">
                    <h4 className="section-title">Datos del Remitente</h4>
                    <p className="section-content">RUC: {guiaByIdFirst.remitenteRuc}</p>
                    <p className="section-content">Razón Social: {guiaByIdFirst.remitenteRazonSocial}</p>
                    <p className="section-content">Dirección: {guiaByIdFirst.remitenteDireccion}</p>
                </div>
                {/* Datos del Destinatario */}
                <div className="section">
                    <h4 className="section-title">Datos del Destinatario</h4>
                    <p className="section-content">RUC: {guiaByIdFirst.destinatarioRuc}</p>
                    <p className="section-content">Razón Social: {guiaByIdFirst.destinatarioRazonSocial}</p>
                    <p className="section-content">Dirección: {guiaByIdFirst.destinatarioDireccion}</p>
                </div>
                {/* Datos del Chofer */}
                <div className="section">
                    <h4 className="section-title">Datos del Chofer</h4>
                    <p className="section-content">Número de Documento: {guiaByIdFirst.numDocChofer}</p>
                    <p className="section-content">Nombre: {guiaByIdFirst.nombreChofer}</p>
                </div>
                {/* Otros Datos */}
                <div className="section">
                    <h4 className="section-title">Otros Datos</h4>
                    <p className="section-content">Placa del Vehículo: {guiaByIdFirst.placaVehiculo}</p>
                    <p className="section-content">Peso de la Carga: {guiaByIdFirst.pesoCarga} kg</p>
                </div>
                {/* RUC del Pagador del Flete */}
                <div className="section">
                    <h4 className="section-title">RUC del Pagador del Flete</h4>
                    <p className="section-content">{guiaByIdFirst.rucPagadorDelFlete}</p>
                </div>
            </div>
            {/* end of actual receipt */}
            {/* receipt action */}
            <div className="receipt-actions-div">
                <div className="actions-right">
                    <button
                        className="receipt-modal-download-button"
                        onClick={downloadPDF}
                        disabled={loader}
                    >
                        {loader ? "Downloading" : "Download"}
                    </button>
                </div>
            </div>
        </div>
    </div>
    );
}
