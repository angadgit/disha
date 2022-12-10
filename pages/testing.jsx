// import React, {useState, useEffect} from 'react'

// export default function testing() {

//   const [formValues, setFormValues] = React.useState([
//     { 
//       funder: "", 
//       project: "",
//      program: [{
//       programName:"", 
//       activity:[{
//           activityName:"",
//           items:[{
//             item:"",
//             qty:"",
//             rate:"",
//             amount:"",
//             remark:"",
//           }]
//         }
//       ]

//     }] },
//   ]);

//   console.log(formValues)

//   const handleChange = (i, e) => {
//     let newFormValues = [...formValues];
//     newFormValues[i][e.target.name] = e.target.value;
//     setFormValues(newFormValues);
//   };

//   // useEffect(()=>{
//   // },[])
//   const pro = formValues.map(item => (item.program))
// console.log(pro)

//   const handleChangeProgram = (i, e) => {
//     let newFormValues = pro;
//     newFormValues[i][e.target.name] = e.target.value;
//     console.log(newFormValues);
//   };

//   const handleSubmit=(e)=>{
//     e.preventDefault();
//     console.log(formValues)
//   }

//   return (
//     <div>
//       <form
//         method="POST"
//         onSubmit={handleSubmit}
//         className="container justify-center bg-white p-5 flex flex-col mx-auto mt-0 mb-5 rounded-2xl "
//       >

// {formValues.map((element, index) => (
//           // eslint-disable-next-line react/jsx-key
//           <div className="grid lg:grid-cols-2 gap-2" key={index}>
//             <div className="">
//               <label
//                 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//                 htmlFor="grid-state"
//               >
//                 Funder
//               </label>
//               <div className="relative">
//                 <input
//                   value={element.funder || ""}
//                   onChange={(e) => handleChange(index, e)}
//                   // className={styles.input_text}
//                   id="funder"
//                   name="funder"
//                   type="text"
//                   placeholder="Funder"
//                 />
//               </div>
//             </div>
//             <div className="">
//               <label
//                 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//                 htmlFor="grid-state"
//               >
//                 Project
//               </label>
//               <div className="relative">
//                 <input
//                   value={element.project || ""}
//                   onChange={(e) => handleChange(index, e)}
//                   // className={styles.input_text}
//                   id="project"
//                   name="project"
//                   type="text"
//                   placeholder="Project"
//                 />
//               </div>
//             </div>


//             {
//         element.program.map((element, index)=>(
// <div className="grid lg:grid-cols-1 gap-2" key={index}>
// <div className="">
//               <label
//                 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//                 htmlFor="grid-state"
//               >
//                 Program Name
//               </label>
//               <div className="relative">
//                 <input
//                   value={element.programName || ""}
//                   onChange={(e) => handleChangeProgram(index, e)}   
//                   // className={styles.input_text}
//                   id="programName"
//                   name="programName"
//                   type="text"
//                   placeholder="Program Name"
//                 />
//               </div>
//             </div>

//             {
//         element.activity.map((element, index)=>(
// <div className="grid lg:grid-cols-1 gap-2" key={index}>
// <div className="">
//               <label
//                 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//                 htmlFor="grid-state"
//               >
//                 Activity Name
//               </label>
//               <div className="relative">
//                 <input
//                   value={element.activityName || ""}
//                   // onChange={(e) => handleChange_3(index, e)}
//                   // className={styles.input_text}
//                   id="activityName"
//                   name="activityName"
//                   type="text"
//                   placeholder="Activity Name"
//                 />
//               </div>
//             </div>

//             {
//         element.items.map((element, index)=>(
// <div className="grid lg:grid-cols-5 gap-2" key={index}>
// <div className="">
//               <label
//                 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//                 htmlFor="grid-state"
//               >
//                 Item
//               </label>
//               <div className="relative">
//                 <input
//                   value={element.item || ""}
//                   // onChange={(e) => handleChange_3(index, e)}
//                   // className={styles.input_text}
//                   id="item"
//                   name="item"
//                   type="text"
//                   placeholder="Item"
//                 />
//               </div>
//             </div>

//             <div className="">
//               <label
//                 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//                 htmlFor="grid-state"
//               >
//                 Qty
//               </label>
//               <div className="relative">
//                 <input
//                   value={element.qty || ""}
//                   // onChange={(e) => handleChange_3(index, e)}
//                   // className={styles.input_text}
//                   id="qty"
//                   name="qty"
//                   type="text"
//                   placeholder="Qty"
//                 />
//               </div>
//             </div>

//             <div className="">
//               <label
//                 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//                 htmlFor="grid-state"
//               >
//                 rate
//               </label>
//               <div className="relative">
//                 <input
//                   value={element.rate || ""}
//                   // onChange={(e) => handleChange_3(index, e)}
//                   // className={styles.input_text}
//                   id="rate"
//                   name="rate"
//                   type="text"
//                   placeholder="Rate"
//                 />
//               </div>
//             </div>

//             <div className="">
//               <label
//                 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//                 htmlFor="grid-state"
//               >
//                 Amount
//               </label>
//               <div className="relative">
//                 <input
//                   value={element.amount || ""}
//                   // onChange={(e) => handleChange_3(index, e)}
//                   // className={styles.input_text}
//                   id="amount"
//                   name="amount"
//                   type="text"
//                   placeholder="Amount"
//                 />
//               </div>
//             </div>

//             <div className="">
//               <label
//                 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//                 htmlFor="grid-state"
//               >
//                 Remark
//               </label>
//               <div className="relative">
//                 <input
//                   value={element.remark || ""}
//                   // onChange={(e) => handleChange_3(index, e)}
//                   // className={styles.input_text}
//                   id="remark"
//                   name="remark"
//                   type="text"
//                   placeholder="Remark"
//                 />
//               </div>
//             </div>

// </div>
//         ))
//       }

// </div>
//         ))
//       }

// </div>
//         ))
//       }


//           </div>

      

//         ))}
//         <div className="md:w-2/3">
//           <button
//             className="shadow mt-3 bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
//             type="submit"
//             name="submit"
//           >
//             Submit
//           </button>
//         </div>
// </form>
//     </div>
//   )
// }

import React from 'react'

function Testing() {
  return (
    <div>Testing</div>
  )
}

export default Testing