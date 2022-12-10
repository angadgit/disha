import { useFormik } from "formik";
import { useState } from "react";
import { useRouter } from "next/router";
import { companyProfileValidate } from "../../lib/validate";
import styles from "../../styles/Form.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

export default function CompanyProfileUpdateForm({ id , session }) {
  // console.log("update id", id)
  const [logoUrl, setLogoUrl] = useState();
  const [img, setImg] = useState();

  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };
  const [isLoading, setLoading] = React.useState(false);
  const [checkFile, setCheckFile] = useState(false);

  const imageHandler = (e) => {
    setLogoUrl(e.target.files[0]);
    setCheckFile(true);
  };

  const imagesubmission = () => {
    if (checkFile) {
      imageUpload();
    } else {
      alert("select a file");
    }
  };

  // console.log(logoUrl)

  const formik = useFormik({
    initialValues: {
      user: `${session?.createdBy}`,
      name: "",
      logo: "",
      email: "",
      pan: "",
      officeNo: "",
      mobileNo: "",
      addressLine1: "",
      addressLine2: "",
      country: "",
      state: "",
      pinCode: "",
      twelveA: "",
      eightyG: "",
      organizationType: "",
      organizationRegistrationNo: "",
    },
    validate: companyProfileValidate,
    onSubmit,
  });

  React.useEffect(() => {
    setLoading(true);
    fetch(`/api/companyProfileApi/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // setData(data)
        formik.setValues({
          user: session?.createdBy,
          name: data?.name,
          logo: data?.logo,
          email: data?.email,
          pan: data?.pan,
          officeNo: data?.officeNo,
          mobileNo: data?.mobileNo,
          addressLine1: data?.addressLine1,
          addressLine2: data?.addressLine2,
          country: data?.country,
          state: data?.state,
          pinCode: data?.pinCode,
          twelveA: data?.twelveA,
          eightyG: data?.eightyG,
          organizationType: data?.organizationType,
          organizationRegistrationNo: data?.organizationRegistrationNo,
        });
        setLoading(false);
      });
  }, []);

  async function onSubmit(values) {
    const dt = {
      user: session?.createdBy,
      name: values?.name,
      logo: img,
      email: values?.email,
      pan: values?.pan,
      officeNo: values?.officeNo,
      mobileNo: values?.mobileNo,
      addressLine1: values?.addressLine1,
      addressLine2: values?.addressLine2,
      country: values?.country,
      state: values?.state,
      pinCode: values?.pinCode,
      twelveA: values?.twelveA,
      eightyG: values?.eightyG,
      organizationType: values?.organizationType,
      organizationRegistrationNo: values?.organizationRegistrationNo,
    };
    // console.log(dt)
    let res = await fetch(`/api/companyProfileApi/${id}`, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dt),
    });
    const res2 = await res.json();
    if (res2.success === "Success") {
      toast.success("Company profile Updated Success...!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      if (router.pathname === "/company-profile") {
        // console.log('path funder')
        refreshData();
      } else {
        router.push("/company-profile");
        // console.log('path receipt')
      }
    } else {
      toast.error("Company profile not updated...!", {
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

  const imageUpload = async (e) => {
    console.log("mageUpload");
    const data = new FormData();
    data.append("file", logoUrl);
    const res = await fetch(`/api/imageUpload`, {
      method: "POST",
      body: data,
    });
    console.log("res", res);
    const res2 = await res.json();
    console.log(res2);
    setImg(res2.newPath);
    alert("File Uploaded");
  };

  // if (isLoading) return <div>Loading...</div>;
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
      <form
        onSubmit={formik.handleSubmit}
        className="grid lg:grid-cols-2 w-4/5 gap-4"
        encType="multipart/form-data"
      >
        <div className="flex gap-4 items-center">
          <div className="px-5 py-3 w-full cursor-pointer relative flex justify-center items-center border-2 rounded-md bg-gray-200">
            <input
              type="file"
              name="logoUrl"
              onChange={imageHandler}
              accept="image/*"
              className="z-20 opacity-0 cursor-pointer h-full w-full"
            />
            <div className="absolute flex justify-center items-center gap-2">
              <img
                className={`h-10 w-10 rounded-full ${checkFile ? "opacity-1" : "opacity-0"
                  }`}
                src={logoUrl ? URL.createObjectURL(logoUrl) : null}
                alt={"userImg"}
              />
              <span className="text-[18px] w-56 truncate">
                {checkFile ? logoUrl.name : "choose Profile Pic"}
              </span>
            </div>
          </div>
          <div className="self-center">
            <button
              onClick={imagesubmission}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                aria-hidden="true"
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                >
                  {" "}
                </path>
              </svg>
            </button>
          </div>

          {/* <div className="input-type">
          <input className={styles.input_text} id="logoUrl" name='logoUrl' onChange={e => setLogoUrl(e.target.files[0])} type="file" multiple="" accept="image/*" />
        </div> */}
          {/* <div>
            <button type="button" onClick={imageUpload} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              <span className="sr-only">Image upload</span>
            </button>
          </div> */}
        </div>

        <div
          className={`${styles.input_group} ${formik.errors.name && formik.touched.name ? "border-rose-600" : ""
            } ${!formik.errors.name && formik.touched.name ? "border-green-600" : ""
            }`}
        >
          <input
            type="text"
            name="name"
            {...formik.getFieldProps("name")}
            className={styles.input_text}
            placeholder="Name"
          />
        </div>
        <div
          className={`${styles.input_group} ${formik.errors.email && formik.touched.email ? "border-rose-600" : ""
            } ${!formik.errors.email && formik.touched.email
              ? "border-green-600"
              : ""
            }`}
        >
          <input
            type="email"
            name="email"
            {...formik.getFieldProps("email")}
            className={styles.input_text}
            placeholder="Email"
          />
        </div>
        <div className="input-type">
          <input
            type="text"
            name="pan"
            {...formik.getFieldProps("pan")}
            className={styles.input_text}
            placeholder="PAN"
          />
        </div>

        <div className="flex gap-4 items-center">
          <div className="input-type w-full">
            <input
              type="text"
              name="officeNo"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              maxLength={10}
              {...formik.getFieldProps("officeNo")}
              className={styles.input_text}
              placeholder="Landline No."
            />
          </div>
          <div className="input-type w-full">
            <input
              type="text"
              name="mobileNo"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              maxLength={10}
              {...formik.getFieldProps("mobileNo")}
              className={styles.input_text}
              placeholder="Mobile No."
            />
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <div className="input-type w-full">
            <input
              type="text"
              name="addressLine1"
              {...formik.getFieldProps("addressLine1")}
              className={styles.input_text}
              placeholder="Address Line 1"
            />
          </div>
          <div className="input-type w-full">
            <input
              type="text"
              name="addressLine2"
              {...formik.getFieldProps("addressLine2")}
              className={styles.input_text}
              placeholder="Address Line 2"
            />
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <div className="input-type w-full">
            <input
              type="text"
              name="country"
              {...formik.getFieldProps("country")}
              className={styles.input_text}
              placeholder="Country"
            />
          </div>
          <div className="input-type w-full">
            <input
              type="text"
              name="state"
              {...formik.getFieldProps("state")}
              className={styles.input_text}
              placeholder="State"
            />
          </div>
          <div className="input-type w-full">
            <input
              type="text"
              name="pinCode"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              maxLength={6}
              {...formik.getFieldProps("pinCode")}
              className={styles.input_text}
              placeholder="Zip Code"
            />
          </div>
        </div>
        <div className="input-type">
          <input
            type="text"
            name="twelveA"
            {...formik.getFieldProps("twelveA")}
            className={styles.input_text}
            placeholder="12A"
          />
        </div>
        <div className="input-type">
          <input
            type="text"
            name="eightyG"
            {...formik.getFieldProps("eightyG")}
            className={styles.input_text}
            placeholder="80G"
          />
        </div>
        <div className="input-type">
          <select
            id="organizationType"
            name="organizationType"
            {...formik.getFieldProps("organizationType")}
            className={styles.input_text}
          >
            <option value="">Choose Organization Type</option>
            <option value="Company">Company</option>
            <option value="Trust">Trust</option>
            <option value="Association">Association</option>
          </select>
        </div>
        <div className="input-type">
          <input
            type="text"
            name="organizationRegistrationNo"
            {...formik.getFieldProps("organizationRegistrationNo")}
            className={styles.input_text}
            placeholder="Organization Registration No"
          />
        </div>

        <button
          type="submit"
          className="flex justify-center text-md w-2/6 bg-yellow-500 text-white px-4 py-3 border rounded-md hover:bg-gray-50 hover:border-yellow-500 hover:text-yellow-500"
        >
          Update
        </button>
      </form>
    </>
  );
}
