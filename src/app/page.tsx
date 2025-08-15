"use client";

import ChatSidebar from "@/components/Chats/ChatSidebar";
import CurrentFoodMenu from "@/components/Foods/CurrentFoodMenu";
import DashboardCharts from "@/components/AllCharts/DashboardCharts";
import DetailsDashboard from "@/components/Details/DetailsDashboard";
import ResentStudents from "@/components/Students/ResentStudents";
import TopComponent from "@/components/Nested/TopComponent";
import UnPaidStudent from "@/components/Students/UnPaidStudent";

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
