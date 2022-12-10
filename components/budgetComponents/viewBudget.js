import useSWR from 'swr'
import { NumericFormat } from 'react-number-format';


const fetcher = (...args) => fetch(...args).then(res => res.json())

function ViewBudget({id}) {
  // console.log("id", id)
  const { data, error } = useSWR(`/api/budgetApi/${id}`, fetcher)

// console.log(data?.item.map(dt => dt ))
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return (
    <>
      <section className="text-gray-600 body-font bg-white rounded-lg shadow-lg">
        <div className="container mx-auto flex pt-5 md:flex-row flex-col items-center w-fit">
          <h3 className="text-4xl font-bold">Budget Details</h3>
        </div>
        <div className="container mx-auto flex px-5 py-10 md:flex-row flex-col items-center w-fit">

          <div className="lg:flex-grow md:w-auto flex flex-col md:items-start md:text-left items-center text-center">
            <div className='details'>
              <div className="grid grid-cols-2 gap-3">
                <span className="font-bold text-lg">Funder Name</span>
                <h1 className="text-lg capitalize text-gray-700 font-sans">{data.funderName}</h1>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <span className="font-bold text-lg">Project Name</span>
                <h1 className="text-lg text-gray-700 font-sans">{data.projectName}</h1>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <span className="font-bold text-lg">Program Name</span>
                <h1 className="text-lg text-gray-700 font-sans">{data.programName}</h1>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <span className="font-bold text-lg">Program Remark</span>
                <h1 className="text-lg text-gray-700 font-sans">{data.programRemark}</h1>
              </div>

             <div className="grid grid-cols-2 gap-3">
                  <span className="font-bold text-lg">Activity Name</span>
                  <h1 className="text-lg text-gray-700 font-sans">{data.activityName}</h1>
                </div>

             <div className="grid grid-cols-2 gap-3">
                  <span className="font-bold text-lg">Activity Remark</span>
                  <h1 className="text-lg text-gray-700 font-sans">{data.activityRemark}</h1>
                </div>

             <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr >
      <th scope="col" className="py-3 px-6">Item</th>
      <th scope="col" className="py-3 px-6">Qty</th>
      <th scope="col" className="py-3 px-6">Amount</th>
      <th scope="col" className="py-3 px-6">Remark</th>
    </tr>
  </thead>
  <tbody>
    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{
        data?.item.map((dt)=>

dt.item )
      }</th>

    <td className="py-4 px-6">{
        data?.item.map((dt)=>

dt.qty )
      }</td>

    <td className="py-4 px-6">{
        data?.item.map((dt)=>

dt.amt )
      }</td>

    <td className="py-4 px-6">{
        data?.item.map((dt)=>

dt.rem )
      }</td>

      {/* {
        data?.item.map((dt)=><div>

<td>{dt.item}</td>
      <td>{dt.qty}</td>
      <td>{dt.amt}</td>
      <td>{dt.rem}</td>
        </div> )
      } */}
    </tr>
  </tbody>
</table>
                </div>
              
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ViewBudget
