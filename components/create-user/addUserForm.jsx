import React from "react";
import { useFormik } from "formik";
import { useState } from "react";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { userFormValidate } from "../../lib/validate";
import styles from '../../styles/Form.module.css';

const Forms = [
  { value: "funder", label: "Funder" },
  { value: "recepit", label: "Recepit" },
  { value: "create-user", label: "Create User" },
  { value: "profile", label: "User Profile" },
  { value: "company-profile", label: "Company Profile" },
];

export default function AddUserForm({session}) {
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  }
  const [logoUrl, setLogoUrl] = useState();
  const [imageUrl, setImageUrl] = useState(null);
  const [selectForms, setSelectForms] = useState(null);
  // const [veiw, setVeiw] = useState([]);

  const [viewForms, setViewForms] = useState({
    view: [],
  });
  const [updateForms, setUpdateForms] = useState({
    update: [],
  });
  const [addForms, setAddForms] = useState({
    add: [],
  });
  const [deleteForms, setDeleteForms] = useState({
    delete_dt: [],
  });

  // console.log("set",userinfo.add)
  const handleChange = (e) => {
    const { value, checked, name } = e.target;
    const { view } = viewForms;
    const { update } = updateForms;
    const { add } = addForms;
    const { delete_dt } = deleteForms;

    // console.log(`${value} is ${checked} name ${name}`);

    // Case 1 : The user checks the box
    if (name === "veiw") {
      if (checked) {
        setViewForms({
          view: [...view, value],
        });
      }
      // Case 2  : The user unchecks the box
      else {
        setViewForms({
          view: view.filter((e) => e !== value),
        });
      }
    }

    if (name === "update") {
      if (checked) {
        setUpdateForms({
          update: [...update, value],
        });
      }
      // Case 2  : The user unchecks the box
      else {
        setUpdateForms({
          update: update.filter((e) => e !== value),
        });
      }
    }
    // Case 1 : The user checks the box
    if (name === "add") {
      if (checked) {
        setAddForms({
          add: [...add, value],
        });
      }
      // Case 2  : The user unchecks the box
      else {
        setAddForms({
          add: add.filter((e) => e !== value),
        });
      }
    }

    if (name === "delete") {
      if (checked) {
        setDeleteForms({
          delete_dt: [...delete_dt, value],
        });
      }
      // Case 2  : The user unchecks the box
      else {
        setDeleteForms({
          delete_dt: delete_dt.filter((e) => e !== value),
        });
      }
    }
  };
console.log(imageUrl)
  const formik = useFormik({
    initialValues: {
      createdBy: `${session?.email}`,
      name: "",
      logo: "",
      email: "",
      department: "",
      mobileNo: "",
      addressLine1: "",
      addressLine2: "",
      country: "",
      state: "",
      pinCode: "",
      userRole: "",
      formPermission: "",
      access: "",
      userName: "",
      password: "",
    },
    validate: userFormValidate,
    onSubmit,
  });

  async function onSubmit(values) {
    const data = {
      createdBy: values.createdBy,
      name: values.name,
      email: values.email,
      logo: imageUrl,
      department: values.department,
      mobileNo: values.mobileNo,
      addressLine1: values.addressLine1,
      addressLine2: values.addressLine2,
      country: values.country,
      state: values.state,
      pinCode: values.pinCode,
      userRole: values.userRole,
      access: { viewForms, updateForms, addForms, deleteForms },
      formPermission: selectForms,
      userName: values.userName,
      password: values.password,
    };
    console.log(data);
    let res = await fetch("/api/auth/signup", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res2 = await res.json();
    // console.log(res2)
    if (res2.status) {
      router.push("/create-user");
      toast.success(res2.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error(res2.message, {
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

  const imageUploadhandler = async (e) => {
    const body = new FormData();
    body.append("file", logoUrl);
    let res = await fetch(`/api/imageUpload`, {
      method: "POST",
      body,
    });
    let response = await res.json();
    await setImageUrl(response.newPath);
  };

  const [checkFile, setCheckFile] = useState(false);

  const imageHandler = (e) => {
    setLogoUrl(e.target.files[0]);
    setCheckFile(true);
  };

  const imagesubmission = () => {
    if (checkFile) {
      imageUploadhandler();
      alert("File Uploaded");
      console.log(logoUrl);
    } else {
      alert("select a file");
    }
  };

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
        className="grid lg:grid-cols-2 w-auto gap-2"
        encType="multipart/form-data"
      >
        <div className="flex gap-4 items-center">
          <div className="input-type flex gap-1 w-full">
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
                  className={`h-10 w-10 rounded-full ${
                    checkFile ? "opacity-1" : "opacity-0"
                  }`}
                  src={logoUrl ? URL.createObjectURL(logoUrl) : null}
                  alt={"userImg"}
                />
                <span className="text-[18px] w-56 truncate">
                  {checkFile ? logoUrl.name : "choose User Pic"}
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
          </div>
        </div>
        <div className={`${styles.input_group} ${formik.errors.name && formik.touched.name ? 'border-rose-600' : ''} ${!formik.errors.name && formik.touched.name ? 'border-green-600' : ''}`}>
          <input
            type="text"
            name="name"
            {...formik.getFieldProps("name")}
            className={styles.input_text}
            placeholder="Name"
          />
        </div>
        <div className={`${styles.input_group} ${formik.errors.email && formik.touched.email ? 'border-rose-600' : ''} ${!formik.errors.email && formik.touched.email ? 'border-green-600' : ''}`}>
          <input
            type="email"
            name="email"
            {...formik.getFieldProps("email")}
            className={styles.input_text}
            placeholder="Email"
          />
        </div>
        <div className={`${styles.input_group} ${formik.errors.department && formik.touched.department ? 'border-rose-600' : ''} ${!formik.errors.department && formik.touched.department ? 'border-green-600' : ''}`}>
          <input
            type="text"
            name="department"
            {...formik.getFieldProps("department")}
            className={styles.input_text}
            placeholder="Department"
          />
        </div>

        <div className="flex gap-4 items-center">
          <div className={`${styles.input_group} ${formik.errors.mobileNo && formik.touched.mobileNo ? 'border-rose-600' : ''} ${!formik.errors.mobileNo && formik.touched.mobileNo ? 'border-green-600' : ''}`}>
            <input
              type="text"
              name="mobileNo"
              {...formik.getFieldProps("mobileNo")}
              onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
              className={styles.input_text}
              placeholder="Mobile No."
            />
          </div>
          <div className={`${styles.input_group} ${formik.errors.userRole && formik.touched.userRole ? 'border-rose-600' : ''} ${!formik.errors.userRole && formik.touched.userRole ? 'border-green-600' : ''}`}>
            <select
              id="userRole"
              name="userRole"
              {...formik.getFieldProps("userRole")}
              className={styles.input_text}
            >
              <option value="">Choose User Role</option>
              {/* <option value="super admin">Super admin</option> */}
              <option value="admin">admin</option>
              <option value="user">user</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2 items-center">
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

        <div className="flex gap-2 items-center">
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
              type="number"
              name="pinCode"
              {...formik.getFieldProps("pinCode")}
              className={styles.input_text}
              placeholder="Zip Code"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className={`${styles.input_group} w-full ${formik.errors.formPermission && formik.touched.formPermission ? 'border-rose-600' : ''} ${!formik.errors.formPermission && formik.touched.formPermission ? 'border-green-600' : ''}`}>
            <Select
              options={Forms}
              name="formPermission"
              onChange={(e) =>
                setSelectForms(
                  Array.isArray(e) ? e.map((hotel) => hotel.value) : []
                )
              }
              isMulti
              placeholder="Form Permission"
              className={`w-full py-1 px-1 border rounded-xl bg-slate-50 focus:outline-none border-none`}
            />
          </div>
        </div>

        <div className="col-span-2">
          <div className="grid grid-cols-2 items-center gap-2">
            <div className={`${styles.input_group} ${formik.errors.userName && formik.touched.userName ? 'border-rose-600' : ''} ${!formik.errors.userName && formik.touched.userName ? 'border-green-600' : ''}`}>
              <input
                type="text"
                name="userName"
                {...formik.getFieldProps("userName")}
                className={styles.input_text}
                placeholder="User Name"
              />
            </div>
            <div className={`${styles.input_group} ${formik.errors.password && formik.touched.password ? 'border-rose-600' : ''} ${!formik.errors.password && formik.touched.password ? 'border-green-600' : ''}`}>
              <input
                type="password"
                name="userPassword"
                {...formik.getFieldProps("password")}
                className={styles.input_text}
                placeholder="User Password"
              />
            </div>
          </div>
        </div>

        <div className="col-span-2">
          <div className="grid grid-cols-1">
            {selectForms?.map((val, i) => (
              <>
                <div className="grid grid-rows grid-flow-col md:w-1/2 ">
                  <div className="flex items-center gap-1 w-64">{val} :- </div>
                  <div className="flex items-center gap-1">
                    <input
                      id="delete"
                      type="checkbox"
                      name="delete"
                      value={val}
                      // {...formik.getFieldProps("delete")}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="delete"
                      className="text-sm font-medium text-rose-600"
                    >
                      Delete
                    </label>
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      id="add"
                      type="checkbox"
                      value={val}
                      name="add"
                      // {...formik.getFieldProps("Add")}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="add"
                      className="text-sm font-medium text-green-600"
                    >
                      Add
                    </label>
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      id="update"
                      type="checkbox"
                      value={val}
                      name="update"
                      // {...formik.getFieldProps("update")}
                      // onChange={(e) => setAccess.update(e.target.value)}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="update"
                      className="text-sm font-medium text-yellow-600"
                    >
                      Update
                    </label>
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      id="veiw"
                      type="checkbox"
                      value={val}
                      name="veiw"
                      // {...formik.getFieldProps("veiw")}
                      // onChange={(e) => {
                      //   // e.target.value;
                      //   setVeiw([...veiw,e.target.value]);
                      // }}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="veiw"
                      className="text-sm font-medium text-blue-600"
                    >
                      Veiw
                    </label>
                  </div>
                </div>
              </>
            ))}

            {/* <div className="flex items-center gap-1">
              <input
                id="delete"
                type="checkbox"
                name="delete"
                value="Delete"
                {...formik.getFieldProps("delete")}
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="delete"
                className="text-sm font-medium text-rose-600"
              >
                Delete
              </label>
            </div>
            <div className="flex items-center gap-1">
              <input
                id="add"
                type="checkbox"
                value="Add"
                name="add"
                {...formik.getFieldProps("add")}
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="add"
                className="text-sm font-medium text-green-600"
              >
                Add
              </label>
            </div>
            <div className="flex items-center gap-1">
              <input
                id="update"
                type="checkbox"
                value="Update"
                name="update"
                {...formik.getFieldProps("update")}
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="update"
                className="text-sm font-medium text-yellow-600"
              >
                Update
              </label>
            </div>
            <div className="flex items-center gap-1">
              <input
                id="veiw"
                type="checkbox"
                value="Veiw"
                name="veiw"
                {...formik.getFieldProps("veiw")}
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="veiw"
                className="text-sm font-medium text-blue-600"
              >
                Veiw
              </label>
            </div> */}
          </div>
        </div>

        <button
          type="submit"
          className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-3 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500"
        >
          Add User
        </button>
      </form>
    </>
  );
}
