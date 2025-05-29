import { useEffect, useState } from "react";
import axios from "axios";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

// Interfaces para definir el tipo de datos
interface Clase {
  docente?: string;
  modulo?: string;
  grupo?: string;
}

interface Actividad {
  id: number;
  titulo: string;
  descripcion: string;
  tipo: string;
  fechaEntrega: string;
  clase?: Clase;
}

export default function FormElements() {
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get("/api/actividad/lista")
      .then((response) => {
        setActividades(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar actividades:", error);
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-10">Cargando actividades...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        Error al cargar las actividades.
      </div>
    );
  }

  const actividadesFiltradas = actividades.filter(
    (actividad) => actividad.clase?.docente === "Luz Mary Contreras Meza"
  );

  return (
    <div>
      <PageMeta
        title="Actividades Académicas | CesdeAcademy"
        description="Lista de actividades académicas para los estudiantes"
      />
      <PageBreadcrumb pageTitle="Actividades Académicas" />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
        {actividadesFiltradas.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No hay actividades asignadas a la docente Luz Mary Contreras Meza.
          </div>
        ) : (
          actividadesFiltradas.map((actividad) => (
            <div
              key={actividad.id}
              className="border rounded-2xl shadow-md p-4 bg-white space-y-2"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {actividad.titulo}
              </h3>
              <p className="text-sm text-gray-600 whitespace-pre-line">
                {actividad.descripcion}
              </p>
              <p className="text-sm">
                <strong>Tipo:</strong> {actividad.tipo}
              </p>
              <p className="text-sm">
                <strong>Entrega:</strong> {actividad.fechaEntrega}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Docente:</strong> {actividad.clase?.docente || "-"}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Módulo:</strong> {actividad.clase?.modulo || "-"}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Grupo:</strong> {actividad.clase?.grupo || "-"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

