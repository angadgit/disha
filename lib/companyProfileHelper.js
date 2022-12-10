
const BASE_URL = "http://localhost:3000/" || "https://fascinating-biscuit-ee2a0c.netlify.app/" || "https://project-management-vedvika.herokuapp.com/"
// const BASE_URL = "https://project-management-vedvika.herokuapp.com/"
// const BASE_URL = process.env.NEXTAUTH_URL
// console.log(BASE_URL)
// all Recepit
export const getcompanyProfiles = async () => {
  const response = await fetch(`${BASE_URL}api/companyProfileApi`)
  const json = await response.json()

  return json;
}

// single Recepit
export const getcompanyProfile = async (formId) => {
  console.log('helper', formId)
  const response = await fetch(`${BASE_URL}api/companyProfileApi/${formId}`);
  const json = await response.json()

  if (json) return json;
  return {}
}

// posting a new Recepit
export async function postcompanyProfile(formData) {
  try {
    const Options = {
      method: 'POST',
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify(formData)
    }

    const response = await fetch(`${BASE_URL}api/companyProfileApi`, Options)
    const json = await response.json()

    return json;
  } catch (error) {
    return error;
  }
}


// Update a new Recepit
export async function putcompanyProfile(formId, formData) {
  const Options = {
    method: 'PUT',
    headers: { 'Content-Type': "application/json" },
    body: JSON.stringify(formData)
  }

  const response = await fetch(`${BASE_URL}api/companyProfileApi/${formId}`, Options)
  const json = await response.json()
  return json;
}


// Delete a new Recepit
export async function deletecompanyProfile(formId) {
  console.log(formId)
  const Options = {
    method: 'DELETE',
    headers: { 'Content-Type': "application/json" },
  }

  const response = await fetch(`${BASE_URL}api/companyProfileApi/${formId}`, Options)
  const json = await response.json()
  return json;
}