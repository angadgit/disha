import useSWR from 'swr'


const fetcher = (...args) => fetch(...args).then(res => res.json())

function ViewFunder({id}) {
  // console.log("id", id)
  const { data, error } = useSWR(`/api/funderApi/${id}`, fetcher)

// console.log(data)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return (
    <>
      <section className="text-gray-600 body-font bg-white rounded-lg shadow-lg">
        <div className="container mx-auto flex pt-5 md:flex-row flex-col items-center w-fit">
          <h3 className="text-4xl font-bold">Funder Details</h3>
        </div>
        <div className="container mx-auto flex px-5 py-10 md:flex-row flex-col items-center w-fit">

            <div className="lg:max-w-lg lg:w-36 md:w-36 w-5/6 mb-10 md:mb-0">
              <svg className="object-cover object-center rounded outline" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
            </div>

          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <div className='details'>
              <div className="grid grid-cols-2 gap-3">
                <span className="font-bold text-lg">Name</span>
                <h1 className="text-lg capitalize text-gray-700 font-sans">{data.funderName}</h1>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <span className="font-bold text-lg">Email</span>
                <h1 className="text-lg text-gray-700 font-sans">{data.email}</h1>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <span className="font-bold text-lg">Contact Person</span>
                <h1 className="text-lg text-gray-700 font-sans">{data.contactPerson}</h1>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <span className="font-bold text-lg">Contact Number</span>
                <h1 className="text-lg text-gray-700 font-sans">{data.contactNumber}</h1>
              </div>

             <div className="grid grid-cols-2 gap-3">
                  <span className="font-bold text-lg">PAN</span>
                  <h1 className="text-lg text-gray-700 font-sans">{data.pan}</h1>
                </div>

             <div className="grid grid-cols-2 gap-3">
                  <span className="font-bold text-lg">Funder Type</span>
                  <h1 className="text-lg text-gray-700 font-sans">{data.funderType}</h1>
                </div>

             <div className="grid grid-cols-2 gap-3">
                  <span className="font-bold text-lg">Funder Category</span>
                  <h1 className="text-lg text-gray-700 font-sans">{data.funderCategory}</h1>
                </div>

              <div className="grid grid-cols-2 gap-3">
                <span className="font-bold text-lg">Address</span>
                <h1 className="text-lg text-gray-700 font-sans">{data.addressLine1}, {data.addressLine2}, {data.country}, {data.state} - {data.pinCode}</h1>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <span className="font-bold text-lg">Nationality</span>
                <h1 className="text-lg text-gray-700 font-sans">{data.nationality}</h1>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <span className="font-bold text-lg">Website</span>
                <h1 className="text-lg text-gray-700 font-sans">{data.website}</h1>
              </div>
              
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ViewFunder
