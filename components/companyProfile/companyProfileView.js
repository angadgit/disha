import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"
import Image from 'next/image'


const CompanyProfileView = ({ data }) => {
  // console.log(data)
  const { data: session } = useSession()

  return (
    <>
      <div className="grid grid-row-2 gap-4 place-content-center ">

        {
          data?.map((obj, i) => <Tr {...obj} key={i} />)
        }


      </div>
    </>
  )
}

function Tr({ _id, logo, name, email, pan, officeNo, mobileNo, addressLine1, addressLine2, country, state, pinCode, twelveA, eightyG, organizationType, organizationRegistrationNo }) {

  return (
    <>
      <div className="grid grid-row gap-4 place-content-center ">
        <Image src={logo} alt="logo" height={300} width={500} className="bg-black" />
        {/* <Avatar
  
          alt="log"
          src={dt.logoUrl}
          sx={{ width: 150, height: 150 }}
        /> */}
      </div>
      <div className="grid grid-cols-2 gap-8 place-content-center mt-5">

        <div> <span> Company Name <h1 className="font-semibold">{name}</h1> </span></div>
        <div> <span> Street Address <h1 className="font-semibold">{addressLine1 + " " + addressLine2}</h1> </span></div>
        {/* <div> <span> City <h1 className="font-semibold">{dt.city}</h1 > </span></div> */}
        <div> <span> State <h1 className="font-semibold">{country}</h1 > </span></div>
        <div> <span> State <h1 className="font-semibold">{state}</h1 > </span></div>
        <div> <span> Pin/Zip <h1 className="font-semibold">{pinCode}</h1 > </span></div>
        <div> <span> Contact No <h1 className="font-semibold">{officeNo}</h1> </span></div>
        <div> <span> Contact No <h1 className="font-semibold">{mobileNo}</h1> </span></div>
        <div> <span> Email Address <h1 className="font-semibold">{email}</h1> </span></div>
        <div> <span> Pan Id <h1 className="font-semibold uppercase">{pan}</h1> </span></div>
        <div> <span> 12A Registration no <h1 className="font-semibold uppercase">{twelveA}</h1> </span></div>
        <div> <span> 80G Registration no <h1 className="font-semibold uppercase">{eightyG}</h1> </span></div>
        <div> <span> Organization Type <h1 className="font-semibold">{organizationType}</h1> </span></div>
        <div> <span> Organization Registration no <h1 className="font-semibold">{organizationRegistrationNo}</h1> </span></div>


      </div>
    </>
  )
}

export default CompanyProfileView