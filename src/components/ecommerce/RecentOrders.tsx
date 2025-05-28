import { ReactNode } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import {
  Code2,
  Paintbrush2,
  ChefHat,
  Leaf,
  Briefcase,
  Stethoscope,
} from "lucide-react";

type BadgeColor =
  | "dark";

type Category = "Tecnología" | "Arte" | "Salud" | "gray" | "Servicio";

interface School {
  id: number;
  name: string;
  programs: string[];
  category: Category;
  icon: ReactNode;
}

const getBadgeColor = (_category: Category): BadgeColor => {
  return "dark"; 
};

const schoolData: School[] = [
  {
    id: 1,
    name: "Escuela de Nuevas Tecnologías",
    category: "Tecnología",
    programs: [
      "Asistente en Desarrollo de Software",
      "Electromecánica",
      "Soporte de Sistemas Informáticos",
      "Instalador de Redes de Energía Eléctrica y Solar",
      "Mantenimiento, Reparación e Instalación de Electrodomésticos",
    ],
    icon: <Code2 className="h-6 w-6 text-green-600" />,
  },
  {
    id: 2,
    name: "Escuela de Industrias Creativas",
    category: "Arte",
    programs: [
      "Animación 3D/VFX",
      "Desarrollo de Videojuegos",
      "Diseño de Modas",
      "Diseño Gráfico",
      "Producción Audiovisual",
      "Publicación de Contenidos Digitales",
      "Producción Fotográfica",
      "Operación de Eventos",
    ],
    icon: <Paintbrush2 className="h-6 w-6 text-yellow-500" />,
  },
  {
    id: 3,
    name: "Escuela de Gastronomía y Turismo",
    category: "Servicio",
    programs: [
      "Arte Culinario",
      "Operación de Servicios Hoteleros",
      "Pastelería y Arte Dulce",
      "Servicios de Alimentos y Bebidas",
    ],
    icon: <ChefHat className="h-6 w-6 text-red-500" />,
  },
  {
    id: 4,
    name: "Escuela del Agro",
    category: "gray",
    programs: ["Producción Agrícola"],
    icon: <Leaf className="h-6 w-6 text-green-700" />,
  },
  {
    id: 5,
    name: "Escuela de Desarrollo Empresarial",
    category: "gray",
    programs: [
      "Asistente Administrativo",
      "Asistente Contable",
      "Asistente en Recursos Humanos y Riesgo Laboral",
      "Asistente en Sistemas",
      "Producción de Fotografía Digital",
      "Auxiliar en Mercadeo",
      "Auxiliar en Logística de Centros de Distribución",
    ],
    icon: <Briefcase className="h-6 w-6 text-blue-600" />,
  },
  {
    id: 6,
    name: "Escuela de Salud y Cuidado",
    category: "Salud",
    programs: [
      "Auxiliar Administrativo en Salud",
      "Auxiliar en Servicios Farmacéuticos",
      "Atención Integral a la Primera Infancia",
      "Auxiliar en Enfermería",
      "Atención y Cuidado a Personas Mayores",
    ],
    icon: <Stethoscope className="h-6 w-6 text-rose-600" />,
  },
];

export default function RecentOrders() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Escuelas y Programas Técnicos del CESDE
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          El CESDE organiza su oferta educativa en seis escuelas principales, cada una enfocada en áreas estratégicas del conocimiento.
        </p>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-start text-gray-500 text-theme-xs dark:text-gray-400"
              >
                Escuela
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-start text-gray-500 text-theme-xs dark:text-gray-400"
              >
                Programas Técnicos
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-start text-gray-500 text-theme-xs dark:text-gray-400"
              >
                Categoría
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-start text-gray-500 text-theme-xs dark:text-gray-400"
              >
                Sitio Web
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {schoolData.map((school) => (
              <TableRow key={school.id}>
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                      {school.icon}
                    </div>
                    <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {school.name}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <ul className="list-disc list-inside">
                    {school.programs.map((program, index) => (
                      <li key={index}>{program}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell className="py-3">
                  <Badge size="sm" color={getBadgeColor(school.category)}>
                    {school.category === "gray" ? "Otros" : school.category}
                  </Badge>
                </TableCell>
                <TableCell className="py-3">
                  <a
                    href="https://cesde.edu.co"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 font-medium underline text-theme-sm"
                  >
                    cesde.edu.co
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

