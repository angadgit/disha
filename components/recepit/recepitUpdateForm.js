import React, { useRef } from "react";
import { useFormik } from "formik"
import FunderAddForm from "../funder/funderAddForm";
import { useRouter } from 'next/router';
import { BiPlusCircle } from "react-icons/bi";
import FundTypeForm from "../fundType/fundTypeForm";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../styles/Form.module.css';
import { recepitValidate } from "../../lib/validate";

export default function ReceiptAddForm({ id, fundDt, funderDt, companyProfileData, session }) {
  const router = useRouter();
  // console.log('companyProfileData', companyProfileData)
  const [funderPopUp, setFunderPopUp] = React.useState(false);
  const [fundTypePopUp, setFundTypePopUp] = React.useState(false);

  const [data, setData] = React.useState(null)
  const [isLoading, setLoading] = React.useState(false)
  

  const [companyuserCheck, setCompanyuserCheck] = React.useState()
  React.useEffect(() => {
    companyProfileData?.map(item => setCompanyuserCheck(item.user))
    // console.log(companyuserCheck)
  }, [companyuserCheck])

  // console.log(data)

  const formik = useFormik({
    initialValues: {
      user: session?.createdBy,
      recepitDate: '',
      funder: '',
      fullName: '',
      contactPerson: '',
      contactNumber: '',
      email: '',
      pan: '',
      addressLine1: '',
      addressLine2: '',
      country: '',
      state: '',
      pinCode: '',
      funderType: '',
      receiptAmount: '',
      typeFund: '',
      description: '',
    },
    validate: recepitValidate,
    onSubmit
  })

  React.useEffect(() => {
    setLoading(true)
    fetch(`/api/recepitApi/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        formik.setValues({
          user: session?.createdBy,
          recepitDate: data?.recepitDate,
          fullName: data?.fullName,
          contactPerson: data?.contactPerson,
          contactNumber: data?.contactNumber,
          email: data?.email,
          pan: data?.pan,
          addressLine1: data?.addressLine1,
          addressLine2: data?.addressLine2,
          country: data?.country,
          state: data?.state,
          pinCode: data?.pinCode,
          funderType: data?.funderType,
          receiptAmount: data?.receiptAmount,
          typeFund: data?.typeFund,
          description: data?.description,
        });
        setLoading(false)
      })
  }, [])

  funderDt?.filter(item => item.funderName === formik.values?.funder).map(item => formik.setValues({ user: session?.createdBy, recepitDate: formik.values.recepitDate || '', fullName: item.funderName || '', contactPerson: item.contactPerson || '', contactNumber: item.contactNumber || '', email: item.email || '', pan: item.pan || '', addressLine1: item.addressLine1 || '', addressLine2: item.addressLine2 || '', country: item.country || '', state: item.state || '', pinCode: item.pinCode || '', funderType: formik.values.funderType || '', receiptAmount: formik.values.receiptAmount || '', typeFund: formik.values.typeFund || '' }))

  async function onSubmit(values) {
    // console.log(values)
    let res = await fetch(`/api/recepitApi/${id}`, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const res2 = await res.json();
    if (res2.success === 'Success') {
      toast.success('Recepit Update Success !', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.push('/recepit')
    } else {
      toast.error('Recepit not Update !', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

  }

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <form className="grid lg:grid-cols-2 w-auto gap-4" onSubmit={formik.handleSubmit}>
        <div className={`${styles.input_group} w-full ${formik.errors.recepitDate && formik.touched.recepitDate ? 'border-rose-600' : ''} ${!formik.errors.recepitDate && formik.touched.recepitDate ? 'border-green-600' : ''}`}>
          <input type="date" name="recepitDate" {...formik.getFieldProps('recepitDate')} className={styles.input_text} placeholder="Recepit Date" />
        </div>
        <div className={`${styles.input_group} w-full ${formik.errors.funder && formik.touched.funder ? 'border-rose-600' : ''} ${!formik.errors.funder && formik.touched.funder ? 'border-green-600' : ''}`}>
          <select id="funder" name="funder" {...formik.getFieldProps('funder')} className={styles.input_text}>
            <option value=''>Choose a Funter</option>
            {
              funderDt?.filter(item => item.user === session?.createdBy).map((obj) => <option value={obj.funderName} key={obj._id} > {obj.funderName} </option>)
            }
          </select>
          <BiPlusCircle onClick={() => setFunderPopUp(true)} className='text-4xl text-green-400 my-auto cursor-pointer' />
        </div>
        <div className={styles.input_group}>
          <input type="text" name="fullName" {...formik.getFieldProps('fullName')} className={`${styles.input_text} cursor-not-allowed`} placeholder="Full Name" disabled />
        </div>
        <div className={styles.input_group}>
          <input type="text" name="contactPerson" {...formik.getFieldProps('contactPerson')} className={`${styles.input_text} cursor-not-allowed`} placeholder="Contact Person" disabled />
        </div>
        <div className={styles.input_group}>
          <input type="number" name="contactNumber" {...formik.getFieldProps('contactNumber')} className={`${styles.input_text} cursor-not-allowed`} placeholder="Contact No." disabled />
        </div>
        <div className={styles.input_group}>
          <input type="email" name="email" {...formik.getFieldProps('email')} className={`${styles.input_text} cursor-not-allowed`} placeholder="Email" disabled />
        </div>
        <div className={styles.input_group}>
          <input type="text" name="pan" {...formik.getFieldProps('pan')} className={`${styles.input_text} cursor-not-allowed uppercase`} placeholder="PAN" disabled />
        </div>

        <div className="flex gap-2 items-center">
          <div className={`${styles.input_group} w-full `}>
            <input type="text" name="addressLine1" {...formik.getFieldProps('addressLine1')} className={`${styles.input_text} cursor-not-allowed`} placeholder="Address Line 1" disabled />
          </div>

          <div className={`${styles.input_group} w-full `}>
            <input type="text" name="addressLine2" {...formik.getFieldProps('addressLine2')} className={`${styles.input_text} cursor-not-allowed`} placeholder="Address Line 2" disabled />
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <div className={`${styles.input_group} w-full `}>
            <input type="text" name="country" {...formik.getFieldProps('country')} className={`${styles.input_text} cursor-not-allowed`} placeholder="Country" disabled />
          </div>
          <div className={`${styles.input_group} w-full `}>
            <input type="text" name="state" {...formik.getFieldProps('state')} className={`${styles.input_text} cursor-not-allowed`} placeholder="State" disabled />
          </div>
          <div className={`${styles.input_group} w-full `}>
            <input type="number" name="pinCode" {...formik.getFieldProps('pinCode')} className={`${styles.input_text} cursor-not-allowed`} placeholder="Zip Code" disabled />
          </div>
        </div>


        <div className="flex gap-2 items-center">
          <div className={`${styles.input_group} w-full ${formik.errors.funderType && formik.touched.funderType ? 'border-rose-600' : ''} ${!formik.errors.funderType && formik.touched.funderType ? 'border-green-600' : ''}`}>
            <select id="funderType" name="funderType" {...formik.getFieldProps('funderType')} className={styles.input_text}>
              <option value=''>Choose a Funter Type</option>
              <option value="Cash">Cash</option>
              <option value="Bank">Bank</option>
              <option value="Cheque">Cheque</option>
              <option value="UPI">UPI</option>
            </select>
          </div>
          <div className={`${styles.input_group} w-full ${formik.errors.receiptAmount && formik.touched.receiptAmount ? 'border-rose-600' : ''} ${!formik.errors.receiptAmount && formik.touched.receiptAmount ? 'border-green-600' : ''}`}>
            <input type="text" name="receiptAmount" {...formik.getFieldProps('receiptAmount')} onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }} className={styles.input_text} placeholder="Receipt Amount" />
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <div className={`${styles.input_group} w-full ${formik.errors.typeFund && formik.touched.typeFund ? 'border-rose-600' : ''} ${!formik.errors.typeFund && formik.touched.typeFund ? 'border-green-600' : ''}`}>
            <select id="typeFund" name="typeFund" {...formik.getFieldProps('typeFund')} className={styles.input_text}>
              <option value=''>Choose Type of Fund</option>
              {
                fundDt?.filter(item => item.user === session?.createdBy).map((obj) => <option value={obj.name || ''} key={obj._id} > {obj.name} </option>)
              }
            </select>
            <BiPlusCircle onClick={() => setFundTypePopUp(true)} className='text-4xl text-green-300 my-auto cursor-pointer' />
          </div>
        </div>

        <div className={`${styles.input_group} w-full `}>
          <textarea type="text" name="description" rows="2" {...formik.getFieldProps('description')} className={styles.input_text} placeholder="description" />
        </div>

        <div className="flex gap-2 items-center">
          <button type='submit' className="flex justify-center text-md w-2/6 bg-yellow-500 text-white px-4 py-3 border rounded-md hover:bg-gray-50 hover:border-yellow-500 hover:text-yellow-500">Update</button>
        </div>

      </form>

      {funderPopUp ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-4xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Add Funder
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-2 w-full">
                  <FunderAddForm />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setFunderPopUp(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {fundTypePopUp ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-4xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Add Type of Fund
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setFundTypePopUp(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-2 w-full">
                  <FundTypeForm />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setFundTypePopUp(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

    </>
  )
}

