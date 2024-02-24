import logo from "../../images/panda-small-icon.jpeg";
import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useParams } from "react-router-dom";
import "./pdfStyle.css";
import { useGuiaTransportistas } from "../hook/useGuiaTransportista";
export const GuiaPdf = () => {
  const [loader, setLoader] = useState(false);
  const { handlerGetByIdGuia, guiaByIdFirst } = useGuiaTransportistas();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      handlerGetByIdGuia(id);
    }
  }, [id]);
  const downloadPDF = () => {
    const capture = document.querySelector(".containerPdf");
    setLoader(true);
    html2canvas(capture, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const doc = new jsPDF("p", "mm", "a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "JPEG", 0, 0, componentWidth, componentHeight);
      setLoader(false);
      doc.save("receipt.pdf");
    });
  };

  return (
    <div className="wrapper">
      <div className="containerPdf">
        <div className="card my-0" >
          <div
            className="card-header"
            style={{ backgroundColor: "#001529", color: "#fff" }}
          >
            <h2 className="text-center mb-1 p-1" style={{ fontSize: "24px" }}>
              Guía de Remisión Electrónica Transportista
            </h2>
          </div>
          <div
            className="card-body"
            style={{
              backgroundColor: "#001529",
              color: "#fff",
              alignItems: "center",
            }}
          >
            <div className="row" style={{ alignItems: "center" }}>
              <div className="col-md-6" style={{ textAlign: "center" }}>
                <img src={logo} alt="" style={{ width: "150px", height:"110px"}} />
              </div>
              <div
                className="col-md-6"
                style={{ textAlign: "center", alignItems: "center" }}
              >
                <div className="d-flex flex-column">
                  <p className="mb-0" style={{ fontSize: "22px" }}>
                    PANDA EIRL
                  </p>
                  <p className="mb-0" style={{ fontSize: "15px" }}>
                    2060384724
                  </p>
                  <p className="mb-0" style={{ fontSize: "13px" }}>
                    AV MORALES DUAREZ MZ A LT
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row my-3">
              <div className="col">
                <h4 className="section-title">Fecha de Emisión</h4>
                <p className="section-content">
                  {new Date(guiaByIdFirst.fechaEmision).toLocaleString()}
                </p>
              </div>

              <div className="col">
                <h4 className="section-title" style={{ textAlign: "left" }}>
                  Salida y Llegada
                </h4>
                <p className="section-content" style={{ textAlign: "left" }}>
                  Punto de Salida: {guiaByIdFirst.partida}
                </p>
                <p className="section-content" style={{ textAlign: "left" }}>
                  Punto de Llegada: {guiaByIdFirst.llegada}
                </p>
              </div>
            </div>
            <div className="row my-3">
              <div className="col" >
                <h4 className="section-title">Datos del Remitente</h4>
                <p className="section-content">
                  RUC: {guiaByIdFirst.remitenteRuc}
                </p>
                <p className="section-content">
                  Razón Social: {guiaByIdFirst.remitenteRazonSocial}
                </p>
                <p className="section-content">
                  Dirección: {guiaByIdFirst.remitenteDireccion}
                </p>
              </div>
              <div className="col" >
                <h4 className="section-title" style={{ textAlign: "left" }}>Datos del Destinatario</h4>
                <p className="section-content" style={{ textAlign: "left" }}>
                  RUC: {guiaByIdFirst.destinatarioRuc}
                </p>
                <p className="section-content">
                  Razón Social: {guiaByIdFirst.destinatarioRazonSocial}
                </p>
                <p className="section-content">
                  Dirección: {guiaByIdFirst.destinatarioDireccion}
                </p>
              </div>
            </div>
            <div className="row my-3">
              <div className="col">
                <h4 className="section-title">Datos del Chofer</h4>
                <p className="section-content">
                  Número de Documento: {guiaByIdFirst.numDocChofer}
                </p>
                <p className="section-content">
                  Nombre: {guiaByIdFirst.nombreChofer}
                </p>
              </div>
              <div className="col">
                <h4 className="section-title">Otros Datos</h4>
                <p className="section-content">
                  Placa del Vehículo: {guiaByIdFirst.placaVehiculo}
                </p>
                <p className="section-content">
                  Peso de la Carga: {guiaByIdFirst.pesoCarga} kg
                </p>
              </div>
            </div>
            <div className="row my-3">
              <div className="col">
                <h4 className="section-title" style={{ textAlign: "left" }}>
                  RUC del Pagador del Flete
                </h4>
                <p className="section-content" style={{ textAlign: "left" }}>
                  {guiaByIdFirst.rucPagadorDelFlete}
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div className="receipt-actions-div">
          <div className="actions-right">
            <button
              className="receipt-modal-download-button"
              onClick={downloadPDF}
              disabled={loader}
            >
              {loader ? "Descargando" : "Descargar"}
            </button>
          </div>
        </div>
    </div>
  );
};
