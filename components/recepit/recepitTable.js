import React, { useMemo, useRef } from "react";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
} from "react-table";
import styles from "../../styles/Form.module.css";
import { BiEdit, BiTrashAlt, BiShow, BiRepost } from "react-icons/bi";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux'
import { toggleChangeAction, updateAction, deleteAction } from "../../redux/reducer";
import RecepitPrint_1 from "../printPages/recepitPrint_1";

export default function RecepitTable({ session, data, deleteAccess, viewAccess, updateAccess, recepitData }) {

  const router = useRouter()
  // console.log(session)
  const refreshData = () => {
    router.replace('/recepit');
  }
  const dispatch = useDispatch()
  const visible = useSelector((state) => state.app.client.toggleForm)
  const [showModal, setShowModal] = React.useState(false);
  const [id, setId] = React.useState()

  const view = viewAccess.map((item) => item.indexOf("recepit") !== -1)
  //  console.log("view", view[0])
  const delete_Access = deleteAccess.map(item => item.indexOf("recepit") !== -1)
  //  console.log("delete",delete_Access[0])
  const update = updateAccess.map(item => item.indexOf("recepit") !== -1)
  //  console.log("delete",delete_Access[0])

  const ProjectRef = useRef();
  ProjectRef.current = data;

  const onView = (rowIdx) => {
    setId(rowIdx);
    setShowModal(true)
  };

  const onUpdate = (rowIdx) => {
    console.log(rowIdx);
    dispatch(toggleChangeAction(rowIdx))
    if (visible) {
      dispatch(updateAction(rowIdx))
    }
  };

  const [ftCheck, setFtCheck] = React.useState()

  const deletehandler = async (rowIdx) => {
    console.log(rowIdx)
    const id = rowIdx;
    if (id) {
        await fetch(`/api/recepitApi/${id}`, { method: "DELETE", })
        refreshData();
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
  }

  const onDelete = (rowIdx) => {
    confirmAlert({
      title: "Are you sure?",
      message: "You want to delete this data?",
      buttons: [
        {
          label: "Yes, Delete it!",
          onClick: () => deletehandler(rowIdx)
        },
        {
          label: "No"
          // onClick: () => alert("Click No")
        }
      ]
    });
    // console.log(rowIdx);
  };

  const columns = useMemo(
    () => [
      {
        maxWidth: 400,
        minWidth: 140,
        width: 200,
        Header: "Funder Name",
        accessor: "fullName",
      },
      {
        width: "40",
        Header: "Email",
        accessor: "email",
      },
      {
        width: "50",
        Header: "Type of Fund",
        accessor: "typeFund",
      },
      {
        width: "30",
        Header: "Recepit Amount",
        accessor: "receiptAmount",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          // const rowIdx = props.row.id;
          const rowIdx = props.row.original._id;
          // console.log('id',props.row.original._id)
          return (
            <div className="flex gap-5 ml-2">
              {/* view  */}
              {session?.userRole === "super admin" ? <>
                <button className="cursor" onClick={() => onView(rowIdx)}>
                  <BiShow size={25} color={"rgb(0 ,0,254)"}></BiShow>
                </button>
                <button className="cursor" onClick={() => onDelete(rowIdx)} >
                  <BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt>
                </button>
                <button className="cursor" onClick={() => onUpdate(rowIdx)}>
                  <BiEdit size={25} color={"rgb(255, 204, 0)"} />
                </button>
              </> : ""}
              {
                view[0] ? <button className="cursor" onClick={() => onView(rowIdx)}>
                  <BiShow size={25} color={"rgb(0 ,0,254)"}></BiShow>
                </button>
                  : ""
              }

              {/* delete  */}
              {
                delete_Access[0] ? <button className="cursor" onClick={() => onDelete(rowIdx)} >
                  <BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt>
                </button> : ""
              }

              {/* update  */}
              {
                update[0] ? <button className="cursor" onClick={() => onUpdate(rowIdx)}>
                  <BiEdit size={25} color={"rgb(255, 204, 0)"} />
                </button> : ""
              }

            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    state,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data: data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <div className="list row">
      <div className="col-md-12">
        <div className="input-group mb-3">
          {/* {console.log(globalFilter)} */}
          <input
            type="text"
            className={`${styles.input_text} `}
            placeholder="Search By Any Field"
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-x-auto relative rounded-md">
        <table
          className="w-full text-md text-left text-gray-500 dark:text-gray-400"
          {...getTableProps()}
        >
          <thead className="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            {headerGroups.map((headerGroup, i) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={i} className="">
                {headerGroup.headers.map((column, i) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={i}
                    className="p-2"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="">
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  key={i}
                  className="bg-white border-b"
                >
                  {row.cells.map((cell, i) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        key={i}
                        className="text-md text-black py-3 px-3 "
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <RecepitPrint_1 Rid={id} session={session} />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

        <div className="float-right flex gap-2 my-2 mx-5 py-5">
          {/* first data  */}
          <button
            className="btn btn-default"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {"First"}
          </button>{" "}
          {/* previous button */}
          <button
            className="cursor-pointer"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
          </button>{" "}
          {/* next button  */}
          <button
            type="button"
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </button>{" "}
          {/* last data  */}
          <button
            className="btn btn-default"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {"Last"}
          </button>{" "}
          <span className="mt-1">
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <span>
            | Go to page:{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value
                  ? Number(e.target.value) - 1
                  : 0;
                gotoPage(pageNumber);
              }}
              style={{ width: "50px" }}
              className="outline rounded-md py-1 px-1"
            />
          </span>{" "}
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="outline rounded-md py-1 px-1"
          >
            {[2, 5, 10, 25, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
