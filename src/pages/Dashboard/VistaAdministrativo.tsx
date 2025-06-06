import React from "react";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import RecentOrders from "../../components/ecommerce/RecentOrders";

export default function VistaAdministrativo() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        <StatisticsChart />
      </div>
      <div className="col-span-12">
        <RecentOrders />
      </div>
      <p className="col-span-12 text-lg">Vista para administrativos - control y seguimiento</p>
    </div>
  );
}