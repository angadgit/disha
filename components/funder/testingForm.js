import React from 'react';
import styles from '../../styles/Form.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { Formik } from 'formik';
import * as Yup from "yup";

let called = false;

const BasicExample = ({ id , session}) => {
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  }

  const [data, setData] = React.useState(null)
  const [isLoading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setLoading(true)
    fetch(`/api/funderApi/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  async function onSubmit(values) {
    let res = await fetch(`/api/funderApi/${id}`, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const res2 = await res.json();
    if (res2.success === 'Success') {
      toast.success('Funder Updated Success !', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      if (router.pathname === '/funder') {
        // console.log('path funder')
        refreshData()
      } else {
        router.push('/recepit')
        // console.log('path receipt')
      }
    } else {
      toast.error('Funder not Updated !', {
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
      <Formik
        initialValues={{
          user: session?.createdBy,
          funderName: data?.funderName,
          contactPerson: data?.contactPerson,
          contactNumber: data?.contactNumber,
          email: data?.email,
          pan: data?.pan,
          funderType: data?.funderType,
          funderCategory: data?.funderCategory,
          addressLine1: data?.addressLine1,
          addressLine2: data?.addressLine2,
          country: data?.country,
          state: data?.state,
          pinCode: data?.pinCode,
          nationality: data?.nationality,
          website: data?.website,
        }}
        onSubmit={(values, actions) => {
          actions.setSubmitting(
            onSubmit(values)
          );

        }}
        validationSchema={Yup.object().shape({
          funderName: Yup.string()
            .required("Required"),
          contactPerson: Yup.string()
            .required("Required"),
          contactNumber: Yup.string()
            .min(10)
            .max(10)
            .required("Required"),
          email: Yup.string()
            .email()
            .required("Required"),
          pan: Yup.string()
            .min(10)
            .max(10)
            .required("Required"),
          funderType: Yup.string()
            .required("Required"),
          funderCategory: Yup.string()
            .required("Required"),
          addressLine1: Yup.string()
            .required("Required"),
          country: Yup.string()
            .required("Required"),
          state: Yup.string()
            .required("Required"),
          pinCode: Yup.string()
            .min(6)
            .max(6)
            .required("Required"),
          nationality: Yup.string()
            .required("Required")
        }
        )}
      >
        {props => {
          const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
            setFieldValue
          } = props;

          // if (!called) {
          //   setFieldValue("email", "test");

          //   // after timeout it works fine
          //   // setTimeout(() => {
          //   //   setFieldValue('email', 'test');
          //   // });
          //   called = true;
          // }

          return (
            <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 w-auto gap-2">

              <div className={`${styles.input_group} ${errors.funderName && touched.funderName ? 'border-rose-600' : ''} ${!errors.funderName && touched.funderName ? 'border-green-600' : ''}`}>
                <input type="text" name="funderName" onChange={handleChange} value={values.funderName} onBlur={handleBlur} className={`${styles.input_text} text-rose-500 cursor-not-allowed`} placeholder="Funder Name" disabled />
                {/* {errors.funderName && touched.funderName && (
                <div className="input-feedback">{errors.funderName}</div>
              )} */}
              </div>

              <div className={`${styles.input_group} ${errors.contactPerson && touched.contactPerson ? 'border-rose-600' : ''} ${!errors.contactPerson && touched.contactPerson ? 'border-green-600' : ''}`}>
                <input type="text" name="contactPerson" onChange={handleChange} value={values.contactPerson} className={styles.input_text} placeholder="Contact Person" />
              </div>

              <div className={`${styles.input_group} ${errors.contactNumber && touched.contactNumber ? 'border-rose-600' : ''} ${!errors.contactNumber && touched.contactNumber ? 'border-green-600' : ''}`}>
                <input type="text" name="contactNumber" onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }} onChange={handleChange} className={styles.input_text} value={values.contactNumber} placeholder="Contact No." />
              </div>

              <div className={`${styles.input_group} ${errors.email && touched.email ? 'border-rose-600' : ''} ${!errors.email && touched.email ? 'border-green-600' : ''}`}>
                <input type="email" name="email" onChange={handleChange} value={values.email} className={styles.input_text} placeholder="Email" />
              </div>

              <div className={`${styles.input_group} ${errors.pan && touched.pan ? 'border-rose-600' : ''} ${!errors.pan && touched.pan ? 'border-green-600' : ''}`}>
                <input type="text" name="pan" onChange={handleChange} value={values.pan} className={`${styles.input_text} uppercase`} placeholder="PAN" />
              </div>

              <div className="flex gap-2 items-center">
                <div className={`${styles.input_group} w-full ${errors.funderType && touched.funderType ? 'border-rose-600' : ''} ${!errors.funderType && touched.funderType ? 'border-green-600' : ''}`}>
                  <select id="funderType" name="funderType" onChange={handleChange} value={values.funderType} className={`${styles.input_text}`}>
                    <option value="" >Choose a Funter Type</option>
                    <option value="CSR">CSR</option>
                    <option value="Foundation">Foundation</option>
                    <option value="Individual">Individual</option>
                    <option value="Corporate Donation">Corporate Donation</option>
                  </select>
                </div>
                <div className={`${styles.input_group} w-full ${errors.funderCategory && touched.funderCategory ? 'border-rose-600' : ''} ${!errors.funderCategory && touched.funderCategory ? 'border-green-600' : ''}`}>
                  <select id="funderCategory" name="funderCategory" onChange={handleChange} value={values.funderCategory} className={styles.input_text}>
                    <option value="">Choose a Funter Category</option>
                    <option value="Domestic">Domestic</option>
                    <option value="FCRA">FCRA</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <div className={`${styles.input_group} w-full ${errors.addressLine1 && touched.addressLine1 ? 'border-rose-600' : ''} ${!errors.addressLine1 && touched.addressLine1 ? 'border-green-600' : ''}`}>
                  <input type="text" name="addressLine1" onChange={handleChange} value={values.addressLine1} className={styles.input_text} placeholder="Address Line 1" />
                </div>
                <div className={`${styles.input_group} w-full`}>
                  <input type="text" name="addressLine2" onChange={handleChange} value={values.addressLine2} className={styles.input_text} placeholder="Address Line 2" />
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <div className={`${styles.input_group} w-full ${errors.country && touched.country ? 'border-rose-600' : ''} ${!errors.country && touched.country ? 'border-green-600' : ''}`}>
                  <input type="text" name="country" onChange={handleChange} value={values.country} className={styles.input_text} placeholder="Country" />
                </div>
                <div className={`${styles.input_group} w-full ${errors.state && touched.state ? 'border-rose-600' : ''} ${!errors.state && touched.state ? 'border-green-600' : ''}`}>
                  <input type="text" name="state" onChange={handleChange} value={values.state} className={styles.input_text} placeholder="State" />
                </div>
                <div className={`${styles.input_group} w-full ${errors.pinCode && touched.pinCode ? 'border-rose-600' : ''} ${!errors.pinCode && touched.pinCode ? 'border-green-600' : ''}`}>
                  <input type="text" name="pinCode" onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }} onChange={handleChange} value={values.pinCode} className={styles.input_text} placeholder="Zip Code" />
                </div>
              </div>


              <div className="flex gap-2 items-center">
                <div className={`${styles.input_group} w-full ${errors.nationality && touched.nationality ? 'border-rose-600' : ''} ${!errors.nationality && touched.nationality ? 'border-green-600' : ''}`}>
                  <input type="text" name="nationality" onChange={handleChange} value={values.nationality} className={styles.input_text} placeholder="Nationality" />
                </div>
                <div className={`${styles.input_group} w-full`}>
                  <input type="text" name="website" onChange={handleChange} value={values.website} className={styles.input_text} placeholder="Website" />
                </div>
              </div>

              <button type="submit" className="flex justify-center text-md w-2/6 bg-yellow-500 text-white px-4 py-3 border rounded-md hover:bg-gray-50 hover:border-yellow-500 hover:text-yellow-500">Update</button>
            </form>
          );
        }}
      </Formik>
    </>
  )
};

export default BasicExample;