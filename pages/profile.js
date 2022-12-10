import Head from "next/head";
import DefaultLayout from './DefaultLayout';
import Image from "next/image";

export default function Profile({session}) {

  const logo = session?.logo?.split("./public");

  // console.log(session?.user.addressLine1, session?.user.addressLine2, session?.user.country, session?.user.state, session?.user.pinCode)

  const fullAddress = (session?.addressLine1, session?.addressLine2, session?.country, session?.state, session?.pinCode)

  return (
    <>
    <Head><title>User Profile</title></Head>
    <DefaultLayout session={session}>
      <section className="text-gray-600 body-font bg-white rounded-lg shadow-lg">
        <div className="container mx-auto flex pt-5 md:flex-row flex-col items-center w-fit">
          <h3 className="text-4xl font-bold">User Profile</h3>
        </div>
        <div className="container mx-auto flex px-5 py-10 md:flex-row flex-col` w-fit">
          {session?.logo ?
            <div className="lg:max-w-lg lg:w-auto md:w-auto w-auto mb-10 md:mb-0">
              <Image 
                  src={logo[0]} 
                  // src={"/assets/vedvika.png"}
                  width={250} height={250} alt={"logo"} className="object-cover object-center rounded outline-gray-500" />
              {/* <Image className="object-cover object-center rounded" alt="user img" src={logo[1]} width={300} height={300} /> */}
            </div> :
            <div className="lg:max-w-lg lg:w-36 md:w-36 w-5/6 mb-10 md:mb-0">
              <svg className="object-cover object-center rounded outline" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
            </div>
          }

          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <div className='details'>
              <div className="grid grid-cols-2 gap-3">
                <span className="font-bold text-lg">Name</span>
                <h1 className="text-lg capitalize text-gray-700 font-sans">{session?.name}</h1>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <span className="font-bold text-lg">Email</span>
                <h1 className="text-lg text-gray-700 font-sans">{session?.email}</h1>
              </div>

              {session?.mobileNo ? <div className="grid grid-cols-2 gap-3">
                <span className="font-bold text-lg">Mobile</span>
                <h1 className="text-lg text-gray-700 font-sans">{session.mobileNo}</h1>
              </div> : ""}


              {
                session?.department ? <div className="grid grid-cols-2 gap-3">
                  <span className="font-bold text-lg">Department</span>
                  <h1 className="text-lg text-gray-700 font-sans">{session?.department}</h1>
                </div> : ""
              }

              {fullAddress ? <div className="grid grid-cols-2 gap-3">
                <span className="font-bold text-lg">Address</span>
                <h1 className="text-lg text-gray-700 font-sans">{session?.addressLine1}, {session?.addressLine2} <br />{session?.country}, {session?.state} - {session?.pinCode} </h1>
              </div> : ""}


              <div className="grid grid-cols-2 gap-3">
                <span className="font-bold text-lg">Role</span>
                <h1 className="text-lg text-gray-700 font-sans">{session?.userRole}</h1>
              </div>
              
            </div>
          </div>
        </div>
      </section>

    </DefaultLayout>
    </>
  )
}

export async function getServerSideProps({ req }) {

  const { cookies } = req;
  const jwt = cookies.OursiteJWT;
  const user = await fetch(`${process.env.BaseURL}api/users/${jwt}`);
  const session = await user.json();

  try {
    // const session = await getSession({ req })

    if (!session) {
      return {
        redirect: {
          destination: "/login",
          premanent: false
        }
      }
    }

    // const res = await fetch(`${process.env.BaseURL}api/companyProfileApi`)
    // const profileData = await res.json()
    // const data = profileData?.filter((item) => item.user === session.user.email);

    // authorize user return session
    return {
      props: { session }
    }
  } catch (error) {
    console.error("Error fetching homepage data", error);
  }
}