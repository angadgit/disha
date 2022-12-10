import Head from "next/head";
import React, { useState } from "react";
import App from "../DefaultLayout";
import GanttChart from "../../components/GanttChart/GanttChart";

export default function ProjectGanttChart({ session, projectData, err }) {

  if(!projectData) return<div>ProjectData not available</div>
  if(err) return <div> {err} </div>

  return (
    <>
    <Head><title>Project Gantt Chart</title></Head>
      <App session={session}>
        <GanttChart projectData={projectData} session={session} />
        {/* <GanttChart_2/> */}
      </App>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const { cookies } = req;
  const jwt = cookies.OursiteJWT;
  const user = await fetch(`${process.env.BaseURL}api/users/${jwt}`);
  const session = await user.json();
  try {
    // const session = await getSession({ req });
    // authorize user return session
    if (!session) {
      return {
        redirect: {
          destination: "/login",
          premanent: false,
        },
      };
    }

    const res = await fetch(`${process.env.BaseURL}api/projectAddApi`);
    const projectGanttChart = await res.json();
    const projectData = projectGanttChart.filter(
      (item) => item.user === session?.email
    );

    return {
      props: { session, projectData },
    };
  } catch (error) {
    // console.error("Error fetching homepage data", error);
    const err = await error
    return {
      props: { err },
    };
  }
}
