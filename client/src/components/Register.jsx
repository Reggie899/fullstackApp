import { useState } from "react";
import { Link } from "react-router-dom";

// Fetchers
import { registerUser } from "../api/index.js";

const Registration = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const inputName = e.target.name;

    setValues((val) => ({ ...val, [inputName]: inputValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(values).then(() => setSuccess(true));
  };

  return (
    <>
      <form>
        <input
          value={values.username}
          onChange={handleChange}
          name="username"
          type="text"
          placeholder="Name"
        />
        <input
          value={values.email}
          onChange={handleChange}
          name="email"
          type="email"
          placeholder="Email"
        />
        <input
          value={values.password}
          onChange={handleChange}
          name="password"
          type="password"
          placeholder="Password"
        />
         <input
          value={values.confirmPassword}
          onChange={handleChange}
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
        />
        <button onClick={handleSubmit}>Register</button>
      </form>
      {success ? <p>Successfully registered!</p> : null}
      <Link to={"/login"}>Go to login</Link>
    </>
  );
};

export default Registration;
