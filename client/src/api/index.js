
const URL = "http://localhost:8002"

export const registerUser = async (userData) => {
    const response = await fetch(`${URL}/user/register`, { method: "POST", body: JSON.stringify(userData), headers: { "Content-Type": "application/json" } })
    const data = await response.json()

    return data
}

export const loginUser = async (userData) => {
    const response = await fetch(`${URL}/user/login`, { method: "POST", body: JSON.stringify(userData), headers: { "Content-Type": "application/json" } })
    const data = await response.json()

    return data
}