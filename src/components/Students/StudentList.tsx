"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchStudents, deleteStudent, Student } from "@/redux/studentSlice";
import { RootState } from "@/redux/store";
import { Edit2, Mail, Phone, Trash2 } from "lucide-react";
import Pagination from "@/components/Nested/Pagination";
import Link from "next/link";
import Image from "next/image";
import StudentMobile from "./StudentMobile";
import StudentModal from "./StudentModal";

const StudentList = () => {
  const dispatch = useAppDispatch();
  const { students, loading } = useAppSelector(
    (state: RootState) => state.student
  );
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const perPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const currentUser = useAppSelector(
    (state: RootState) => state.auth.currentUser
  );
  const adminEmail = "alaasaboukh1@gmail.com";

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteStudent(id)).unwrap();
      dispatch(fetchStudents());
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };
  const handleEdit = (student: Student) => {
    setEditingStudent(student);
  };

  const totalPage = Math.ceil(students.length / perPage);

  const currentStudent = useMemo(() => {
    return students.slice((currentPage - 1) * perPage, currentPage * perPage);
  }, [students, currentPage, perPage]);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center flex-col h-full">
          <div className="loading"></div>
          <p className="text-[var(--color-accent2)] text-sm mt-2">
            loading Students
          </p>
        </div>
      ) : (
        <div className="mt-6 p-2 bg-[var(--bg-background)] rounded-lg">
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full border-collapse border rounded-lg overflow-hidden ">
              <thead className=" text-xs text-left">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Parent Name</th>
                  <th className="p-4">City</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Grade</th>

                  {currentUser?.email === adminEmail && (
                    <th className="p-4">Action</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {currentStudent.map((student) => (
                  <tr
                    key={student.id}
                    className="border-t border-gray-200 text-sm"
                  >
                    <td className="px-4 py-5 text-[var(--color-accent2)] font-bold flex items-center gap-4">
                        {student.imageUrl && (
                          <Link href={`/students/${student.id}`}>
                      <div className="relative w-15 h-15">
                            <Image
                              src={student.imageUrl}
                              alt={student.name}
                              fill
                              className="cursor-pointer hover:opacity-85 transition-all duration-500 rounded-full object-cover"
                            />
                      </div>
                          </Link>
                        )}
                      {student.name}
                    </td>
                    <td className="px-6 py-5 text-[var(--color-accent1)] max-lg:text-xs">
                      {student.date}
                    </td>
                    <td className="px-4 py-5 text-[var(--color-accent2)]">
                      {student.parentName}
                    </td>
                    <td className="px-4 py-5 text-[var(--color-accent2)]">
                      {student.city}
                    </td>
                    <td className="px-4 py-5">
                      <div className="flex gap-3 items-center">
                        <span className="bg-[var(--color-secondary)] p-2 rounded-full text-[var(--color-accent2)]">
                          <Phone size={16} />
                        </span>
                        <span className="bg-[var(--color-secondary)] p-2 rounded-full text-[var(--color-accent2)]">
                          <Mail size={16} />
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-5">
                      <span
                        className={`p-2 rounded-lg text-white ${student.grade === "A"
                            ? "bg-[#FB7D5B]"
                            : student.grade === "B"
                              ? "bg-[#FCC43E]"
                              : "bg-[#4D44B5]"
                          }`}
                      >
                        {student.grade}
                      </span>
                    </td>
                    {currentUser?.email === adminEmail && (
                      <td className="px-4 py-5">
                        <div className="flex items-center gap-2">
                          <button
                            className="bg-[var(--color-secondary)]  p-2 rounded-full hover:text-blue-500 transition-all duration-500 cursor-pointer"
                            onClick={() => handleEdit(student)}
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            className="bg-[var(--color-secondary)]  p-2 rounded-full hover:text-red-500 transition-all duration-500 cursor-pointer"
                            onClick={() => handleDelete(student.id!)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <StudentMobile currentStudent={currentStudent} />
          
          {editingStudent && (
            <StudentModal
              editingStudent={editingStudent}
              setEditingStudent={setEditingStudent}
            />
          )}

          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={totalPage}
            data={students.length}
          />

        </div>
      )}
    </>
  );
};

export default StudentList;