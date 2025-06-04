import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import LineChartOne from "../../components/charts/line/LineChartOne";
import PageMeta from "../../components/common/PageMeta";

export default function LineChart() {

  const getAnalitycs = async () => {
    let usuario = localStorage.getItem("usuario");

    if(usuario == null) {
      return
    }

    let id = JSON.parse(usuario).id
    let responseAsistencias = await fetch(`https://cesde-academic-analytics-production.up.railway.app/estudiantes/${id}/asistencias/one`);
    let responseCalificaciones = await fetch(`https://cesde-academic-analytics-production.up.railway.app/estudiantes/${id}/calificaciones/three`);
    let responseDocentes = await fetch(`https://cesde-academic-analytics-production.up.railway.app/docentes/${id}/notas/one`)

    try {
      let dataAsistencias = await responseAsistencias.json()
      let dataCalificaciones = await responseCalificaciones.json();
      let dataDocentes = await responseDocentes.json();
      console.log("Asistencias del usuario: ", dataAsistencias);
      console.log("Calificaciones usuario: ", dataCalificaciones)
      console.log("Promedio de notas de los estudiantes del docente: ", dataDocentes)
    } catch (error) {
      
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
