"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchStudents,
  // deleteStudent,
  updateStudent,
} from "@/redux/studentSlice";
import { RootState } from "@/redux/store";
import { Mail, Phone } from "lucide-react";
import Pagination from "./Pagination";
import Link from "next/link";
import Image from "next/image";
interface Student {
  id?: string;
  name: string;
  email: string;
  phone: string;
  class: string;
  grade: string;
  price: number;
  date: string;
  parentName: string;
  city: string;
  feeStatus: string;
  imageUrl: string;
}
const StudentList = () => {
  const dispatch = useAppDispatch();
  const { students, loading } = useAppSelector(
    (state: RootState) => state.student
  );
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const perPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [newImage, setNewImage] = useState<File | null>(null);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  // const handleDelete = async (id: string) => {
  //   try {
  //     await dispatch(deleteStudent(id)).unwrap();
  //     dispatch(fetchStudents()); // ⬅️ تحديث الطلاب من Firestore
  //   } catch (err) {
  //     console.error("Error deleting student:", err);
  //   }
  // };
  // const handleEdit = (student: Student) => {
  //   setEditingStudent(student);
  // };
  const handleUpdate = async () => {
    if (!editingStudent?.id) return;

    try {
      let imageUrl = editingStudent.imageUrl || "";

      // ✅ لو تم اختيار صورة جديدة، ارفعها على Cloudinary
      if (newImage) {
        const formData = new FormData();
        formData.append("file", newImage);
        formData.append("upload_preset", "unsigned_students");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dqdwjumwk/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        imageUrl = data.secure_url;
      }

      // ✅ ابعت البيانات المعدلة + الصورة (لو فيه)
      const updatedData = {
        ...editingStudent,
        imageUrl,
      };

      await dispatch(
        updateStudent({ id: editingStudent.id, data: updatedData })
      ).unwrap();
      dispatch(fetchStudents()); // ⬅️ تحديث القائمة بعد التعديل

      setEditingStudent(null);
      setNewImage(null); // تصفير الصورة
    } catch (err) {
      console.error("Update failed:", err);
    }
  };



  const totalPage = Math.ceil(students.length / perPage);

  const currentStudent = useMemo(() => {
    return students.slice(
      (currentPage - 1) * perPage,
      currentPage * perPage
    );
  }, [students, currentPage, perPage]);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center flex-col h-full">
          <div className="loading"></div>
          <p className="text-gray-500 text-sm mt-2">loading Students</p>
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
                {/* <th className="p-4">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {currentStudent.map((student) => (
                <tr
                  key={student.id}
                  className="border-t border-gray-200 text-sm"
                >
                  <td className="px-4 py-5 text-[var(--color-accent2)] font-bold flex items-center gap-4">
                    <div className="relative w-15 h-15 ">
                            {student.imageUrl && (
                                <Link href={`/students/${student.id}`}>
                                    <Image
                                        src={student.imageUrl}
                                        alt={student.name}
                                        fill
                                        className="cursor-pointer hover:opacity-85 transition-all duration-500 rounded-full object-cover"
                                    />
                                </Link>
                            )}
                        </div>
                    {student.name}
                  </td>
                  <td className="px-4 py-5 text-[var(--color-accent1)] max-lg:text-xs">
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
                  {/* <td className="px-4 py-5">
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
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
          </div>

  <div className="grid grid-cols-1 gap-4 p-3 md:hidden">
    {currentStudent.map((student) => (
      <div
        key={student.id}
        className=" max-md:rounded-lg p-4 max-md:shadow-sm"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 relative">
            {student.imageUrl && (
              <Link href={`/students/${student.id}`}>
                <Image
                  src={student.imageUrl ?? ""}
                  alt={student.name}
                  fill
                  className="rounded-full object-cover"
                />
              </Link>
            )}
          </div>
          <div>
            <h3 className="font-bold text-[var(--color-accent2)]">{student.name}</h3>
            <p className="text-xs text-[var(--color-accent1)]">{student.date}</p>
          </div>
        </div>
        <div className="mt-4 text-sm">
          <p className="font-semibold mb-2">Parent: <span className=" text-[var(--color-accent2)]">{student.parentName}</span></p>
          <p className="font-semibold">City: <span className=" text-[var(--color-accent2)]">{student.city}</span></p>
          <p className="flex items-center gap-2 mt-4">
            <span className="bg-[var(--color-secondary)] p-2 rounded-full text-[var(--color-accent2)]">
              <Phone size={16} />
            </span>
            <span className="bg-[var(--color-secondary)] p-2 rounded-full text-[var(--color-accent2)]">
              <Mail size={16} />
            </span>
          </p>
          <p className="mt-4 font-semibold">
            Grade:{" "}
            <span
              className={`px-2 py-1 rounded-lg text-white text-xs  ${student.grade === "A"
                ? "bg-[#FB7D5B]"
                : student.grade === "B"
                  ? "bg-[#FCC43E]"
                  : "bg-[#4D44B5]"
                }`}
            >
              {student.grade}
            </span>
          </p>
        </div>
      </div>
    ))}
  </div>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={totalPage}
            data={students.length}
          />

          {/* ✨ Modal for Edit */}
          {editingStudent && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-[var(--bg-background)]  p-6 rounded-xl w-full max-w-md shadow-lg">
                <h2 className="text-lg font-bold mb-4 text-[var(--color-accent2)]">
                  Edit Student
                </h2>

                <input
                  className="w-full mb-3 p-2.5 border rounded border-gray-300 outline-none"
                  value={editingStudent.name}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent,
                      name: e.target.value,
                    })
                  }
                />
                <input
                  className="w-full mb-3 p-2.5 border rounded border-gray-300 outline-none"
                  value={editingStudent.parentName}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent,
                      parentName: e.target.value,
                    })
                  }
                />
                <input
                  className="w-full mb-3 p-2.5 border rounded border-gray-300 outline-none"
                  value={editingStudent.city}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent,
                      city: e.target.value,
                    })
                  }
                />
                <input
                  className="w-full mb-3 p-2.5 border rounded border-gray-300 outline-none"
                  value={editingStudent.feeStatus}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent,
                      feeStatus: e.target.value,
                    })
                  }
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setNewImage(e.target.files ? e.target.files[0] : null)
                  }
                />
                <div className="flex justify-end gap-2">
                  <button
                    className="px-4 py-1.5 bg-[var(--color-secondary)] text-white rounded hover:bg-[var(--color-primary)] transition-all duration-500 cursor-pointer"
                    onClick={() => setEditingStudent(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-6 py-1.5 bg-[var(--color-secondary)] text-white rounded hover:bg-[var(--color-primary)]  transition-all duration-500 cursor-pointer"
                    onClick={handleUpdate}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default StudentList;
