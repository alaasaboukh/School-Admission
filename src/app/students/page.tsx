import CreateStudentForm from "@/components/CreateStudentForm";
import StudentList from "@/components/StudentList";
import TopComponent from "@/components/TopComponent";

const Page = () => {
    return (
        <div className="bg-[var(--color-secondary)] p-6 w-full">
            {/* <CreateStudentForm /> */}
            <TopComponent text="Students" />
            <StudentList />
        </div>
    );
};

export default Page;