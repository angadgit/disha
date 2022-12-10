import React, { useRef, useEffect, useState } from 'react'
import ReactToPrint from 'react-to-print';
// import Pdf from "react-to-pdf";
import { BsPrinter } from 'react-icons/bs';
import { AiOutlineCloudDownload } from 'react-icons/ai';
// import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Image from 'next/image';

export default function RecepitPrint_1({ Rid, session }) {
  const componentRef = useRef()
  const [dt, setDt] = useState("")
  const [isLoading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [recepitData, setRecepitData] = useState(null)

  const imgLogo = dt.logo?.split("./public")[1]
  // console.log(imgLogo)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/recepitApi/${Rid}`)
      .then((res) => res.json())
      .then((item) => {
        setRecepitData(item)
        setLoading(false)
      })
  }, [])


  useEffect(() => {
    setLoading(true)
    fetch('/api/companyProfileApi')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  

  setTimeout(() => {
    const item = data?.filter(item => item.user === session?.createdBy);
    item?.map(it => setDt(it))
  }, 2000);

  // const printDocument = () => {
  //   html2canvas(componentRef.current).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF();
  //     pdf.addImage(imgData, "JPEG", 0, 0);
  //     pdf.save("recepit.pdf");
  //   });
  // };

  // const printDocument = () => {
  //   const componentWidth = Number(componentRef.current?.offsetWidth);
  //   const componentHeight = Number(componentRef.current?.offsetHeight);
  //   const orientation = Number(componentWidth) >= Number(componentHeight) ? 'l' : 'p';

  //   html2canvas(componentRef.current).then((imgData) => {
  //     const pdf = new jsPDF({
  //       orientation,
  //       unit: 'px'
  //     });
  //     pdf.internal.pageSize.width = componentWidth;
  //     pdf.internal.pageSize.height = componentHeight;
  //     pdf.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
  //     pdf.save("skills.pdf");
  //   });
  // };
  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>
  return (
    <>
      <div className='flex justify-center'>
        <div className=' mt-5 w-xl p-5 text-center' ref={componentRef}>
          <h1 className='text-xl'>80G / Donations Receipt</h1><hr />
          <div className='grid grid-cols-6 gap-4 mt-5'>
            <div className='w-3/4'>
              {/* <h1>logo</h1> */}
              {/* {imgLogo ? <img src={imgLogo} alt="logo" width="150" height="150" className="" /> : ""} */}
              {imgLogo ? <Image src={imgLogo} width={250} height={250} alt={"logo"} className="object-cover object-center" /> : ""}

            </div>
            <div className='col-start-2 col-span-4'>
              <p className='text-lg mb-0'>{dt.name}</p>
              <span>{dt.addressLine1 + " " + dt.addressLine2 + " " + dt.city + " " + dt.state + " " + dt.pinCode}</span>
              <p className='flex justify-center gap-1'> Mobile <span className=''>{dt.mobileNo},</span> Office no <span className=''>{dt.officeNo},</span>  Email <span className=''>{dt.email}</span></p>
            </div>
            <div className='text-end mr-5'>
              <p>10001</p>
            </div>
          </div>
          <div className='text-end mr-5'>
            <p>Date {recepitData?.recepitDate}</p>
          </div>
          <div className='grid grid-cols-2'>
            <div className='text-start'>
              <p>Received From {recepitData?.fullName}</p>
            </div>
            <div className='text-end mr-8'>
              <p>Amount {recepitData?.receiptAmount}</p>
            </div>
          </div>
          <div className='grid grid-cols-1'>
            <p className='text-start'>As {recepitData?.typeFund} for {recepitData?.description}</p>
          </div>
          <div className='grid grid-cols-2 mb-5'>
            <p className='text-start'> payment mode {recepitData?.funderType}</p>
            {/* <h1>by</h1> */}
          </div>
          <hr />
          <div className='grid grid-cols-3 '>

            <div className='flex'>Pan <h1 className="font-semibold ml-2 uppercase">{dt.pan}</h1> </div>
            <div className='flex'>12A Registration no <h1 className="font-semibold ml-2 uppercase">{dt.twelveA}</h1> </div>
            <div className='flex'>80G Registration no <h1 className="font-semibold ml-2 uppercase">{dt.eightyG}</h1> </div>
            <div className='flex'>Organization Type <h1 className="font-semibold ml-2">{dt.organizationType}</h1> </div>
            <div className='flex col-span-2 gap-2'>Organization Registration no <h1 className="font-semibold">{dt.organizationRegistrationNo}</h1> </div>

          </div>
          <hr />
        </div>
      </div>
      <div className='text-end space-x-4 mx-10'>

        <ReactToPrint
          trigger={() => <button variant='outlined' className='text-2xl text-blue-500'> <BsPrinter /></button>}
          content={() => componentRef.current}
        />

        {/* <Pdf targetRef={componentRef} filename="Recepit.pdf" x={0.5} y={.5} scale={1}>
          {({ toPdf }) => <button onClick={toPdf} className='text-2xl text-red-500'><AiOutlineCloudDownload /></button>}
        </Pdf> */}

        {/* <button onClick={printDocument} className='text-2xl text-red-500'><AiOutlineCloudDownload /></button> */}

      </div>
    </>
  )
}
