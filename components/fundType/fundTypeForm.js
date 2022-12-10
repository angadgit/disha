import { useRouter } from "next/router";
import { useState } from 'react';

export default function FundTypeForm({session}) {
  const [name, setName] = useState()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { user: session?.createdBy, name }
    console.log(data)
    let res = await fetch("/api/fundTypeApi", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res2 = await res.json();
    if (res2.success === "Success") {
      // console.log('Success')
      router.push('/recepit')
    }
  }

  return (
    <form className="grid lg:grid-cols-2 w-4/5 gap-4" encType="multipart/form-data" onSubmit={handleSubmit}>

      <div className="input-type">
        <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Name" />
      </div>

      <button type='submit' onSubmit={handleSubmit} className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-3 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">Add</button>

    </form>
  )
}