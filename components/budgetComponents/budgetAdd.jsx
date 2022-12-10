import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../styles/Form.module.css";
import { useFormik } from "formik";
import { useRouter } from "next/router";

const BudgetAdd = ({ session, funderData, projectData }) => {
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };
  // Purchasing Item
  const [formValues2, setFormValues2] = useState([
    { item: "", qty: "", amt: "", rem: "" },
  ]);

  // Purchasing Item
  let addFormFields2 = () => {
    setFormValues2([...formValues2, { item: "", qty: "", amt: "", rem: "" }]);
  };
  // console.log(setFormValues2);
  let removeFormFields2 = (i) => {
    let newFormValues2 = [...formValues2];
    newFormValues2.splice(i, 1);
    setFormValues2(newFormValues2);
  };

  const handleChange_3 = (i, e) => {
    let newFormValues2 = [...formValues2];
    newFormValues2[i][e.target.name] = e.target.value;
    setFormValues2(newFormValues2);
  };

  const formik = useFormik({
    initialValues: {
      user: session?.createdBy,
      funderName: "",
      projectName: "",
      programName: "",
      programRemark: "",
      activityName: "",
      activityRemark: "",
      item: "",
    },
    // validate: funderValidate,
    onSubmit,
  });

  async function onSubmit(values) {
    console.log(values);
    const data = {
      user: session?.createdBy,
      funderName: values.funderName,
      projectName: values.projectName,
      programName: values.programName,
      programRemark: values.programRemark,
      activityName: values.activityName,
      activityRemark: values.activityRemark,
      item: formValues2,
    };
    console.log(JSON.stringify(data));
    let res = await fetch("/api/budgetApi", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(data),
      body: JSON.stringify(data),
    });
    const res2 = await res.json();
    if (res2.success === "Success") {
      toast.success("Budget Add Success...!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      refreshData();
      setFormValues2([formValues2, { item: "", qty: "", amt: "", rem: "" }]);
      // setFormValues2();
      // [formValues2].splice([]);
      // removeFormFields2();
      formik.setValues({
        user: session?.createdBy,
        funderName: "",
        projectName: "",
        programName: "",
        programRemark: "",
        activityName: "",
        activityRemark: "",
        item: "",
      });
      router.push("/budget");
    } else {
      toast.error("budget not insert !", {
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
    <div>
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
      />
      <form
        method="POST"
        onSubmit={formik.handleSubmit}
        className="container justify-center bg-white p-5 flex flex-col mx-auto mt-0 mb-5 rounded-2xl "
      >
        <h1 className="mb-4 text-2xl font-bold text-center text-gray-800 lg:text-3xl md:mb-3">
          Generate Budget
        </h1>

        <div className="flex flex-wrap -mx-3 mb-3">
          <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-zip"
            >
              Select Funder
            </label>
            <select
              id="funderName"
              name="funderName"
              {...formik.getFieldProps("funderName")}
              className={styles.input_text}
            >
              <option value="">Choose a Funter</option>
              {funderData.map((obj) => (
                <option value={obj.funderName || ""} key={obj._id}>
                  {" "}
                  {obj.funderName}{" "}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Project
            </label>
            <select
              id="projectName"
              name="projectName"
              {...formik.getFieldProps("projectName")}
              className={styles.input_text}
            >
              <option value="">Choose a Project</option>
              {projectData.map((obj) => (
                <option value={obj.projectName || ""} key={obj._id}>
                  {" "}
                  {obj.projectName}{" "}
                </option>
              ))}
            </select>
          </div>
        </div>

        <h2 className="mb-4 text-2xl font-bold text-gray-800 lg:text-xl md:mb-3">
          Program
        </h2>

        <div className="grid lg:grid-cols-2 w-auto gap-2 mb-4">
          <div className={`${styles.input_group} `}>
            <input
              type="text"
              name="programName"
              {...formik.getFieldProps("programName")}
              className={styles.input_text}
              placeholder="Program Name"
            />
          </div>
          <div className={`${styles.input_group} `}>
            <input
              type="text"
              name="programRemark"
              {...formik.getFieldProps("programRemark")}
              className={styles.input_text}
              placeholder="Depreciation"
            />
          </div>
        </div>

        <h2 className="mb-4 text-2xl font-bold text-gray-800 lg:text-xl md:mb-3">
          Activity
        </h2>

        <div className="grid lg:grid-cols-2 w-auto gap-2 mb-4">
          <div className={`${styles.input_group} `}>
            <input
              type="text"
              name="activityName"
              {...formik.getFieldProps("activityName")}
              className={styles.input_text}
              placeholder="Activity Name"
            />
          </div>
          <div className={`${styles.input_group} `}>
            <input
              type="text"
              name="activityRemark"
              {...formik.getFieldProps("activityRemark")}
              className={styles.input_text}
              placeholder="Depreciation"
            />
          </div>
        </div>

        <h2 className="mb-4 text-2xl font-bold text-gray-800 lg:text-xl md:mb-3">
          Purchasing Item
        </h2>

        {formValues2.map((element, index) => (
          // eslint-disable-next-line react/jsx-key
          <div className="grid lg:grid-cols-5 gap-2" key={index}>
            <div className="">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-state"
              >
                Item
              </label>
              <div className="relative">
                <input
                  value={element.item || ""}
                  onChange={(e) => handleChange_3(index, e)}
                  className={styles.input_text}
                  id="item"
                  name="item"
                  type="text"
                  placeholder="Item"
                />
              </div>
            </div>
            <div className="">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-state"
              >
                Qty
              </label>
              <div className="relative">
                <input
                  value={element.qty || ""}
                  onChange={(e) => handleChange_3(index, e)}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  className={styles.input_text}
                  id="qty"
                  name="qty"
                  type="text"
                  placeholder="Qty"
                />
              </div>
            </div>
            <div className="">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-zip"
              >
                Amount
              </label>
              <input
                value={element.amt || ""}
                onChange={(e) => handleChange_3(index, e)}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                className={styles.input_text}
                id="amt"
                name="amt"
                type="text"
                placeholder="Amount"
              />
            </div>
            <div className="">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-zip"
              >
                Remark
              </label>
              <input
                value={element.rem || ""}
                onChange={(e) => handleChange_3(index, e)}
                className={styles.input_text}
                id="rem"
                name="rem"
                type="text"
                placeholder="Remark"
              />
            </div>
            <div className="grid lg:grid-cols-2 w-auto gap-1">
              {index ? (
                <button
                  type="button"
                  className="button remove shadow mt-7 bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-4 rounded"
                  onClick={() => removeFormFields2(index)}
                >
                  Remove
                </button>
              ) : null}
              <button
                onClick={() => addFormFields2()}
                className="shadow mt-7 bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-4 rounded"
                type="button"
                name="add_item"
              >
                Add
              </button>
            </div>
          </div>
        ))}

        <div className="md:w-2/3">
          <button
            className="shadow mt-3 bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
            name="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BudgetAdd;
