import React from "react";

const escuelas = [
  "Escuela de Nuevas Tecnologías",
  "Escuela de Industrias Creativas",
  "Escuela de Gastronomía y Turismo",
  "Escuela del Agro",
  "Escuela de Desarrollo Empresarial",
  "Escuela de Salud y Cuidado",
];

const CountryMap: React.FC = () => {
  return (
    <div style={{ fontSize: "0.90rem", padding: 8, maxWidth: "100%", height: 200, overflowY: "auto" }}>
      <h4 style={{ marginBottom: 8, fontWeight: "bold", color: "#ec008c", textAlign: "center" }}>
        Escuelas CESDE
      </h4>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {escuelas.map((escuela, i) => (
          <li
            key={i}
            style={{
              padding: "4px 6px",
              borderBottom: "1px solid #f0f0f0",
              color: "#333",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            title={escuela}
          >
            {escuela}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryMap;



