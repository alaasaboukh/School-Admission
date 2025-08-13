import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchRecentStudents } from "@/redux/studentSlice";
import { Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const ResentStudents = () => {
    const dispatch = useAppDispatch();
    const { students, recentStudents, loading } = useAppSelector(
        (state) => state.student
    );
    useEffect(() => {
        dispatch(fetchRecentStudents());
    });
    return (
        <div className="mb-6">
            <div className="mb-6">
                <h1 className="text-[var(--color-accent2)] font-bold tracking-wide text-lg">
                    Recent Students
                </h1>
                <p className="text-[var(--color-accent1)] tracking-wide text-xs">
                    You have <strong>{students.length}</strong> students
                </p>
            </div>
            {loading ? (
                <div className="flex items-center justify-center flex-col w-full">
                    <div className="loading"></div>
                    <p className="text-gray-500 text-xs mt-2">loading Students</p>
                </div>
            ) : (
                <>
                
                    {recentStudents.map((recent) => (
                        <div
                            key={recent.id}
                            className="flex justify-between items-center mb-5"
                        >
                            <div className="flex items-center gap-3">
                                <div className=" rounded-full relative w-12 h-12">
                                    <Image
                                        src={recent.imageUrl ?? ""}
                                        fill
                                        alt=""
                                        className="cursor-pointer hover:opacity-85 transition-all duration-500 rounded-full object-cover"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h4 className="text-[var(--color-accent2)] font-semibold text-sm">
                                        {recent.name}
                                    </h4>
                                    <p className="text-[var(--color-accent1)] text-xs">
                                        Class {recent.class}
                                    </p>
                                </div>
                            </div>
                            <Link href={`/students/${recent.id}`} className="border border-gray-300  p-2 rounded-full text-[var(--color-accent1)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-500 cursor-pointer"
                    aria-label={`Send email to ${recent.name}`}
>
                        
                        <Info size={18} />
                    </Link>
                        </div>
                    ))}
                    <Link href="/students" className="block text-center bg-[var(--color-secondary)] shadow-xs hover:bg-[var(--color-accent4)] transition-all duration-500 w-full py-3 rounded-3xl text-[var(--color-accent2)] font-semibold mt-3 cursor-pointer">
                        View More
                    </Link>
                </>
            )}
        </div>
    );
};

export default ResentStudents;
