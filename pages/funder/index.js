import Head from "next/head";
import React from 'react'
import DefaultLayout from '../DefaultLayout';
import { BiUserPlus } from "react-icons/bi";
// import FunderForm from '../../components/funder/funderForm';
// import FunderTable from '../../components/funder/funderTable';
import { useSelector, useDispatch } from 'react-redux';
import { toggleChangeAction, deleteAction } from '../../redux/reducer';
import { BiX, BiCheck } from "react-icons/bi";
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetServerSideProps } from 'next'
import { Axios } from 'axios';
import dynamic from "next/dynamic";

const FunderForm = dynamic(() => import("../../components/funder/funderForm"));
const FunderTable = dynamic(() => import("../../components/funder/funderTable"));

export default function Funder({ funderData, recepitData , session}) {

  // console.log(session.user.userRole)
  const router = useRouter()
  const visible = useSelector((state) => state.app.client.toggleForm)
  const deleteId = useSelector(state => state.app.client.deleteId)
  const formId = useSelector((state) => state.app.client.formId)


  const addAccess = session?.access?.map((item) => item.addForms.add)
  const deleteAccess = session?.access?.map((item) => item.deleteForms.delete_dt)
  const viewAccess = session?.access?.map((item) => item.viewForms.view)
  const updateAccess = session?.access?.map((item) => item.updateForms.update)

  const addForm = addAccess?.map((item) => item.indexOf("funder") !== -1)
  const viewTable = viewAccess?.map((item) => item.indexOf("funder") !== -1)

  const dispatch = useDispatch()

  const refreshData = () => {
    router.replace(router.asPath);
  }

  const handler = () => {
    dispatch(toggleChangeAction())
  }

  const [ftCheck, setFtCheck] = React.useState()
  if (!funderData) return <div>Funder Loading...</div>;


  const deletehandler = async () => {
    const id = deleteId;
    if (id) {
      if (recepitData.map(item => item.fullName).indexOf(ftCheck)) {
        await fetch(`/api/funderApi/${id}`, { method: "DELETE", })
        refreshData();
        await dispatch(deleteAction(null));
        toast.success('Funder Removed', {
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
      else {
        toast.info('Receipt generated please remove receipt !', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        await dispatch(deleteAction(null));
      }
    }
  }

  const canclehandler = async () => {
    await dispatch(deleteAction(null))
  }

  try {
    return (
      <>
      <Head>
        <title>Funder</title>
      </Head>
      <DefaultLayout session={session}>
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

        <div className="container mx-auto flex justify-between py-5 border-b">
          <div className="left flex gap-3">

            {/* admin add funder access  */}
            {session?.userRole === "super admin" ? <button className='flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-grary-50 hover:border-indigo-500 hover:text-gray-800' onClick={handler}>
              Add Funder <span className='px-1'><BiUserPlus size={23}></BiUserPlus></span>
            </button> : ""}

            {/* users add funder access are not  */}
            {addForm[0] ? <button className='flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-grary-50 hover:border-indigo-500 hover:text-gray-800' onClick={handler}>
              Add Funder <span className='px-1'><BiUserPlus size={23}></BiUserPlus></span>
            </button> : <div></div>}

          </div>
          {deleteId ? DeleteComponent({ deletehandler, canclehandler }) : <></>}
        </div>

        {/* collapsable form */}
        {visible ? <FunderForm data={funderData} session={session} /> : <></>}

        {/* table */}

        {/* access for admin  */}
        {session?.userRole === "super admin" ? <div className="container mx-auto">
          <FunderTable session={session} Funders={funderData} recepitData={recepitData} deleteAccess={deleteAccess} viewAccess={viewAccess} updateAccess={updateAccess} />
        </div> : ""}

        {/* access for users  */}
        {viewTable[0] ? <div className="container mx-auto">
          <FunderTable session={session} Funders={funderData} recepitData={recepitData} deleteAccess={deleteAccess} viewAccess={viewAccess} updateAccess={updateAccess} />
        </div> : ""}

      </DefaultLayout>
      </>
    )
  } catch (error) {
    alert(error)
  }
}

function DeleteComponent({ deletehandler, canclehandler }) {
  return (
    <div className='flex gap-5'>
      <button>Are you sure?</button>
      <button onClick={deletehandler} className='flex bg-red-500 text-white px-4 py-2 border rounded-md hover:bg-rose-500 hover:border-red-500 hover:text-gray-50'>
        Yes <span className='px-1'><BiX color='rgb(255 255 255)' size={25} /></span></button>
      <button onClick={canclehandler} className='flex bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gree-500 hover:border-green-500 hover:text-gray-50'>
        No <span className='px-1'><BiCheck color='rgb(255 255 255)' size={25} /></span></button>
    </div>
  )
}

export async function getServerSideProps({ req, res }) {

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=43200, stale-while-revalidate=60'
  )

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

    const res = await fetch(`${process.env.BaseURL}api/funderApi`)
    const funders = await res.json()
    const funderData = funders?.filter((item) => item.user === session?.createdBy);

    const res2 = await fetch(`${process.env.BaseURL}api/recepitApi`)
    const dt = await res2.json()
    const recepitData = dt.filter(item => item.user === session?.createdBy)

    return {
      props: (async function () {
        return {
          session, funderData, recepitData
        }
      })(),
      // props: { session, funderData, recepitData }
    }
  } catch (error) {
    console.error("Error fetching homepage data", error);
  }

}

// export const getServerSideProps: GetServerSideProps  = async ({ req }) => {
//   try {
//     const session = await getSession({ req })
//     if (!session) {
//       return {
//         redirect: {
//           destination: "/login",
//           premanent: false
//         }
//       }
//     }

//     const res = await Axios.get('/api/funderApi')
//     const funders = await res.json()
//     const funderData = funders?.filter((item) => item.user === session.user.createdBy);

//     const res2 = await Axios.get(`/api/recepitApi`)
//     const dt = await res2.json()
//     const recepitData = dt.filter(item => item.user === session.user.createdBy)

//     return { props: { funderData, recepitData, session } }

//   } catch (err) {
//     return { props: { error: 'Something went wrong' } }
//   }
// }
