import { useState } from 'react';
import axios from "axios";
 

// Fetchers
import { loginUser } from "../api/index.js"
import { useNavigate } from 'react-router';

const Login = () => {
    const [values, setValues] = useState({  email: "", password: "" });
    const navigate = useNavigate();



    const [success, setSuccess] = useState(false)


    const handleChange = (e) => {
        const inputValue = e.target.value
        const inputName = e.target.name

        setValues((val) => ({ ...val, [inputName]: inputValue }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // loginUser(values).then(()=>setSuccess(true))
        axios.post(`${process.env.REACT_APP_BASE_URL}/user/login`, values)
        .then(response => {
            // console.log(response);
        return response // needed return 
        })
        .then(response => {
            if(response.statusText === "OK") { 
            localStorage.setItem("accessToken", response.data.token); navigate("/home"); 
            return response
        }})
        .then (response => {console.log(response); return response})
        .then(response => console.log(response.data.token))
        .catch(err => console.log(err))
          };

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