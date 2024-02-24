import { TrabajadorList } from "../components/trabajadores/TrabajadorList";
import { Button } from "antd";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { generatePdf } from "../services/trabajadorService";

export const TrabajadoresPages = () => {
  const [loader, setLoader] = useState(false);

  const downloadPDF = async () => {
    try {
        setLoader(true);
        const pdfData = await generatePdf(); // Obtenemos los datos binarios del PDF
        setLoader(false);

        // Creamos un objeto URL para el blob de datos binarios
        const blobUrl = URL.createObjectURL(pdfData);

        // Creamos un enlace y lo hacemos clic para iniciar la descarga
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'reporte_trabajadores.pdf';
        link.click();

        // Liberamos el objeto URL una vez que se haya iniciado la descarga
        URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.error('Error al descargar el PDF:', error);
        setLoader(false);
        // Manejar el error según sea necesario
    }
};
  
    return (
    <>
      <div className="container my-4">
          <h2 style={{ textAlign:"center"}}>Registro de Trabajadores</h2>
          <div className="row">

              <div className="col"><NavLink to="/trabajadores/register"><Button style={{ marginBottom:10}}>
                  Crear Trabajador</Button>
                  </NavLink>
                 <Button onClick={downloadPDF} disabled={loader} style={{ margin: 10, background: "red", color: "white" }}>
                {loader ? 'Descargando...' : 'Descargar reporte de trabajadores'}
                </Button>
                {
                    <TrabajadorList />
                }
                  
              </div>
          </div>
      </div>
    </>
  );
}