import { CalendarCheck, DollarSign, User2 } from "lucide-react";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getDashboardStats } from "../lib/api";
import Loading from "../components/Loading";



const Dashboard = () => {
  const { data: stats, isLoading, isError } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
});

  if (isLoading) return <div className=""><Loading/></div>;
  if (isError) return <p className="text-center mt-10 text-red-500">Error loading dashboard.</p>;

  return (
    <div className="h-full overflow-y-scroll p-6">
      <div className="flex justify-start gap-4 flex-wrap">
        {/* Bookings */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
          <div className="text-slate-600">
            <p className="text-sm">Total Appointments</p>
            <h2 className="text-xl font-semibold">{stats.totalAppointments}</h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-primary text-white flex justify-center items-center">
            <CalendarCheck className="w-5 text-white" />
          </div>
        </div>

        {/* Clients */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
          <div className="text-slate-600">
            <p className="text-sm">Clients</p>
            <h2 className="text-xl font-semibold">{stats.totalClients}</h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-primary text-white flex justify-center items-center">
            <User2 className="w-5 text-white" />
          </div>
        </div>

        {/* Revenue */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
          <div className="text-slate-600">
            <p className="text-sm">Total Revenue</p>
            <h2 className="text-xl font-semibold">₦{stats.totalRevenue.toLocaleString()}</h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-primary text-white flex justify-center items-center">
            <DollarSign className="w-5 text-white" />
          </div>
        </div>
      </div>

      <p className="mt-8 text-gray-700">Hello Marizu</p>
    </div>
  );
};

export default Dashboard;
