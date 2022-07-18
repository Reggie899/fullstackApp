import { useState } from 'react'

// Fetchers
import { loginUser } from "../api/index.js"

const Login = () => {
    const [values, setValues] = useState({  email: "", password: "" })
    const [success, setSuccess] = useState(false)


    const handleChange = (e) => {
        const inputValue = e.target.value
        const inputName = e.target.name

        setValues((val) => ({ ...val, [inputName]: inputValue }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        loginUser(values).then(()=>setSuccess(true))

    }

    return (
        <>
        <form>
            <input value={values.email} onChange={handleChange} name="email" type='email' placeholder="Email" />
            <input value={values.password} onChange={handleChange} name="password" type='password' placeholder="Password" />
            <button onClick={handleSubmit}>Login</button>
        </form>
        {success ? <p>Successfully logged in!</p> : null}
        </>

    )
}

export default Login