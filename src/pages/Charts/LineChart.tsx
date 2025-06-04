import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import LineChartOne from "../../components/charts/line/LineChartOne";
import PageMeta from "../../components/common/PageMeta";
import { fetchAuth } from "../../utils/fetchAuth";

export default function LineChart() {

  const getAnalitycs = async () => {
    let usuario = localStorage.getItem("usuario");

    if(usuario == null) {
      return
    }

    let id = JSON.parse(usuario).id
    let tipo = JSON.parse(usuario).tipo;

    switch (tipo){
      case "ESTUDIANTE":
        let responseAsistencias = await fetchAuth(`api/estudiantes/${id}/asistencias/one/${tipo}`, {method:"GET"});
        let responseCalificaciones = await fetchAuth(`api/estudiantes/${id}/calificaciones/three/${tipo}`, {method:"GET"});
    
        try {
          let dataAsistencias = await responseAsistencias.json()
          let dataCalificaciones = await responseCalificaciones.json();
          console.log("Asistencias del usuario: ", dataAsistencias);
          console.log("Calificaciones usuario: ", dataCalificaciones);
        } catch (error) {
          
        }

      case "DOCENTE":
        let responseDocentes = await fetchAuth(`api/docentes/${id}/notas/one/${tipo}`, {method:"GET"})
        try {
          let dataDocentes = await responseDocentes.json();
          console.log("Promedio de notas de los estudiantes del docente: ", dataDocentes)
        } catch (error) {
          
        }
    }
  }

  getAnalitycs();

  return (
    <>
      <PageMeta
        title="React.js Chart Dashboard | CesdeAcademic - React.js Admin Dashboard Template"
        description="This is React.js Chart Dashboard page for CesdeAcademic - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Line Chart" />
      <div className="space-y-6">
        <ComponentCard title="Line Chart 1">
          <LineChartOne />
        </ComponentCard>
      </div>
    </>
  );
}
