import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
// import { getSession, useSession, signOut } from "next-auth/react"
import DefaultLayout from "./DefaultLayout";
import { FiUsers } from "react-icons/fi";
import { FaMoneyCheckAlt } from "react-icons/fa";
import useSWR from "swr";
import { NumericFormat } from "react-number-format";
import React from "react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home({ recepitData, funderdata, session }) {

  // const { data: funder, error } = useSWR("/api/funderApi", fetcher);
  // const funderdata = funder?.filter((item) => item.user === session.user.email);
  // const { data: recepit } = useSWR("/api/recepitApi", fetcher);
  // const recepitData = recepit?.filter((item) => item.user === session.user.email);
  // console.log(funderdata)

  // if (error) return <div>Failed to load</div>;
  // if (!funder) return <div>Funder Loading...</div>;
  // if (!funderdata) return <div>Funder Loading...</div>;
  // if (!recepitData) return <div>Recepit Loading...</div>;

  function handleSignOut() {
    signOut();
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Home Page</title>
      </Head>

      {session
        ? User({ session, handleSignOut, recepitData, funderdata })
        : Guest()}
    </div>
  );
}

// Guest
function Guest() {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">Guest to Login</h3>

      <div className="flex justify-center">
        <Link href={"/login"}>
          <a className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50">
            Sign In
          </a>
        </Link>
      </div>
    </main>
  );
}

// Authorize User
function User({ session, recepitData, funderdata }) {
  // console.log(NumericFormat)

  return (
    <DefaultLayout session={session}>
      <div className="flex">
        <div className="p-6 w-64 mr-5 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <FiUsers className="mb-2 w-10 h-10 text-gray-500 dark:text-gray-400" />
          <a href="#">
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Total Funder
            </h5>
          </a>
          <p className="font-semibold dark:text-white text-xl">
            {funderdata?.map((item, i) => i).reduce((a, b) => a + b, 1)}
          </p>
        </div>
        <div className="p-6 w-64 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <FaMoneyCheckAlt className="mb-2 w-10 h-10 text-gray-500 dark:text-gray-400" />
          <a href="#">
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Recepit Amounts
            </h5>
          </a>
          <p className="font-semibold dark:text-white text-xl">{""}</p>
          <NumericFormat
            value={recepitData
              ?.map((item, i) => item.receiptAmount)
              .reduce((a, b) => a + b, 0)}
            prefix="Rs. "
            thousandSeparator=","
            displayType={"text"}
            className="dark:bg-gray-800 dark:text-white text-xl cursor-default"
          />
        </div>
      </div>
    </DefaultLayout>
  );
}

export async function getServerSideProps({ req }) {
  const { cookies } = req;
  const jwt = cookies.OursiteJWT;
  const user = await fetch(`${process.env.BaseURL}api/users/${jwt}`);
  const session = await user.json();
  // console.log("cookeies",session);
  try {
    // const session = await getSession({ req })

    if (!session) {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    }

    const funder = await fetch(`${process.env.BaseURL}api/funderApi`);
    const funderData = await funder.json();
    const funderdata = funderData?.filter(
      (item) => item.user === session.createdBy
    );

    const recepit = await fetch(`${process.env.BaseURL}api/recepitApi`);
    const recepit_dt = await recepit.json();
    const recepitData = recepit_dt?.filter(
      (item) => item.user === session.createdBy
    );

    // console.log(funderdata)

    return {
      props: { session, recepitData, funderdata },
    };
  } catch (error) {
    console.error("Error fetching homepage data", error);
  }
}
