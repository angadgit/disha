
const BASE_URL = "http://localhost:3000/" || "https://fascinating-biscuit-ee2a0c.netlify.app/" || "https://project-management-vedvika.herokuapp.com/"
// const BASE_URL = "https://project-management-vedvika.herokuapp.com/"
// const BASE_URL = process.env.NEXTAUTH_URL
// console.log(BASE_URL)
// all Recepit
export const getRecepits = async () => {
  const response = await fetch(`${BASE_URL}api/recepitApi`)
  const json = await response.json()

  return json;
}

// single Recepit
export const getRecepit = async (formId) => {
  console.log('helper', formId)
  const response = await fetch(`${BASE_URL}api/recepitApi/${formId}`);
  const json = await response.json()

  if (json) return json;
  return {}
}

// posting a new Recepit
export async function addRecepit(formData) {
  try {
    const Options = {
      method: 'POST',
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify(formData)
    }

    const response = await fetch(`${BASE_URL}api/recepitApi`, Options)
    const json = await response.json()

    return json;
  } catch (error) {
    return error;
  }
}


// Update a new Recepit
export async function updateRecepit(formId, formData) {
  const Options = {
    method: 'PUT',
    headers: { 'Content-Type': "application/json" },
    body: JSON.stringify(formData)
  }

  const response = await fetch(`${BASE_URL}api/recepitApi/${formId}`, Options)
  const json = await response.json()
  return json;
}


// Delete a new Recepit
export async function deleteRecepit(formId) {
  console.log(formId)
  const Options = {
    method: 'DELETE',
    headers: { 'Content-Type': "application/json" },
  }

  const response = await fetch(`${BASE_URL}api/recepitApi/${formId}`, Options)
  const json = await response.json()
  return json;
}