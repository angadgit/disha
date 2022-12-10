import useSWR from 'swr'
import Image from 'next/image'

const fetcher = (...args) => fetch(...args).then(res => res.json())

function ViewUser({id}) {
  // console.log("id", id)
  const { data, error } = useSWR(`/api/users/${id}`, fetcher)

// console.log(data)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return (
    <div >

      <section className="text-gray-600 body-font bg-white rounded-lg shadow-lg">
        <div className="container mx-auto flex pt-5 md:flex-row flex-col items-center w-fit">
          <h3 className="text-4xl font-bold">User Details</h3>
        </div>
        <div className="container mx-auto flex px-5 py-10 md:flex-row flex-col items-center w-fit">

            <div className="lg:max-w-lg lg:w-36 md:w-36 w-5/6 mb-10 md:mb-0">
            <Image
      src={data.logo}
      alt="Picture of the User"
      width={500}
      height={500}
    />
            </div>

          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <div className='details'>
              <div className="grid grid-cols-2 gap-3">
                <span className="font-bold text-lg">Name</span>
                <h1 className="text-lg capitalize text-gray-700 font-sans">{data.name}</h1>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <span className="font-bold text-lg">Email</span>
                <h1 className="text-lg text-gray-700 font-sans">{data.email}</h1>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <span className="font-bold text-lg">Department</span>
                <h1 className="text-lg text-gray-700 font-sans">{data.department}</h1>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <span className="font-bold text-lg">Contact Number</span>
                <h1 className="text-lg text-gray-700 font-sans">{data.mobileNo}</h1>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <span className="font-bold text-lg">Address</span>
                <h1 className="text-lg text-gray-700 font-sans">{data.addressLine1}, {data.addressLine2}, {data.country}, {data.state} - {data.pinCode}</h1>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <span className="font-bold text-lg">User Role</span>
                <h1 className="text-lg text-gray-700 font-sans">{data.userRole}</h1>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <span className="font-bold text-lg">Access</span>
                <h1 className="text-lg text-gray-700 font-sans">{data.access}</h1>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <span className="font-bold text-lg">Form Permission</span>
                <h1 className="text-lg text-gray-700 font-sans">{data.formPermission}</h1>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <span className="font-bold text-lg">User Name</span>
                <h1 className="text-lg text-gray-700 font-sans">{data.userName}</h1>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <span className="font-bold text-lg">Password</span>
                <h1 className="text-lg text-gray-700 font-sans">{data.password}</h1>
              </div>
              
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ViewUser
