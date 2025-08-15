"use client";
import { useEffect, useMemo, useState } from "react";
import { Edit2, Mail, Phone, Trash2 } from "lucide-react";
import Pagination from "@/components/Nested/Pagination";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { deleteteacher, fetchteachers, Teacher } from "@/redux/teatcherSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import TeacherModal from "./TeacherModal";

const perPage = 12;

export default function TeachersList() {
    const { teachers, loading } = useAppSelector(
        (state: RootState) => state.teacher
    );
    const [currentPage, setCurrentPage] = useState(1);
    const [editingteacher, setEditingteacher] = useState<Teacher | null>(null);
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(
        (state: RootState) => state.auth.currentUser
    );
    const adminEmail = "alaasaboukh1@gmail.com";

    useEffect(() => {
        dispatch(fetchteachers());
    }, [dispatch]);

    const handleDelete = async (id: string) => {
        try {
            await dispatch(deleteteacher(id)).unwrap();
            dispatch(fetchteachers());
        } catch (err) {
            console.error("Error deleting teacher:", err);
        }
    };
    const handleEdit = (teacher: Teacher) => {
        setEditingteacher(teacher);
    };

    const totalPage = Math.ceil(teachers.length / perPage);

    const currentTeacher = useMemo(() => {
        return teachers.slice(
            (currentPage - 1) * perPage,
            currentPage * perPage
        );
    }, [teachers, currentPage]);

    if (loading)
        return (
            <div className="flex items-center justify-center flex-col h-full">
                <div className="loading"></div>
                <p className="text-[var(--color-accent2)] text-sm mt-2">
                    loading Teachers
                </p>
            </div>
        );

    return (
        <div className="mt-6">
            <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] ">
                {currentTeacher.map((teacher) => (
                    <div
                        key={teacher.id}
                        className="bg-[var(--bg-background)] p-4 rounded-lg flex flex-col items-center"
                    >
                            {teacher.imageUrl && (
                                <Link href={`/teatchers/${teacher.id}`}>
                        <div className="bg-gray-200 rounded-full w-22 h-22 mb-4 relative overflow-hidden">
                                    <Image
                                        src={teacher.imageUrl}
                                        alt={teacher.name}
                                        fill
                                        className="w-full h-full object-cover"
                                    />
                        </div>
                                </Link>
                            )}
                        <p className="text-[var(--color-accent2)] text-lg font-bold mb-2">
                            {teacher.name}
                        </p>
                        <p className="text-[var(--color-accent1)] text-sm tracking-wide">
                            {teacher.job}
                        </p>
                        <div className="flex gap-3 items-center mt-5">
                            <span className="bg-[var(--color-secondary)] text-[var(--color-accent2)] p-2 rounded-full">
                                <Phone size={16} />
                            </span>
                            <span className="bg-[var(--color-secondary)] text-[var(--color-accent2)] p-2 rounded-full">
                                <Mail size={16} />
                            </span>
                        </div>
                        {currentUser?.email === adminEmail && (
                            <div className="flex items-center gap-2">
                                <button
                                    className="bg-gray-100 p-2 rounded-full hover:text-blue-500 transition-all duration-500 cursor-pointer"
                                    onClick={() => handleEdit(teacher)}
                                >
                                    <Edit2 size={16} />
                                </button>
                                <button
                                    className="bg-gray-100 p-2 rounded-full hover:text-red-500 transition-all duration-500 cursor-pointer"
                                    onClick={() => handleDelete(teacher.id!)}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {editingteacher && (
                <TeacherModal
                    editingteacher={editingteacher}
                    setEditingteacher={setEditingteacher}
                />
            )}

            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPage={totalPage}
                data={teachers.length}
            />
        </div>
    );
}
