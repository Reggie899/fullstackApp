import axios from "axios";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


function DashboardComponent() {

    const navigate = useNavigate();
    const [user, setUser] = useState({});

useEffect(() => {
if(!localStorage.getItem("accessToken")) navigate("/login")

else {
axios.get(`${process.env.REACT_APP_BASE_URL}/user/validation`, {
    headers:{
        "authorization": `Bearer ${localStorage.getItem("accessToken")}`
    }
})
.then(res => setUser(res.data.user))
.catch(err => console.log(err))}
}, [])

return (

    <div>
    Dashboard Component
   Welcome: {user ? user.username : "No response received"}
   email: {user ? user.email : ""}
   MongoId : { user ? user._id : ""}
</div>
)
   
}

export default DashboardComponent