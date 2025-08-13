import SchoolPerformanceChart from '@/components/Chart'
import DetailsFinance from '@/components/DeatailsFinance'
import SchoolExpense from '@/components/SchoolExpense'
import TopComponent from '@/components/TopComponent'
import UnPaidStudent from '@/components/UnPaidStudent'
import React from 'react'

const page = () => {
  return (
  <div className="bg-[var(--color-secondary)] w-full p-6">
    <TopComponent text='Finance'/>
    <DetailsFinance/>
    <SchoolPerformanceChart/>
    <div className='flex gap-5 max-lg:flex-col'>
        <div className='flex-1'>

      <UnPaidStudent/>
        </div>
        <div className='flex-1'>

      <SchoolExpense/>
        </div>
    </div>
    </div>
  )
}

export default page