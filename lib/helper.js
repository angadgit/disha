
const BASE_URL = "http://localhost:3000/" || "https://fascinating-biscuit-ee2a0c.netlify.app/" || "https://project-management-vedvika.herokuapp.com/"
// const BASE_URL = "https://project-management-vedvika.herokuapp.com/"
// const BASE_URL = process.env.NEXTAUTH_URL;

// all user
export const getUsers = async () => {
  const response = await fetch(`${BASE_URL}api/funderApi`)
  const json = await response.json()

  return json;
}

// single user
export const getUser = async (userId) => {
  console.log(userId)
  const response = await fetch(`${BASE_URL}api/funderApi/${userId}`);
  const json = await response.json()

  if (json) return json;
  return {}
}

// posting a new user
export async function addUser(formData) {
  try {
    const Options = {
      method: 'POST',
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify(formData)
    }

    const response = await fetch(`${BASE_URL}api/funderApi`, Options)
    const json = await response.json()

    return json;
  } catch (error) {
    return error;
  }
}


// Update a new user
export async function updateUser(userId, formData) {
  const Options = {
    method: 'PUT',
    headers: { 'Content-Type': "application/json" },
    body: JSON.stringify(formData)
  }

  const response = await fetch(`${BASE_URL}api/funderApi/${userId}`, Options)
  const json = await response.json()
  return json;
}


// Delete a new user
export async function deleteUser(userId) {
  console.log(userId)
  const Options = {
    method: 'DELETE',
    headers: { 'Content-Type': "application/json" },
  }

  const response = await fetch(`${BASE_URL}api/funderApi/${userId}`, Options)
  const json = await response.json()
  return json;
}