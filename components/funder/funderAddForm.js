import { useFormik } from "formik"
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { funderValidate } from "../../lib/validate";
import styles from '../../styles/Form.module.css';

export default function FunderAddForm({session}) {
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  }
  const formik = useFormik({
    initialValues: {
      user: session?.createdBy,
      funderName: '',
      contactPerson: '',
      contactNumber: '',
      email: '',
      pan: '',
      funderType: '',
      funderCategory: '',
      addressLine1: '',
      addressLine2: '',
      country: '',
      state: '',
      pinCode: '',
      nationality: '',
      website: '',
    },
    validate: funderValidate,
    onSubmit
  })


  async function onSubmit(values) {
    console.log(values)
    let res = await fetch("/api/funderApi", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const res2 = await res.json();
    if (res2.success === 'Success') {
      toast.success('Funder Add Success !', {
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
        formik.setValues({
          user: session?.createdBy,
          funderName: '',
          contactPerson: '',
          contactNumber: '',
          email: '',
          pan: '',
          funderType: '',
          funderCategory: '',
          addressLine1: '',
          addressLine2: '',
          country: '',
          state: '',
          pinCode: '',
          nationality: '',
          website: '',
        })
      } else {
        router.push('/receipt')
        // console.log('path receipt')
      }
    } else {
      toast.error('Funder not insert !', {
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
      <form onSubmit={formik.handleSubmit} className="grid lg:grid-cols-2 w-auto gap-2">

        <div className={`${styles.input_group} ${formik.errors.funderName && formik.touched.funderName ? 'border-rose-600' : ''} ${!formik.errors.funderName && formik.touched.funderName ? 'border-green-600' : ''}`}>
          <input type="text" name="funderName" {...formik.getFieldProps('funderName')} className={styles.input_text} placeholder="Funder Name" />
        </div>

        <div className={`${styles.input_group} ${formik.errors.contactPerson && formik.touched.contactPerson ? 'border-rose-600' : ''} ${!formik.errors.contactPerson && formik.touched.contactPerson ? 'border-green-600' : ''}`}>
          <input type="text" name="contactPerson" {...formik.getFieldProps('contactPerson')} className={styles.input_text} placeholder="Contact Person" />
        </div>

        <div className={`${styles.input_group} ${formik.errors.contactNumber && formik.touched.contactNumber ? 'border-rose-600' : ''} ${!formik.errors.contactNumber && formik.touched.contactNumber ? 'border-green-600' : ''}`}>
          <input type="text" name="contactNumber" onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }} {...formik.getFieldProps('contactNumber')} className={styles.input_text} placeholder="Contact No." />
        </div>

        <div className={`${styles.input_group} ${formik.errors.email && formik.touched.email ? 'border-rose-600' : ''} ${!formik.errors.email && formik.touched.email ? 'border-green-600' : ''}`}>
          <input type="email" name="email" {...formik.getFieldProps('email')} className={styles.input_text} placeholder="Email" />
        </div>
        
        <div className={`${styles.input_group} ${formik.errors.pan && formik.touched.pan ? 'border-rose-600' : ''} ${!formik.errors.pan && formik.touched.pan ? 'border-green-600' : ''}`}>
          <input type="text" name="pan" {...formik.getFieldProps('pan')} className={`${styles.input_text} uppercase`} placeholder="PAN" />
        </div>

        <div className="flex gap-2 items-center">
          <div className={`${styles.input_group} w-full ${formik.errors.funderType && formik.touched.funderType ? 'border-rose-600' : ''} ${!formik.errors.funderType && formik.touched.funderType ? 'border-green-600' : ''}`}>
            <select id="funderType" name="funderType" {...formik.getFieldProps('funderType')} className={`${styles.input_text}`}>
              <option value="" >Choose a Funter Type</option>
              <option value="CSR">CSR</option>
              <option value="Foundation">Foundation</option>
              <option value="Individual">Individual</option>
              <option value="Corporate Donation">Corporate Donation</option>
            </select>
          </div>
          <div className={`${styles.input_group} w-full ${formik.errors.funderCategory && formik.touched.funderCategory ? 'border-rose-600' : ''} ${!formik.errors.funderCategory && formik.touched.funderCategory ? 'border-green-600' : ''}`}>
            <select id="funderCategory" name="funderCategory" {...formik.getFieldProps('funderCategory')} className={styles.input_text}>
              <option value="">Choose a Funter Category</option>
              <option value="Domestic">Domestic</option>
              <option value="FCRA">FCRA</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <div className={`${styles.input_group} w-full ${formik.errors.addressLine1 && formik.touched.addressLine1 ? 'border-rose-600' : ''} ${!formik.errors.addressLine1 && formik.touched.addressLine1 ? 'border-green-600' : ''}`}>
            <input type="text" name="addressLine1" {...formik.getFieldProps('addressLine1')} className={styles.input_text} placeholder="Address Line 1" />
          </div>
          <div className={`${styles.input_group} w-full`}>
            <input type="text" name="addressLine2" {...formik.getFieldProps('addressLine2')} className={styles.input_text} placeholder="Address Line 2" />
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <div className={`${styles.input_group} w-full ${formik.errors.country && formik.touched.country ? 'border-rose-600' : ''} ${!formik.errors.country && formik.touched.country ? 'border-green-600' : ''}`}>
            <input type="text" name="country" {...formik.getFieldProps('country')} className={styles.input_text} placeholder="Country" />
          </div>
          <div className={`${styles.input_group} w-full ${formik.errors.state && formik.touched.state ? 'border-rose-600' : ''} ${!formik.errors.state && formik.touched.state ? 'border-green-600' : ''}`}>
            <input type="text" name="state" {...formik.getFieldProps('state')} className={styles.input_text} placeholder="State" />
          </div>
          <div className={`${styles.input_group} w-full ${formik.errors.pinCode && formik.touched.pinCode ? 'border-rose-600' : ''} ${!formik.errors.pinCode && formik.touched.pinCode ? 'border-green-600' : ''}`}>
            <input type="text" name="pinCode" onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }} {...formik.getFieldProps('pinCode')} className={styles.input_text} placeholder="Zip Code" />
          </div>
        </div>


        <div className="flex gap-2 items-center">
          <div className={`${styles.input_group} w-full ${formik.errors.nationality && formik.touched.nationality ? 'border-rose-600' : ''} ${!formik.errors.nationality && formik.touched.nationality ? 'border-green-600' : ''}`}>
            <input type="text" name="nationality" {...formik.getFieldProps('nationality')} className={styles.input_text} placeholder="Nationality" />
          </div>
          <div className={`${styles.input_group} w-full`}>
            <input type="text" name="website" {...formik.getFieldProps('website')} className={styles.input_text} placeholder="Website" />
          </div>
        </div>

        <button type="submit" className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-3 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">Add</button>

      </form>
    </>
  )
}