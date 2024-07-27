'use client'
import CoverageAreaModel from '@/components/Dashboard/CoverageAreaModel'
import Navbar from '@/components/Navbar/Navbar'
import React from 'react'

type Props = {}

const Dashboard = (props: Props) => {

    return (
        <div>
        <Navbar />

        {/* Header */}
        <div className="font-Manrope lg:mx-28  md:mx-14 mx-5 py-5 md:py-10 border-b  border-b-iota  md:gap-5 gap-5 flex-col md:flex-row flex md:justify-between md:items-center">
          <div>
          <h2 className="text-headingColor font-bold md:text-[3rem] text-[2.3rem] ">
            Your alerts <span className="text-blueColor text-base uppercase">pro plan</span>
          </h2>
          <p className="text-base text-bodyColor">Welcome, John Smith</p>
          </div>

          <div>
          <button
            type="submit"
            className="mt-5 px-7 py-1 w-fit h-fit bg-blueColor hover:bg-blueHover rounded-full font-semibold border-transparent border-2 text-white flex items-center"
          >
           <span className='font-semibold mr-5 text-3xl'>+</span> 
           <span> <CoverageAreaModel/></span>
          </button>
          </div>
        </div>

        </div>
  
    )
}

export default Dashboard