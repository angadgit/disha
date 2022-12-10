import React from "react";
import styles from "../../styles/Form.module.css";
import { BiPlusCircle } from "react-icons/bi";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

export default function AddProject({ funders, session }) {
  // console.log(funders)
  const router = useRouter();
  const refreshData = () => {
    router.replace("/project-manage");
  };
  const formik = useFormik({
    initialValues: {
      user: session?.email,
      projectName: "",
      funder: "",
      startingDate: "",
      endingDate: "",
      workArea: "",
      budgetAmount: "",
    },
    // validate: recepitValidate,
    onSubmit,
  });

  async function onSubmit(values) {
    // console.log(values);
    let res = await fetch(`/api/projectAddApi`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const res2 = await res.json();
    if (res2.success === "Success") {
      toast.success("Project Add Success !", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      await router.push("/project-manage");
      refreshData();
      formik.setValues({
        user: session?.email,
        projectName: "",
        funder: "",
        startingDate: "",
        endingDate: "",
        workArea: "",
        budgetAmount: "",
      });
    } else {
      toast.error("Project not insert !", {
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
      <form
        className="grid lg:grid-cols-2 w-auto gap-4"
        onSubmit={formik.handleSubmit}
      >
        <div className="">
          <div className={`${styles.input_group},`}>
            <input
              type="text"
              name="projectName"
              {...formik.getFieldProps("projectName")}
              className={styles.input_text}
              placeholder="Project Name"
            />
          </div>
        </div>

        <div className="col-span-2">
          <h1>Project highlights</h1> <hr className="mb-2" />
          <div className="grid lg:grid-cols-2 w-auto gap-4">
            <div
            // className={`${styles.input_group} w-full ${
            //   formik.errors.funder && formik.touched.funder
            //     ? "border-rose-600"
            //     : ""
            // } ${
            //   !formik.errors.funder && formik.touched.funder
            //     ? "border-green-600"
            //     : ""
            // }`}
            >
              <select
                id="funder"
                name="funder"
                {...formik.getFieldProps("funder")}
                className={styles.input_text}
              >
                <option value="">Choose a Funter</option>
                {funders.map((obj) => (
                  <option value={obj.funderName || ""} key={obj._id}>
                    {" "}
                    {obj.funderName}{" "}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div
          // className={`${styles.input_group} w-full ${
          //   formik.errors.recepitDate && formik.touched.recepitDate
          //     ? "border-rose-600"
          //     : ""
          // } ${
          //   !formik.errors.recepitDate && formik.touched.recepitDate
          //     ? "border-green-600"
          //     : ""
          // }`}
          className="flex"
        >
          <label className={`w-1/2 self-center`}>Start Date</label>
          <input
            type="date"
            name="startingDate"
            {...formik.getFieldProps("startingDate")}
            className={styles.input_text}
          />
        </div>
        <div
          // className={`${styles.input_group} w-full ${
          //   formik.errors.recepitDate && formik.touched.recepitDate
          //     ? "border-rose-600"
          //     : ""
          // } ${
          //   !formik.errors.recepitDate && formik.touched.recepitDate
          //     ? "border-green-600"
          //     : ""
          // }`}
          className="flex"
        >
          <label className={`w-1/2 self-center`}>End date</label>
          <input
            type="date"
            name="endingDate"
            {...formik.getFieldProps("endingDate")}
            className={styles.input_text}
          />
        </div>

        <div className={`${styles.input_group} col-span-2 `}>
          <textarea
            type="text"
            name="workArea"
            rows="2"
            {...formik.getFieldProps("workArea")}
            className={styles.input_text}
            placeholder="Work Area"
          />
        </div>

        <div className="">
          <div className={`${styles.input_group},`}>
            <input
              type="text"
              name="budgetAmount"
              {...formik.getFieldProps("budgetAmount")}
              className={styles.input_text}
              placeholder="Budget Amount"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <button
            type="submit"
            className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-3 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500"
          >
            Add
          </button>
        </div>
      </form>
    </>
  );
}
