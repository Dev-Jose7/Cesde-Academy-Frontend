import React from "react";
import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";

export default function VistaEstudiante() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-8 xl:col-span-12 home-page">
        <div className="welcome-header mb-4">
          <i className="bi bi-mortarboard-fill"></i>
          <h2>¡Bienvenido al CESDE!</h2>
        </div>

        <div className="video-wrapper">
          <div className="ratio ratio-16x9">
            <iframe
              src="https://www.youtube.com/embed/Yj1PcEq5Oxo"
              title="Bienvenida CESDE"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="button-group">
          <button className="btn-action">
            <i className="bi bi-list-check"></i>
            Conocer tus actividades
          </button>

          <button className="btn-action faltas">
            <i className="bi bi-exclamation-triangle"></i>
            Conocer tus faltas
          </button>
        </div>

        <div className="metrics">
          <EcommerceMetrics />
        </div>
      </div>
    </div>
  );
}