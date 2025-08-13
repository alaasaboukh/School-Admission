// app/student/[id]/page.tsx   ← لو تستخدم App Router
// أو pages/student/[id].tsx   ← لو تستخدم Pages Router

"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation"; // أو useRouter في Pages Router
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import Image from "next/image";
import TopComponent from "@/components/TopComponent";
import { Mail, MapPin, Phone, TrendingUp, User2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { fetchStudents, Student } from "@/redux/studentSlice";
import Pagination from "@/components/Pagination";


const StudentDetails = () => {
    const { id } = useParams();
    const [student, setStudent] = useState<Student | null>(null);
    const dispatch = useAppDispatch()
    const perpage = 6
    const [currentpage, setcurrentpage] = useState(1)
    const { students: allStudents, loading } = useAppSelector((state: RootState) => state.student)

    useEffect(() => {
        const fetchStudent = async () => {
            const docRef = doc(db, "students", id as string);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setStudent({
                    id: docSnap.id, ...docSnap.data() as Student});
            }
        };

        if (id) fetchStudent();
    }, [id]);

    const students = allStudents.slice(0, 21);
        useEffect(() => {
            dispatch(fetchStudents())
        }, [dispatch])
    
    
        const totalPage = Math.ceil(students.length / perpage);
    
        const currentStudent = useMemo(() => {
            return students.slice(
                (currentpage - 1) * perpage,
                currentpage * perpage
            );
        }, [students, currentpage, perpage])

    if (!student)
        return (
            <div className="flex items-center justify-center flex-col h-screen w-[950px]">
                <div className="loading"></div>
                <p className="text-gray-500 text-sm mt-2">loading Student Details</p>
            </div>
        );

    return (
        <div className="bg-[var(--color-secondary)] p-6 sm:p-6 w-full mx-auto">
            <TopComponent text={"Student Details"} />

                <div className="bg-[var(--color-primary)] relative px-7 py-12 sm:px-7 sm:py-14 rounded-t-lg">
                    <div className="bg-[var(--color-yellow)] w-50 h-45 rounded-lg absolute right-10 max-md:right-5 top-5 z-10 max-md:w-30 max-md:h-30"></div>
                    <div className="bg-[var(--color-orange)] w-50 h-45 rounded-lg absolute right-37 max-md:right-28 top-14 z-5 max-md:w-30 max-md:h-30"></div>

                    <div className="border-4 border-[var(--color-accent4)] w-30 h-30  max-md:w-24 max-md:h-24 rounded-full absolute top-8 max-md:top-10 left-7 z-50 bg-[var(--color-secondary)]">
                        {student.imageUrl && (
                            <Image
                                src={student.imageUrl}
                                alt={student.name}
                                fill
                                className="rounded-full object-cover"
                            />
                        )}
                    </div>
                </div>

            <div className="bg-[var(--bg-background)] p-7 sm:p-7 rounded-b-lg relative z-40">
                <h2 className="mb-2 text-[var(--color-accent2)] text-2xl font-bold mt-10">
                    {student.name}
                </h2>
                <p className="text-xs text-[var(--color-accent1)] font-bold">Student</p>
                <div className="flex flex-wrap items-center gap-5 justify-between mt-7">
                    <div>
                        <p className="text-sm text-[var(--color-accent1)]">Parents:</p>
                        <div className="flex items-center gap-3 mt-2">
                            <span className="bg-[var(--color-orange)] p-1.5 rounded-full text-white">
                                <User2 size={19} />
                            </span>
                            <h3 className="text-[var(--color-accent2)] font-bold">
                                {student.parentName}
                            </h3>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-[var(--color-accent1)]">Address:</p>
                        <div className="flex items-center gap-3 mt-2">
                            <span className="bg-[var(--color-orange)] p-1.5 rounded-full text-white">
                                <MapPin size={19} />
                            </span>
                            <h3 className="text-[var(--color-accent2)] font-bold">
                                {student.city}
                            </h3>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-[var(--color-accent1)]">Phone:</p>
                        <div className="flex items-center gap-3 mt-2">
                            <span className="bg-[var(--color-orange)] p-1.5 rounded-full text-white">
                                <Phone size={19} />
                            </span>
                            <h3 className="text-[var(--color-accent2)] font-bold">
                                {student.phone}
                            </h3>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-[var(--color-accent1)]">Email:</p>
                        <div className="flex items-center gap-3 mt-2">
                            <span className="bg-[var(--color-orange)] p-1.5 rounded-full text-white">
                                <Mail size={19} />
                            </span>
                            <h3 className="text-[var(--color-accent2)] font-bold">
                                {student.email}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
            


            <div>
                {
                loading ? (
                    <div className="flex items-center justify-center flex-col h-full">
                        <div className="loading"></div>
                        <p className="text-gray-500 text-sm mt-2">loading Student</p>
                    </div>
                ) : (
                    <div className=" p-5 bg-[var(--bg-background)] rounded-lg mt-7 ">
                        <h1 className="font-bold text-lg text-[var(--color-accent2)]">
                            Student Expense
                        </h1>

                        {currentStudent.slice(0, 10).map((student) => (
                            <div className="grid grid-cols-1 sm:grid-cols-[2.5fr_2fr_1.5fr_1fr] gap-5 p-3 items-center mt-5 sm:mt-7 rounded-lg max-md:shadow-sm" key={student.id}>

                                <div className=" flex items-center gap-4 ">
                                    <span className="bg-[var(--color-red)] rounded-full p-3 text-white ">
                                        <TrendingUp size={22} />
                                    </span>
                                    <div className='flex flex-col gap-1'>
                                        <span className='text-sm text-[var(--color-accent2)] font-bold'>
                                            {student.name}
                                        </span>
                                        <span className='text-sm text-[var(--color-accent1)]'>
                                            {student.city}
                                        </span>
                                    </div>

                                </div>
                                <div className="text-sm text-[var(--color-accent2)] font-bold">{student.date}</div>
                                <div className='text-sm text-[var(--color-accent2)] font-bold'>${student.price}</div>
                                <div>
                                    {
                                        student.feeStatus === "Paid" ? (
                                            <span className='text-sm font-semibold text-[var(--color-green)]'>complete</span>
                                        ) : (
                                            <span className='text-sm font-semibold text-[var(--color-red)]'>canceled</span>
                                        )

                                    }
                                </div>
                            </div>
                        ))}

                        <Pagination currentPage={currentpage} setCurrentPage={setcurrentpage} totalPage={totalPage} data={students.length} />
                    </div>
                )
            }
            </div>
        </div>
    );
};

export default StudentDetails;
