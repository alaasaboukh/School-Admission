"use client";

import CreateTeatcherForm from "@/components/CreateTeatcherForm";
import TeachersList from "@/components/TeacherList";
import TopComponent from "@/components/TopComponent";

export default function TeachersListPage() {
    return (
        <div className="bg-[var(--color-secondary)] p-6 w-full">
            {/* <CreateTeatcherForm /> */}
            <TopComponent text={"All Teachers"} />
            <TeachersList />
        </div>
    );
}
