"use client";

import TeachersList from "@/components/Teachers/TeacherList";
import TopComponent from "@/components/Nested/TopComponent";

export default function TeachersListPage() {
    return (
        <div className="bg-[var(--color-secondary)] p-6 w-full min-h-screen">
            <TopComponent text={"All Teachers"} />
            <TeachersList />
        </div>
    );
}
