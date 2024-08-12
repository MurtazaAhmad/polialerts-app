import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar/Navbar'
import BillingInfo from '@/components/Profile/BillingInfo'
import PersonalInfo from '@/components/Profile/PersonalInfo'
import PlanDetails from '@/components/Profile/PlanDetails'
import React from 'react'

export default function Profile() {
  return (
    <>
    <Navbar/>
            <div
                className='font-Manrope lg:mx-28  md:mx-14 mx-5 py-5 md:py-10 border-b  border-b-iota  md:gap-5 gap-5 flex-col md:flex-row flex md:justify-between md:items-center'>
                <h2 className='text-headingColor font-bold md:text-[3rem] text-[2.3rem] '>Your Profile</h2>
                <button className='py-2 px-5 w-fit  h-fit uppercase border-blueColor  font-semibold  border-2 rounded-xl text-blueColor'>
                    pro plan
                </button>
            </div>
          <PersonalInfo/>
          <BillingInfo/>
          <PlanDetails/>
      <Footer/>  
        </>
    
  )
}
