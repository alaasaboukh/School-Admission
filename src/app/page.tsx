"use client";

import ChatSidebar from "@/components/ChatSidebar";
import CurrentFoodMenu from "@/components/CurrentFoodMenu";
import DashboardCharts from "@/components/DashboardCharts";
import DetailsDashboard from "@/components/DetailsDashboard";
import ResentStudents from "@/components/ResentStudents";
import TopComponent from "@/components/TopComponent";
import UnPaidStudent from "@/components/UnPaidStudent";

export default function Home() {
  return (
    <div className="bg-[var(--color-secondary)] w-[100vw] p-6">
        <TopComponent text="Dashboard" />
        <div className="flex gap-6 max-lg:flex-col ">
          <div className="flex-3 w-full">
            <DetailsDashboard />
            <DashboardCharts />
            <UnPaidStudent />
          </div>
          <div className="bg-[var(--bg-background)] w-full p-6 flex-1 rounded-lg">
            <ResentStudents />
            <ChatSidebar />
            <CurrentFoodMenu />
          </div>
        </div>
    </div>
  );
}
