import Head from "next/head";
import React from 'react'
import DefaultLayout from '../DefaultLayout';
import AddUserForm from '../../components/create-user/addUserForm';
import UsersList from '../../components/create-user/table';
import UserTable from '../../components/create-user/userTable';

const CreateUsers = ({ Users, err , session}) => {
  const [visible, setVisible] = React.useState(false)

  const addAccess = session?.access?.map((item) => item.addForms.add)
  const deleteAccess = session?.access?.map((item) => item.deleteForms.delete_dt)
  const viewAccess = session?.access?.map((item) => item.viewForms.view)
  const updateAccess = session?.access?.map((item) => item.updateForms.update)

  const addForm = addAccess.map((item) => item.indexOf("recepit") !== -1)
  const viewTable = viewAccess.map((item) => item.indexOf("recepit") !== -1)

  const handler = () => {
    setVisible(!visible)
  }

  if(err) return alert(err)
  return (
    <>
    <Head>
        <title>User Created</title>
      </Head>
    <DefaultLayout session={session}>
      {session?.userRole === "super admin" ? <div className="container mx-auto flex justify-between py-5 border-b">
        <div className="left flex gap-3">
          <button className='flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-grary-50 hover:border-indigo-500 hover:text-gray-800' onClick={handler}>Add Users</button>
        </div>
      </div> : ""}

      {addForm[0] ? <div className="container mx-auto flex justify-between py-5 border-b">
        <div className="left flex gap-3">
          <button className='flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-grary-50 hover:border-indigo-500 hover:text-gray-800' onClick={handler}>Add Users</button>
        </div>
      </div> : ""}


      {/* collapsable form */}
      <div className="container mx-auto py-3">
        {visible ? <AddUserForm session={session}/> : <></>}
      </div>

      {/* table */}
      {session?.userRole === "super admin" ? <div className="container mx-auto">
        <UserTable session={session} Users={Users} />
      </div> : ""}
      {viewTable[0] ? <div className="container mx-auto">
        <UserTable session={session} Users={Users} deleteAccess={deleteAccess} viewAccess={viewAccess} updateAccess={updateAccess} />
      </div> : ""}
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

    const res = await fetch(`${process.env.BaseURL}api/users`)
    const dt = await res.json()
    const Users = dt.filter(item => item.createdBy === session?.createdBy)
    // console.log(session?.createdBy)
    // console.log(dt.map(item => item))
    // console.log(session?.email)

    if (!session) {
      return {
        redirect: {
          destination: "/login",
          premanent: false
        }
      }
    }
    // authorize user return session
    return {
      props: { session, Users }
    }
  } catch (error) {
    console.error("Error fetching homepage data", error);
    const err = await error.json()

    return {
      props: { err }
    }

  }

}

export default CreateUsers