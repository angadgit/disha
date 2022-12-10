import Head from "next/head";
import React from "react";
import App from "../DefaultLayout";
import { useEffect, useState } from "react";
import { BiStoreAlt } from "react-icons/bi";
import AddProject from "../../components/project-manage/addProject";
// import GanttChart from "../components/GanttChart/GanttChart";
import useSWR from "swr";
import ProjectTable from "../../components/project-manage/projectTables";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ProjectManage( {session}) {
  const [visible, setVisible] = React.useState(false);

  const { data: funder, error } = useSWR("/api/funderApi", fetcher);
  const funderdata = funder?.filter((item) => item.user === session?.email);
  const { data: projects } = useSWR("/api/projectAddApi", fetcher);
  const ProjectData = projects?.filter(
    (item) => item.user === session?.email
  );

  const addAccess = session?.access?.map((item) => item.addForms.add);
  const deleteAccess = session?.access?.map(
    (item) => item.deleteForms.delete_dt
  );
  const viewAccess = session?.access?.map((item) => item.viewForms.view);
  const updateAccess = session?.access?.map(
    (item) => item.updateForms.update
  );

  const addForm = addAccess.map((item) => item.indexOf("recepit") !== -1);
  const viewTable = viewAccess.map((item) => item.indexOf("recepit") !== -1);

  if (error) return <div>Failed to load</div>;
  if (!funderdata) return <div>Funder Loading...</div>;
  if (!ProjectData) return <div>ProjectData Loading...</div>;

  const handler = () => {
    setVisible(!visible);
  };

  return (
    <>
    <Head><title>Project Create</title></Head>
      <App session={session}>
        {session?.userRole === "super admin" ? (
          <div className="container mx-auto flex justify-between py-5 border-b">
            <div className="left flex gap-3">
              <button
                className="flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-grary-50 hover:border-indigo-500 hover:text-gray-800"
                onClick={handler}
              >
                Add Project{" "}
                <span className="px-1">
                  <BiStoreAlt size={23}></BiStoreAlt>
                </span>{" "}
              </button>
            </div>
          </div>
        ) : (
          ""
        )}

        {addForm[0] ? (
          <div className="container mx-auto flex justify-between py-5 border-b">
            <div className="left flex gap-3">
              <button
                className="flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-grary-50 hover:border-indigo-500 hover:text-gray-800"
                onClick={handler}
              >
                Add Project{" "}
                <span className="px-1">
                  <BiStoreAlt size={23}></BiStoreAlt>
                </span>{" "}
              </button>
            </div>
          </div>
        ) : (
          ""
        )}

        {/* collapsable form */}
        <div className="container mx-auto mb-10">
          {/* {visible ? <GanttChart/> : <></>} */}
          {visible ? <AddProject funders={funderdata} /> : <></>}
        </div>

        {/* <hr className="mx-auto w-auto h-1 bg-gray-100 rounded border-0 md:my-3 dark:bg-white"/> */}

        {/* table */}
        {session?.userRole === "super admin" ? (
          <div className="container mx-auto">
            <ProjectTable session={session} ProjectData={ProjectData} />
          </div>
        ) : (
          ""
        )}
        {viewTable[0] ? (
          <div className="container mx-auto">
            <ProjectTable session={session} ProjectData={ProjectData} deleteAccess={deleteAccess} viewAccess={viewAccess} updateAccess={updateAccess} />
          </div>
        ) : (
          ""
        )}
      </App>
    </>
  );
}

export async function getServerSideProps({ req }) {
  // const session = await getSession({ req });
  const { cookies } = req;
  const jwt = cookies.OursiteJWT;
  const user = await fetch(`${process.env.BaseURL}api/users/${jwt}`);
  const session = await user.json();

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        premanent: false,
      },
    };
  }
  // authorize user return session
  return {
    props: { session },
  };
}
