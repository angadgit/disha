import useSWR from 'swr'
import { NumericFormat } from 'react-number-format';


const fetcher = (...args) => fetch(...args).then(res => res.json())

function ViewProject({id}) {
  // console.log("id", id)
  const { data, error } = useSWR(`/api/projectAddApi/${id}`, fetcher)

// console.log(data)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return (
    <>
      <section className="text-gray-600 body-font bg-white rounded-lg shadow-lg">
        <div className="container mx-auto flex pt-5 md:flex-row flex-col items-center w-fit">
          <h3 className="text-4xl font-bold">Project Details</h3>
        </div>
        <div className="container mx-auto flex px-5 py-10 md:flex-row flex-col items-center w-fit">

          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <div className='details'>
              <div className="grid grid-cols-2 gap-3">
                <span className="font-bold text-lg">Project Name</span>
                <h1 className="text-lg capitalize text-gray-700 font-sans">{data.projectName}</h1>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <span className="font-bold text-lg">Funder</span>
                <h1 className="text-lg text-gray-700 font-sans">{data.funder}</h1>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <span className="font-bold text-lg">Starting Date</span>
                <h1 className="text-lg text-gray-700 font-sans">{data.startingDate}</h1>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <span className="font-bold text-lg">Ending Date</span>
                <h1 className="text-lg text-gray-700 font-sans">{data.endingDate}</h1>
              </div>

             <div className="grid grid-cols-2 gap-3">
                  <span className="font-bold text-lg">Budget Amount</span>
                  {/* <h1 className="text-lg text-gray-700 font-sans">{data.budgetAmount}</h1> */}
                  <NumericFormat
            value={data.budgetAmount}
            prefix="Rs. "
            thousandSeparator=","
            displayType={'text'}
            className='text-xl cursor-default'
          />
                </div>

             <div className="grid grid-cols-2 gap-3">
                  <span className="font-bold text-lg">Work Area</span>
                  <h1 className="text-lg text-gray-700 font-sans">{data.workArea}</h1>
                </div>
              
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ViewProject
