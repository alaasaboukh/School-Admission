"use client";

import StudentList from "@/components/Students/StudentList";
import TopComponent from "@/components/Nested/TopComponent";

const Page = () => {
    return (
        <div className="bg-[var(--color-secondary)] p-6 w-full min-h-screen">
            <TopComponent text="Students" />
            <StudentList />
        </div>
    );
};

export default Page;
