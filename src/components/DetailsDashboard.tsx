import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { fetchteachers } from "@/redux/teatcherSlice";
import { Calendar, UserRound, Users, UtensilsCrossed } from "lucide-react";
import { useEffect } from "react";

const DetailsDashboard = () => {
    const { students, teachers, foods } = useAppSelector((state: RootState) => ({
        students: state.student.students.length,
        teachers: state.teacher.teachers.length,
        foods: state.food.Foods.length,
    }));

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!teachers) {
            dispatch(fetchteachers());
        }
    }, [dispatch, teachers]);

    return (
        <div className="bg-[var(--bg-background)] p-5 mb-6 flex items-center justify-around flex-wrap max-md:gap-5 rounded-lg">
            <div className="flex items-center gap-5 max-md:flex-1">
                <span className="bg-[var(--color-primary)] rounded-full p-3 text-white ">
                    <Users />
                </span>
                <div className="flex flex-col gap-1">
                    <span className="text-[var(--color-accent1)] text-sm">Students</span>
                    <span
                        className="text-[var(--color-accent2)] font-bold text-2xl"
                        aria-label={`${students} students`}
                    >
                        {students}
                    </span>
                </div>
            </div>
            <div className="flex items-center gap-5 max-md:flex-1">
                <span className="bg-[var(--color-orange)] rounded-full p-3 text-white ">
                    <UserRound />
                </span>
                <div className="flex flex-col gap-1">
                    <span className="text-[var(--color-accent1)] text-sm">Teachers</span>
                    <span
                        className="text-[var(--color-accent2)] font-bold text-2xl"
                        aria-label={`${teachers} teachers`}
                    >
                        {teachers}
                    </span>
                </div>
            </div>
            <div className="flex items-center gap-5 max-md:flex-1">
                <span className="bg-[var(--color-yellow)] rounded-full p-3 text-white ">
                    <Calendar />
                </span>
                <div className="flex flex-col gap-1">
                    <span className="text-[var(--color-accent1)] text-sm">Events</span>
                    <span
                        className="text-[var(--color-accent2)] font-bold text-2xl"
                        aria-label="50 events"
                    >
                        50
                    </span>
                </div>
            </div>
            <div className="flex items-center gap-5 max-md:flex-1">
                <span className="bg-[var(--color-red)] rounded-full p-3 text-white ">
                    <UtensilsCrossed />
                </span>
                <div className="flex flex-col gap-1">
                    <span className="text-[var(--color-accent1)] text-sm">Foods</span>
                    <span
                        className="text-[var(--color-accent2)] font-bold text-2xl"
                        aria-label={`${foods} foods`}
                    >
                        {foods}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default DetailsDashboard;
