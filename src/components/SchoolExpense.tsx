"use client"
import React, { useEffect, useState, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { fetchStudents } from '@/redux/studentSlice'
import { RootState } from '@/redux/store'
import { TrendingUp } from 'lucide-react'
import Pagination from './Pagination'
const SchoolExpense = () => {
    const dispatch = useAppDispatch()
    const perpage = 6
    const [currentpage, setcurrentpage] = useState(1)
    const { students: allStudents, loading } = useAppSelector((state: RootState) => state.student)
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

    return (
        <>
            {
                loading ? (
                    <div className="flex items-center justify-center flex-col h-full">
                        <div className="loading"></div>
                        <p className="text-gray-500 text-sm mt-2">loading Student</p>
                    </div>
                ) : (
                    <div className=" p-5 bg-[var(--bg-background)] rounded-lg mt-6 min-h-[670px]">
                        <h1 className="font-bold text-lg text-[var(--color-accent2)]">
                            Student Expense
                        </h1>

                        {currentStudent.slice(0, 10).map((student) => (
                            <div className="grid grid-cols-1 sm:grid-cols-[2.5fr_1.5fr_0.5fr] max-md:shadow-sm p-2.5 max-md:rounded-lg gap-3 items-center mt-7" key={student.id}>

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
        </>
    )
}

export default SchoolExpense;